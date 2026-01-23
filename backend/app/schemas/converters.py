from typing import Optional
from models.event import Event
from models.team import Team
from models.league import League
from models.team_chat import TeamChat
from schemas.event import EventRead, TeamLogos
from schemas.team import TeamRead
from schemas.league import LeagueRead, LeagueEnum
from schemas.team_chat import TeamChatRead
from schemas.types import EventTypeEnum


def convert_league_to_read(league: League) -> LeagueRead:
    return LeagueRead.from_db_model(league)


def convert_team_to_read(team: Team) -> TeamRead:
    league_read = None
    if team.league:
        league_read = convert_league_to_read(team.league)
    
    return TeamRead(
        team_id=team.team_id,
        league=league_read,
        sport_conference=team.sport_conference,
        sport_division=team.sport_division,
        home_location=team.home_location,
        team_name=team.team_name,
        display_name=team.display_name,
        logo_url=team.logo_url or ""
    )


def convert_event_to_read(event: Event, is_saved: bool = False) -> EventRead:
    # Determine event type
    event_type = EventTypeEnum.GAME  # Default
    if event.event_type_id:
        # Map event_type_id to enum
        # You might need to adjust this based on your actual event type IDs
        type_map = {
            "game": EventTypeEnum.GAME,
            "tailgate": EventTypeEnum.TAILGATE,
            "meetup": EventTypeEnum.MEETUP,
            "watchparty": EventTypeEnum.WATCH_PARTY,
        }
        event_type = type_map.get(event.event_type_id.lower(), EventTypeEnum.GAME)
    
    # Build team logos if game exists
    team_logos = None
    league = None
    if event.game:
        home_logo = event.game.home_team.logo_url if event.game.home_team else None
        away_logo = event.game.away_team.logo_url if event.game.away_team else None
        team_logos = TeamLogos(home=home_logo, away=away_logo)
        
        # Get league enum
        if event.game.league and event.game.league.league_name:
            try:
                league = LeagueEnum(event.game.league.league_name)
            except ValueError:
                league = None
    
    # Determine location
    location = ""
    if event.venue:
        location = f"{event.venue.city}, {event.venue.state_region}" if event.venue.city and event.venue.state_region else event.venue.name
    elif event.latitude and event.longitude:
        location = f"{event.latitude}, {event.longitude}"
    
    # Determine if user created
    is_user_created = event.game_id is None
    
    return EventRead(
        event_id=event.event_id,
        event_type=event_type,
        event_name=event.title,
        date_time=event.game_date or event.created_at,
        location=location,
        image_url=event.picture_url,
        team_logos=team_logos,
        league=league,
        is_user_created=is_user_created,
        is_saved=is_saved,
        game=None,  # Excluded from serialization
        venue=None  # Excluded from serialization
    )


def convert_team_chat_to_read(chat: TeamChat) -> TeamChatRead:
    # Extract team logo from relationship
    team_logo_url = None
    if hasattr(chat, 'team') and chat.team:
        team_logo_url = chat.team.logo_url
    
    # Extract user info from relationship
    user_name = ""
    user_avatar_url = None
    if hasattr(chat, 'user') and chat.user:
        user_name = chat.user.username
        user_avatar_url = chat.user.profile_picture_url
    
    return TeamChatRead(
        chat_id=chat.message_id,
        team_id=chat.team_id,
        team_logo_url=team_logo_url,
        user_id=chat.user_id,
        user_name=user_name,
        user_avatar_url=user_avatar_url,
        message_content=chat.message_text,
        timestamp=chat.timestamp
    )
