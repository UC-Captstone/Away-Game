import asyncio
import sys
import os
from datetime import datetime

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'app'))

from espn_client import ESPNClient
from schemas.team import TeamCreate
from schemas.venue import VenueCreate
from schemas.game import GameCreate


async def test_get_teams():
    print("Testing: get_nfl_teams()")

    client = ESPNClient()
    try:
        data = await client.get_nfl_teams()

        teams = []
        for sport in data.get('sports', []):
            for league in sport.get('leagues', []):
                for team_data in league.get('teams', []):
                    team_raw = team_data['team']

                    logos = team_raw.get('logos', [])
                    logo_url = logos[0].get('href') if logos else None

                    team = TeamCreate(
                        league_id="NFL",
                        sport_league="NFL",
                        sport_conference=None,
                        sport_division=None,
                        home_location=team_raw.get('location', ''),
                        team_name=team_raw.get('name', ''),
                        display_name=team_raw.get('displayName', ''),
                        home_venue_id=None,
                        logo_url=logo_url
                    )
                    teams.append(team)

        print(f"\nFound {len(teams)} NFL teams")
        print("\nSample teams:")
        for team in teams[:5]:
            print(f"  - {team.display_name} ({team.home_location})")

        return True

    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        await client.close()


async def test_get_scoreboard():
    print("\n")
    print("Testing: get_nfl_scoreboard()")

    date = "20251123"
    print(f"Fetching games for: {date}")

    client = ESPNClient()
    try:
        data = await client.get_nfl_scoreboard(dates=date)

        events = data.get('events', [])
        print(f"\nFound {len(events)} games")

        games = []
        venues = []

        if events:
            for event in events:
                competition = event['competitions'][0]

                home_team = next((c for c in competition['competitors'] if c['homeAway'] == 'home'), None)
                away_team = next((c for c in competition['competitors'] if c['homeAway'] == 'away'), None)

                home_team_id = int(home_team['team']['id']) if home_team else 0
                away_team_id = int(away_team['team']['id']) if away_team else 0

                venue_raw = competition.get('venue', {})
                if venue_raw:
                    address = venue_raw.get('address', {})
                    venue = VenueCreate(
                        name=venue_raw.get('fullName', ''),
                        display_name=venue_raw.get('fullName', ''),
                        city=address.get('city'),
                        state_region=address.get('state'),
                        country=address.get('country', 'USA'),
                        timezone='UTC',
                        latitude=None,
                        longitude=None,
                        capacity=venue_raw.get('capacity'),
                        is_indoor=venue_raw.get('indoor')
                    )
                    venues.append(venue)

                game_datetime = datetime.fromisoformat(event['date'].replace('Z', '+00:00'))

                game = GameCreate(
                    league_id="NFL",
                    home_team_id=home_team_id,
                    away_team_id=away_team_id,
                    venue_id=None,
                    date_time=game_datetime
                )
                games.append(game)

            print(f"\nBuilt {len(games)} Game objects")
            print(f"Built {len(venues)} Venue objects")
            print("\nSample game:")
            sample_game = games[0]
            sample_venue = venues[0] if venues else None
            print(f"  Home Team ID: {sample_game.home_team_id}")
            print(f"  Away Team ID: {sample_game.away_team_id}")
            print(f"  Date/Time: {sample_game.date_time}")
            if sample_venue:
                print(f"  Venue: {sample_venue.display_name}")
                print(f"  Location: {sample_venue.city}, {sample_venue.state_region}")
                print(f"  Indoor: {sample_venue.is_indoor}")
        else:
            print("\nNo games scheduled for this date. Try a date during NFL season!")

        return True

    except Exception as e:
        print(f"\nError: {e}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        await client.close()


async def main():
    results = []

    results.append(await test_get_teams())

    results.append(await test_get_scoreboard())

    passed = sum(results)
    total = len(results)
    print(f"Passed: {passed}/{total}")

    if all(results):
        print("\nAll tests passed!")
        return 0
    else:
        print("\nSome tests failed")
        return 1


if __name__ == "__main__":
    exit_code = asyncio.run(main())
    sys.exit(exit_code)
