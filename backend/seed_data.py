import asyncio
import uuid
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import AsyncSessionLocal, init_db
from app.models.user import User
from app.models.league import League
from app.models.team import Team
from app.models.venue import Venue
from app.models.game import Game
from app.models.event_type import EventType
from app.models.event import Event
from app.models.alert_type import AlertType
from app.models.safety_alert import SafetyAlert
from app.models.team_chat import TeamChat
from app.models.favorite import Favorite
from app.models.user_favorite_team import UserFavoriteTeams


async def clear_all_data(session: AsyncSession):
    print("\nTruncating DB tables")

    from sqlalchemy import delete

    await session.execute(delete(Favorite))
    await session.execute(delete(UserFavoriteTeams))
    await session.execute(delete(TeamChat))
    await session.execute(delete(SafetyAlert))
    await session.execute(delete(AlertType))
    await session.execute(delete(Event))
    await session.execute(delete(EventType))
    await session.execute(delete(Game))
    await session.execute(delete(Team))
    await session.execute(delete(Venue))
    await session.execute(delete(League))
    await session.execute(delete(User))

    await session.commit()
    print("Cleared all existing data")


async def seed_users(session: AsyncSession) -> list[User]:
    print("\nCreating test users")
    users = [
        User(
            username="vogelrj",
            email="rudi@example.com",
            clerk_id="clerk_rudi123",
            profile_picture_url="https://rudi.com/sfw_pics/avatar.jpg",
            is_verified=True,
        ),
        User(
            username="aidenhartbreaker",
            email="aiden@example.com",
            clerk_id="clerk_aiden456",
            profile_picture_url="https://itsaiden.com/avatars/jane.jpg",
            is_verified=True,
        ),
        User(
            username="nathanburns",
            email="nathan@example.com",
            clerk_id="clerk_nathan789",
            profile_picture_url="https://itsnathan.com/avatars/jane.jpg",
            is_verified=False,
        ),
        User(
            username="briansmith",
            email="brian@example.com",
            profile_picture_url="https://brian.com/avatars/alice.jpg",
            is_verified=True,
        ),
    ]

    session.add_all(users)
    await session.commit()
    print(f"Created {len(users)} users")
    return users


async def seed_leagues(session: AsyncSession) -> list[League]:
    print("\nCreating League")
    leagues = [
        League(league_code="NFL",   espn_sport="football",   espn_league="nfl",                     league_name="National Football League",        is_active=True),
        League(league_code="NBA",   espn_sport="basketball", espn_league="nba",                     league_name="National Basketball Association", is_active=False),
        League(league_code="NHL",   espn_sport="hockey",     espn_league="nhl",                     league_name="National Hockey League",          is_active=False),
        League(league_code="MLB",   espn_sport="baseball",   espn_league="mlb",                     league_name="Major League Baseball",           is_active=False),
        League(league_code="MLS",   espn_sport="soccer",     espn_league="usa.1",                   league_name="Major League Soccer",             is_active=False),
        League(league_code="NCAAF", espn_sport="football",   espn_league="college-football",        league_name="NCAA Football",                   is_active=False),
        League(league_code="NCAAB", espn_sport="basketball", espn_league="mens-college-basketball", league_name="NCAA Men's Basketball",           is_active=False),
    ]

    session.add_all(leagues)
    await session.commit()
    print(f"Created {len(leagues)} league(s)")
    return leagues


async def seed_venues(session: AsyncSession) -> list[Venue]:
    print("\nCreating Venues")
    venues = [
        Venue(
            venue_id=3883,
            name="MetLife Stadium",
            city="East Rutherford",
            state_region="NJ",
            country="USA",
            latitude=40.8128,
            longitude=-74.0742,
            is_indoor=False,
        ),
        Venue(
            venue_id=3839,
            name="AT&T Stadium",
            city="Arlington",
            state_region="TX",
            country="USA",
            latitude=32.7473,
            longitude=-97.0945,
            is_indoor=True,
        ),
        Venue(
            venue_id=3957,
            name="Lambeau Field",
            city="Green Bay",
            state_region="WI",
            country="USA",
            latitude=44.5013,
            longitude=-88.0622,
            is_indoor=False,
        ),
        Venue(
            venue_id=3738,
            name="Gillette Stadium",
            city="Foxborough",
            state_region="MA",
            country="USA",
            latitude=42.0909,
            longitude=-71.2643,
            is_indoor=False,
        ),
        Venue(
            venue_id=3622,
            name="Arrowhead Stadium",
            city="Kansas City",
            state_region="MO",
            country="USA",
            latitude=39.0489,
            longitude=-94.4839,
            is_indoor=False,
        ),
    ]

    session.add_all(venues)
    await session.commit()
    print(f"Created {len(venues)} venues")
    return venues


async def seed_teams(session: AsyncSession) -> dict[str, Team]:
    print("\nCreating Test Teams")

    giants = Team(espn_team_id=19, league_id="NFL", home_location="New York", team_name="Giants", display_name="New York Giants", home_venue_id=3883)
    jets = Team(espn_team_id=20, league_id="NFL", home_location="New York", team_name="Jets", display_name="New York Jets", home_venue_id=3883)
    cowboys = Team(espn_team_id=6, league_id="NFL", home_location="Dallas", team_name="Cowboys", display_name="Dallas Cowboys", home_venue_id=3839)
    packers = Team(espn_team_id=9, league_id="NFL", home_location="Green Bay", team_name="Packers", display_name="Green Bay Packers", home_venue_id=3957)
    patriots = Team(espn_team_id=17, league_id="NFL", home_location="New England", team_name="Patriots", display_name="New England Patriots", home_venue_id=3738)
    chiefs = Team(espn_team_id=12, league_id="NFL", home_location="Kansas City", team_name="Chiefs", display_name="Kansas City Chiefs", home_venue_id=3622)

    all_teams = [giants, jets, cowboys, packers, patriots, chiefs]
    session.add_all(all_teams)
    await session.commit()
    print(f"Created {len(all_teams)} teams")

    # Return as dict for easy reference by name (team_id is auto-generated)
    return {
        "giants": giants,
        "jets": jets,
        "cowboys": cowboys,
        "packers": packers,
        "patriots": patriots,
        "chiefs": chiefs,
    }


async def seed_games(session: AsyncSession, teams: dict[str, Team]) -> list[Game]:
    print("\nCreating games")

    now = datetime.now()

    games = [
        Game(
            league_id="NFL",
            home_team_id=teams["giants"].team_id,
            away_team_id=teams["cowboys"].team_id,
            venue_id=3883,
            date_time=now + timedelta(days=7),
        ),
        Game(
            league_id="NFL",
            home_team_id=teams["jets"].team_id,
            away_team_id=teams["patriots"].team_id,
            venue_id=3883,
            date_time=now + timedelta(days=7, hours=3),
        ),
        Game(
            league_id="NFL",
            home_team_id=teams["packers"].team_id,
            away_team_id=teams["cowboys"].team_id,
            venue_id=3957,
            date_time=now + timedelta(days=14),
        ),
        Game(
            league_id="NFL",
            home_team_id=teams["chiefs"].team_id,
            away_team_id=teams["patriots"].team_id,
            venue_id=3622,
            date_time=now + timedelta(days=21),
        ),
        Game(
            league_id="NFL",
            home_team_id=teams["giants"].team_id,
            away_team_id=teams["jets"].team_id,
            venue_id=3883,
            date_time=now + timedelta(days=30),
        ),
    ]

    session.add_all(games)
    await session.commit()
    print(f"Created {len(games)} games")
    return games


async def seed_event_types(session: AsyncSession) -> list[EventType]:
    print("\nSeeding event types...")
    event_types = [
        EventType(code="TAILGATE", type_name="Tailgate Party"),
        EventType(code="WATCH", type_name="Watch Party"),
        EventType(code="PREGAME", type_name="Pre-Game Meetup"),
        EventType(code="POSTGAME", type_name="Post-Game Celebration"),
        EventType(code="RALLY", type_name="Fan Rally"),
    ]

    session.add_all(event_types)
    await session.commit()
    print(f"Created {len(event_types)} event types")
    return event_types


async def seed_events(
    session: AsyncSession,
    users: list[User],
    games: list[Game]
) -> list[Event]:
    print("\nSeeding events...")

    john = users[0]
    jane = users[1]
    bob = users[2]

    game1 = games[0]
    game2 = games[1]

    events = [
        Event(
            creator_user_id=john.user_id,
            event_type_id="TAILGATE",
            game_id=game1.game_id,
            venue_id=3883,  # MetLife
            title="Giants vs Cowboys Tailgate",
            description="I'm going to fight you",
            game_date=game1.date_time,
            latitude=40.8128,
            longitude=-74.0742,
        ),
        Event(
            creator_user_id=jane.user_id,
            event_type_id="WATCH",
            title="Sports Bar Watch Party - Jets Game",
            description="Watching the Jets vs Patriots game at Murphy's Pub on 3rd Ave",
            game_date=game2.date_time,
            latitude=40.7580,
            longitude=-73.9855,
        ),
        Event(
            creator_user_id=bob.user_id,
            event_type_id="PREGAME",
            game_id=games[4].game_id,
            venue_id=3883,  # MetLife
            title="NY Derby Pre-Game Meetup",
            description="Giants vs Jets! Meeting at lot C2 at 11am",
            game_date=games[4].date_time,
            latitude=40.8120,
            longitude=-74.0750,
        ),
        Event(
            creator_user_id=jane.user_id,
            event_type_id="POSTGAME",
            game_id=game1.game_id,
            title="Post-Game Celebration",
            description="Win or lose, we'll meet at The Meadowlands Bar after the game",
            game_date=game1.date_time + timedelta(hours=4),
            latitude=40.8100,
            longitude=-74.0800,
        ),
    ]

    session.add_all(events)
    await session.commit()
    print(f"Created {len(events)} events")
    return events


async def seed_alert_types(session: AsyncSession) -> list[AlertType]:
    print("\nSeeding alert types...")
    alert_types = [
        AlertType(code="TRAFFIC", type_name="Traffic Congestion"),
        AlertType(code="PARKING", type_name="Parking Full"),
        AlertType(code="SECURITY", type_name="Security Incident"),
        AlertType(code="WEATHER", type_name="Weather Alert"),
        AlertType(code="CROWD", type_name="Crowd Control"),
    ]

    session.add_all(alert_types)
    await session.commit()
    print(f"Created {len(alert_types)} alert types")
    return alert_types


async def seed_safety_alerts(
    session: AsyncSession,
    users: list[User],
    games: list[Game]
) -> list[SafetyAlert]:
    print("\nSeeding safety alerts")

    bob = users[2]
    alice = users[3]
    john = users[0]

    game1 = games[0]
    game2 = games[1]

    alerts = [
        SafetyAlert(
            reporter_user_id=bob.user_id,
            alert_type_id="TRAFFIC",
            game_id=game1.game_id,
            venue_id=3883,  # MetLife
            description="Heavy traffic on Route 3 approaching stadium",
            game_date=game1.date_time,
            latitude=40.8100,
            longitude=-74.0800,
        ),
        SafetyAlert(
            reporter_user_id=alice.user_id,
            alert_type_id="PARKING",
            venue_id=3883,  # MetLife
            description="Lot A is completely full, use Lot C or D",
            game_date=game1.date_time,
            latitude=40.8128,
            longitude=-74.0742,
        ),
        SafetyAlert(
            reporter_user_id=bob.user_id,
            alert_type_id="WEATHER",
            game_id=game2.game_id,
            description="Storm approaching area, expect delays",
            game_date=game2.date_time,
            latitude=40.8150,
            longitude=-74.0700,
        ),
        SafetyAlert(
            reporter_user_id=john.user_id,
            alert_type_id="CROWD",
            game_id=games[4].game_id,
            venue_id=3883,
            description="Large crowd at main entrance, use west gate for faster entry",
            game_date=games[4].date_time,
            latitude=40.8130,
            longitude=-74.0745,
        ),
    ]

    session.add_all(alerts)
    await session.commit()
    print(f"Created {len(alerts)} safety alerts")
    return alerts


async def seed_team_chats(session: AsyncSession, users: list[User], teams: dict[str, Team]) -> list[TeamChat]:
    print("\nSeeding team chats")

    john = users[0]
    jane = users[1]
    bob = users[2]
    alice = users[3]

    now = datetime.now()

    chats = [
        TeamChat(
            team_id=teams["giants"].team_id,
            user_id=john.user_id,
            message_text="Let's go Giants! Who's going to the game this Sunday?",
            timestamp=now - timedelta(hours=2),
        ),
        TeamChat(
            team_id=teams["giants"].team_id,
            user_id=jane.user_id,
            message_text="I'll be there! Section 124",
            timestamp=now - timedelta(hours=1, minutes=45),
        ),
        TeamChat(
            team_id=teams["giants"].team_id,
            user_id=bob.user_id,
            message_text="Count me in! Tailgating at lot C2",
            timestamp=now - timedelta(hours=1, minutes=30),
        ),
        TeamChat(
            team_id=teams["jets"].team_id,
            user_id=jane.user_id,
            message_text="J-E-T-S JETS JETS JETS!",
            timestamp=now - timedelta(hours=12),
        ),
        TeamChat(
            team_id=teams["jets"].team_id,
            user_id=alice.user_id,
            message_text="Ready for the Patriots game! Let's get this W",
            timestamp=now - timedelta(hours=11, minutes=30),
        ),
        TeamChat(
            team_id=teams["cowboys"].team_id,
            user_id=bob.user_id,
            message_text="How 'bout them Cowboys!",
            timestamp=now - timedelta(hours=6),
        ),
        TeamChat(
            team_id=teams["packers"].team_id,
            user_id=john.user_id,
            message_text="Go Pack Go! Lambeau is going to be electric this weekend",
            timestamp=now - timedelta(hours=4),
        ),
    ]

    session.add_all(chats)
    await session.commit()
    print(f"Created {len(chats)} team chat messages")
    return chats


async def seed_user_favorite_teams(session: AsyncSession, users: list[User], teams: dict[str, Team]) -> list[UserFavoriteTeams]:
    print("\nSeeding user favorite teams")

    john = users[0]
    jane = users[1]
    bob = users[2]
    alice = users[3]

    favorites = [
        UserFavoriteTeams(user_id=john.user_id, team_id=teams["giants"].team_id),
        UserFavoriteTeams(user_id=john.user_id, team_id=teams["packers"].team_id),
        UserFavoriteTeams(user_id=jane.user_id, team_id=teams["jets"].team_id),
        UserFavoriteTeams(user_id=jane.user_id, team_id=teams["giants"].team_id),
        UserFavoriteTeams(user_id=bob.user_id, team_id=teams["cowboys"].team_id),
        UserFavoriteTeams(user_id=bob.user_id, team_id=teams["giants"].team_id),
        UserFavoriteTeams(user_id=alice.user_id, team_id=teams["jets"].team_id),
        UserFavoriteTeams(user_id=alice.user_id, team_id=teams["patriots"].team_id),
    ]

    session.add_all(favorites)
    await session.commit()
    print(f"Created {len(favorites)} user favorite team associations")
    return favorites


async def seed_favorites(
    session: AsyncSession,
    users: list[User],
    events: list[Event],
    games: list[Game]
) -> list[Favorite]:
    print("\nSeeding favorites")

    john = users[0]
    jane = users[1]
    bob = users[2]
    alice = users[3]

    favorites = [
        Favorite(user_id=john.user_id, event_id=events[0].event_id),
        Favorite(user_id=jane.user_id, event_id=events[1].event_id),
        Favorite(user_id=bob.user_id, event_id=events[2].event_id),
        Favorite(user_id=alice.user_id, event_id=events[1].event_id),
        Favorite(user_id=john.user_id, game_id=games[0].game_id),
        Favorite(user_id=jane.user_id, game_id=games[1].game_id),
        Favorite(user_id=bob.user_id, game_id=games[2].game_id),
        Favorite(user_id=alice.user_id, game_id=games[4].game_id),
    ]

    session.add_all(favorites)
    await session.commit()
    print(f"Created {len(favorites)} favorites")
    return favorites


async def main():
    print("=" * 60)
    print("Starting database seeding")
    print("=" * 60)

    await init_db()

    async with AsyncSessionLocal() as session:


        users = await seed_users(session)
        leagues = await seed_leagues(session)
        venues = await seed_venues(session)
        teams = await seed_teams(session)
        games = await seed_games(session, teams)

        event_types = await seed_event_types(session)
        events = await seed_events(session, users, games)

        alert_types = await seed_alert_types(session)
        alerts = await seed_safety_alerts(session, users, games)

        chats = await seed_team_chats(session, users, teams)
        user_fav_teams = await seed_user_favorite_teams(session, users, teams)
        favorites = await seed_favorites(session, users, events, games)

    print("\n" + "=" * 60)
    print("Database seeding completed successfully!")
    print("=" * 60)
    print(f"\nSummary:")
    print(f"  Users: {len(users)}")
    print(f"  Leagues: {len(leagues)} (NFL only)")
    print(f"  Venues: {len(venues)}")
    print(f"  Teams: {len(teams)}  (auto-increment PKs)")
    print(f"  Games: {len(games)}")
    print(f"  Event Types: {len(event_types)}")
    print(f"  Events: {len(events)}")
    print(f"  Alert Types: {len(alert_types)}")
    print(f"  Safety Alerts: {len(alerts)}")
    print(f"  Team Chats: {len(chats)}")
    print(f"  User Favorite Teams: {len(user_fav_teams)}")
    print(f"  Favorites: {len(favorites)}")
    print()


if __name__ == "__main__":
    asyncio.run(main())
