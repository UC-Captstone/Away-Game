import asyncio
import json
import logging
import os
from datetime import datetime, timedelta
from functools import partial

from geopy.geocoders import Nominatim

from db.session import AsyncSessionLocal
from repositories.league_repo import LeagueRepository
from repositories.team_repo import TeamRepository
from repositories.venue_repo import VenueRepository
from repositories.game_repo import GameRepository
from scheduled.espn_client import ESPNClient

logger = logging.getLogger(__name__)

_geocoder = Nominatim(user_agent="away-game-scraper")


async def geocode_venue(name: str, city: str | None, state: str | None) -> tuple[float | None, float | None]:
    query = ", ".join(filter(None, [name, city, state]))
    if not query:
        return None, None
    try:
        await asyncio.sleep(1.1)  # Were rate limited: 1 request per second (its free tho)
        loop = asyncio.get_running_loop()
        location = await loop.run_in_executor(None, partial(_geocoder.geocode, query, timeout=10))
        if location:
            return location.latitude, location.longitude
        fallback = ", ".join(filter(None, [city, state]))
        if fallback and fallback != query:
            await asyncio.sleep(1.1)
            location = await loop.run_in_executor(None, partial(_geocoder.geocode, fallback, timeout=10))
            if location:
                return location.latitude, location.longitude
        logger.warning(f"Geocoding returned no results for '{query}'")
    except Exception as e:
        logger.warning(f"Geocoding failed for '{query}': {e}")
    return None, None


def load_leagues_config() -> list[dict]:
    raw = os.environ.get("LEAGUES_CONFIG")
    if not raw:
        raise ValueError("LEAGUES_CONFIG environment variable is required")
    return json.loads(raw)


async def scrape_teams(
    client: ESPNClient,
    team_repo: TeamRepository,
    venue_repo: VenueRepository,
    league_code: str,
    espn_sport: str,
    espn_league: str,
):
    logger.info(f"Scraping {league_code} teams")

    data = await client.get_teams(espn_sport, espn_league)

    api_teams = []
    for sport in data.get("sports", []):
        for league in sport.get("leagues", []):
            for team_data in league.get("teams", []):
                api_teams.append(team_data["team"])

    db_count = await team_repo.count_by_league(league_code)
    needs_detail = db_count < len(api_teams)

    if needs_detail:
        logger.info(f"{league_code}: DB has {db_count} teams, API has {len(api_teams)}")
    else:
        logger.info(f"{league_code}: {db_count} teams already up to date.")

    new_count = 0
    for team_raw in api_teams:
        espn_team_id = int(team_raw["id"])
        logos = team_raw.get("logos", [])
        logo_url = logos[0].get("href") if logos else None

        home_venue_id = None
        if needs_detail:
            existing = await team_repo.get_by_espn_id(espn_team_id, league_code)
            if existing:
                continue

            try:
                detail = await client.get_team_detail(espn_sport, espn_league, espn_team_id)
                franchise = detail.get("team", {}).get("franchise", {})
                venue_raw = franchise.get("venue", {})
                if venue_raw and venue_raw.get("id"):
                    home_venue_id = int(venue_raw["id"])
                    address = venue_raw.get("address", {})
                    venue_name = venue_raw.get("fullName", "")
                    city = address.get("city")
                    state = address.get("state")
                    lat, lon = await geocode_venue(venue_name, city, state)
                    logger.info(f"Adding venue {home_venue_id} '{venue_name}' with lat={lat}, lon={lon}")
                    await venue_repo.upsert(
                        venue_id=home_venue_id,
                        name=venue_name,
                        city=city,
                        state_region=state,
                        country=address.get("country", "USA"),
                        latitude=lat,
                        longitude=lon,
                        is_indoor=venue_raw.get("indoor"),
                    )
            except Exception as e:
                logger.warning(f"Could not fetch venue for {league_code} team {espn_team_id}: {e}")

            await team_repo.upsert(
                espn_team_id=espn_team_id,
                league_id=league_code,
                home_location=team_raw.get("location", ""),
                team_name=team_raw.get("name", ""),
                display_name=team_raw.get("displayName", ""),
                logo_url=logo_url,
                home_venue_id=home_venue_id,
            )
            new_count += 1

    if needs_detail:
        logger.info(f"Added {new_count} new {league_code} teams")
    logger.info(f"Processed {len(api_teams)} {league_code} teams")


async def scrape_schedule(
    client: ESPNClient,
    team_repo: TeamRepository,
    venue_repo: VenueRepository,
    game_repo: GameRepository,
    league_code: str,
    espn_sport: str,
    espn_league: str,
):
    logger.info(f"Scraping {league_code} schedule")

    start = datetime.now().strftime("%Y%m%d")
    end = (datetime.now() + timedelta(days=180)).strftime("%Y%m%d")
    date_range = f"{start}-{end}"

    data = await client.get_schedule(espn_sport, espn_league, dates=date_range)

    events = data.get("events", [])
    venues_count = 0
    games_count = 0

    for event in events:
        game_id = int(event["id"])
        game_datetime = datetime.fromisoformat(event["date"].replace("Z", "+00:00")).replace(tzinfo=None)

        competition = event["competitions"][0]

        home_team = next((c for c in competition["competitors"] if c["homeAway"] == "home"), None)
        away_team = next((c for c in competition["competitors"] if c["homeAway"] == "away"), None)

        espn_home_id = int(home_team["team"]["id"]) if home_team else None
        espn_away_id = int(away_team["team"]["id"]) if away_team else None

        if not espn_home_id or not espn_away_id:
            logger.warning(f"Skipping game {game_id}: missing team data")
            continue

        home_team_row = await team_repo.get_by_espn_id(espn_home_id, league_code)
        away_team_row = await team_repo.get_by_espn_id(espn_away_id, league_code)

        if not home_team_row or not away_team_row:
            logger.warning(f"Skipping game {game_id}: team not found (home={espn_home_id}, away={espn_away_id})")
            continue

        venue_id = None
        venue_raw = competition.get("venue", {})
        if venue_raw and venue_raw.get("id"):
            venue_id = int(venue_raw["id"])
            existing_venue = await venue_repo.get(venue_id)
            if not existing_venue:
                address = venue_raw.get("address", {})
                venue_name = venue_raw.get("fullName", "")
                city = address.get("city")
                state = address.get("state")
                lat, lon = await geocode_venue(venue_name, city, state)
                await venue_repo.upsert(
                    venue_id=venue_id,
                    name=venue_name,
                    city=city,
                    state_region=state,
                    country=address.get("country", "USA"),
                    latitude=lat,
                    longitude=lon,
                    is_indoor=venue_raw.get("indoor"),
                )
            venues_count += 1

        await game_repo.upsert(
            game_id=game_id,
            league_id=league_code,
            home_team_id=home_team_row.team_id,
            away_team_id=away_team_row.team_id,
            date_time=game_datetime,
            venue_id=venue_id,
        )
        games_count += 1

    logger.info(f"Processed {games_count} {league_code} games")


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
            await session.commit()

            active_leagues = await league_repo.list_active()
            for league in active_leagues:
                try:
                    await scrape_teams(client, team_repo, venue_repo, league.league_code, league.espn_sport, league.espn_league)
                    await scrape_schedule(client, team_repo, venue_repo, game_repo, league.league_code, league.espn_sport, league.espn_league)
                    await session.commit()
                except Exception as e:
                    await session.rollback()
                    logger.exception(f"{league.league_code} scrape failed, skipping: {e}")

            logger.info("Scraper completed successfully")
    except Exception as e:
        logger.exception(f"Scraper failed: {e}")
        raise
    finally:
        await client.close()
