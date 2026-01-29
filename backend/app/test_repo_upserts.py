import asyncio
from datetime import datetime, timedelta

from db.session import AsyncSessionLocal, init_db
from repositories.league_repo import LeagueRepository
from repositories.venue_repo import VenueRepository
from repositories.team_repo import TeamRepository
from repositories.game_repo import GameRepository


async def main():
    print("Testing Upsert Methods")

    await init_db()

    async with AsyncSessionLocal() as session:
        league_repo = LeagueRepository(session)
        venue_repo = VenueRepository(session)
        team_repo = TeamRepository(session)
        game_repo = GameRepository(session)

        print("\nUpsert existing league: NFL")
        league = await league_repo.upsert(
            league_code="NFL",
            sport_code="football",
            league_name="National Football League",
            espn_league_id=28,
        )
        print(f"  Result: {league.league_code} - {league.league_name} ")

        print("\n[2] Upsert existing venue: MetLife Stadium (3883)")
        venue = await venue_repo.upsert(
            venue_id=3883,
            name="MetLife Stadium",
            display_name="MetLife Stadium",
            city="East Rutherford",
            state_region="NJ",
            country="USA",
        )
        print(f"  Result: {venue.venue_id} - {venue.display_name} (skip, already exists)")

        print("\n[3] Upsert new venue: SoFi Stadium")
        venue_new = await venue_repo.upsert(
            venue_id=99999,
            name="SoFi Stadium",
            display_name="SoFi Stadium",
            city="Inglewood",
            state_region="CA",
            country="USA",
            capacity=70240,
            is_indoor=True,
        )
        print(f"  Result: {venue_new.venue_id} - {venue_new.display_name} (inserted)")

        print("\n[4] Upsert existing team: Giants")
        team = await team_repo.upsert(
            team_id=19,
            league_id="NFL",
            sport_league="NFL",
            home_location="New York",
            team_name="Giants",
            display_name="New York Giants",
            sport_conference="NFC",
            sport_division="East",
        )
        print(f"  Result: {team.team_id} - {team.display_name} (skip, already exists)")

        print("\n[5] Upsert new team: Rams ")
        team_new = await team_repo.upsert(
            team_id=14,
            league_id="NFL",
            sport_league="NFL",
            home_location="Los Angeles",
            team_name="Rams",
            display_name="Los Angeles Rams",
            sport_conference="NFC",
            sport_division="West",
            home_venue_id=99999,
        )
        print(f"  Result: {team_new.team_id} - {team_new.display_name} (inserted)")

        game_time = datetime(2025, 11, 23, 20, 20)
        print(f"\n[6] Upsert new game: Giants vs Rams ")
        game = await game_repo.upsert(
            game_id=888888,
            league_id="NFL",
            home_team_id=19,
            away_team_id=14,
            date_time=game_time,
            venue_id=3883,
        )
        print(f"  Result: game_id={game.game_id}, date_time={game.date_time}, venue_id={game.venue_id} (inserted)")

        print(f"\n[7] Upsert same game, no changes (game_id=888888)")
        game_same = await game_repo.upsert(
            game_id=888888,
            league_id="NFL",
            home_team_id=19,
            away_team_id=14,
            date_time=game_time,
            venue_id=3883,
        )
        print(f"  Result: game_id={game_same.game_id}, date_time={game_same.date_time}, venue_id={game_same.venue_id} (skip, no changes)")

        new_game_time = datetime(2025, 11, 24, 13, 0)
        print(f"\n[8] Upsert same game, rescheduled to {new_game_time} (game_id=888888)")
        game_updated = await game_repo.upsert(
            game_id=888888,
            league_id="NFL",
            home_team_id=19,
            away_team_id=14,
            date_time=new_game_time,
            venue_id=3883,
        )
        print(f"  Result: game_id={game_updated.game_id}, date_time={game_updated.date_time}, venue_id={game_updated.venue_id} (updated date_time)")

        print(f"\n[9] Upsert same game, venue changed to SoFi (99999)")
        game_venue = await game_repo.upsert(
            game_id=888888,
            league_id="NFL",
            home_team_id=19,
            away_team_id=14,
            date_time=new_game_time,
            venue_id=99999,
        )
        print(f"  Result: game_id={game_venue.game_id}, date_time={game_venue.date_time}, venue_id={game_venue.venue_id} (updated venue_id)")

        print("\n[Cleanup] Removing test data...")
        await game_repo.remove(888888)
        await team_repo.remove(14)
        await venue_repo.remove(99999)
        await session.commit()
        print("  Cleaned up test records")

    print("All upsert tests passed!")


if __name__ == "__main__":
    asyncio.run(main())
