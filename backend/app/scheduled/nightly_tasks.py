import json
import logging
import os
from datetime import datetime, timedelta

from db.session import AsyncSessionLocal
from repositories.league_repo import LeagueRepository
from repositories.team_repo import TeamRepository
from repositories.venue_repo import VenueRepository
from repositories.game_repo import GameRepository
from scheduled.espn_client import ESPNClient

logger = logging.getLogger(__name__)


def load_leagues_config() -> list[dict]:
    raw = os.environ.get("LEAGUES_CONFIG")
    if not raw:
        raise ValueError("LEAGUES_CONFIG environment variable is required")
    return json.loads(raw)


async def scrape_teams(
    client: ESPNClient,
    team_repo: TeamRepository,
    league_code: str,
    espn_sport: str,
    espn_league: str,
):
    logger.info(f"Scraping {league_code} teams")

    data = await client.get_teams(espn_sport, espn_league)

    teams_count = 0
    for sport in data.get("sports", []):
        for league in sport.get("leagues", []):
            for team_data in league.get("teams", []):
                team_raw = team_data["team"]

                team_id = int(team_raw["id"])
                logos = team_raw.get("logos", [])
                logo_url = logos[0].get("href") if logos else None

                await team_repo.upsert(
                    team_id=team_id,
                    league_id=league_code,
                    sport_league=league_code,
                    home_location=team_raw.get("location", ""),
                    team_name=team_raw.get("name", ""),
                    display_name=team_raw.get("displayName", ""),
                    logo_url=logo_url,
                )
                teams_count += 1

    logger.info(f"Processed {teams_count} {league_code} teams")


async def scrape_schedule(
    client: ESPNClient,
    venue_repo: VenueRepository,
    game_repo: GameRepository,
    league_code: str,
    espn_sport: str,
    espn_league: str,
):
    logger.info(f"Scraping {league_code} schedule")

    start = datetime.now().strftime("%Y%m%d")
    end = (datetime.now() + timedelta(days=730)).strftime("%Y%m%d")
    date_range = f"{start}-{end}"

    data = await client.get_schedule(espn_sport, espn_league, dates=date_range)

    events = data.get("events", [])
    venues_count = 0
    games_count = 0

    for event in events:
        game_id = int(event["id"])
        game_datetime = datetime.fromisoformat(event["date"].replace("Z", "+00:00"))

        competition = event["competitions"][0]

        home_team = next((c for c in competition["competitors"] if c["homeAway"] == "home"), None)
        away_team = next((c for c in competition["competitors"] if c["homeAway"] == "away"), None)

        home_team_id = int(home_team["team"]["id"]) if home_team else None
        away_team_id = int(away_team["team"]["id"]) if away_team else None

        if not home_team_id or not away_team_id:
            logger.warning(f"Skipping game {game_id}: missing team data")
            continue

        venue_id = None
        venue_raw = competition.get("venue", {})
        if venue_raw and venue_raw.get("id"):
            venue_id = int(venue_raw["id"])
            address = venue_raw.get("address", {})

            await venue_repo.upsert(
                venue_id=venue_id,
                name=venue_raw.get("fullName", ""),
                display_name=venue_raw.get("fullName", ""),
                city=address.get("city"),
                state_region=address.get("state"),
                country=address.get("country", "USA"),
                capacity=venue_raw.get("capacity"),
                is_indoor=venue_raw.get("indoor"),
            )
            venues_count += 1

        await game_repo.upsert(
            game_id=game_id,
            league_id=league_code,
            home_team_id=home_team_id,
            away_team_id=away_team_id,
            date_time=game_datetime,
            venue_id=venue_id,
        )
        games_count += 1

    logger.info(f"Processed {venues_count} venues and {games_count} {league_code} games")


async def run_nightly_task():
    logger.info("Starting nightly scraper")

    client = ESPNClient()
    try:
        async with AsyncSessionLocal() as session:
            league_repo = LeagueRepository(session)
            team_repo = TeamRepository(session)
            venue_repo = VenueRepository(session)
            game_repo = GameRepository(session)

            leagues_config = load_leagues_config()
            for league_data in leagues_config:
                await league_repo.upsert(
                    league_code=league_data["league_code"],
                    espn_sport=league_data["espn_sport"],
                    espn_league=league_data["espn_league"],
                    league_name=league_data["league_name"],
                    is_active=league_data["is_active"],
                )

            active_leagues = await league_repo.list_active()
            for league in active_leagues:
                await scrape_teams(client, team_repo, league.league_code, league.espn_sport, league.espn_league)
                await scrape_schedule(client, venue_repo, game_repo, league.league_code, league.espn_sport, league.espn_league)

            await session.commit()
            logger.info("Nightly scraper completed successfully")
    except Exception as e:
        logger.exception(f"Nightly scraper failed: {e}")
        raise
    finally:
        await client.close()
