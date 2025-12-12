from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.models.user import User
from app.models.event import Event
from app.models.favorite import Favorite
from app.models.team import Team
from app.models.user_favorite_team import UserFavoriteTeams
from app.schemas.user import UserProfile, HeaderInfo, AccountSettings
from app.schemas.event import EventRead
from app.schemas.team import TeamRead


async def get_user_profile_service(current_user: User, db: AsyncSession) -> UserProfile:
    favorite_teams_stmt = (
        select(Team)
        .join(UserFavoriteTeams, UserFavoriteTeams.team_id == Team.team_id)
        .where(UserFavoriteTeams.user_id == current_user.user_id)
        .options(selectinload(Team.league))
    )
    favorite_teams_result = await db.execute(favorite_teams_stmt)
    favorite_teams = favorite_teams_result.scalars().all()

    saved_events_stmt = (
        select(Event)
        .join(Favorite, Favorite.event_id == Event.event_id)
        .where(Favorite.user_id == current_user.user_id)
        .where(Favorite.event_id.isnot(None))
        .options(
            selectinload(Event.game),
            selectinload(Event.venue)
        )
        .order_by(Favorite.date_time.desc())
        .limit(50)
    )
    saved_events_result = await db.execute(saved_events_stmt)
    saved_events = saved_events_result.scalars().all()

    my_events_stmt = (
        select(Event)
        .where(Event.creator_user_id == current_user.user_id)
        .options(
            selectinload(Event.game),
            selectinload(Event.venue)
        )
        .order_by(Event.created_at.desc())
        .limit(50)
    )
    my_events_result = await db.execute(my_events_stmt)
    my_events = my_events_result.scalars().all()

    my_chats = []

    display_name = ""
    if current_user.first_name and current_user.last_name:
        display_name = f"{current_user.first_name} {current_user.last_name}"
    elif current_user.first_name:
        display_name = current_user.first_name
    else:
        display_name = current_user.username

    header_info = HeaderInfo(
        profile_picture_url=current_user.profile_picture_url,
        username=current_user.username,
        display_name=display_name,
        is_verified=current_user.is_verified,
        favorite_teams=[TeamRead.model_validate(team) for team in favorite_teams]
    )

    account_settings = AccountSettings(
        first_name=current_user.first_name,
        last_name=current_user.last_name,
        email=current_user.email,
        applied_for_verification=current_user.pending_verification,
        enable_nearby_event_notifications=current_user.enable_nearby_event_notifications,
        enable_favorite_team_notifications=current_user.enable_favorite_team_notifications,
        enable_safety_alert_notifications=current_user.enable_safety_alert_notifications
    )

    return UserProfile(
        header_info=header_info,
        account_settings=account_settings,
        saved_events=[EventRead.model_validate(e) for e in saved_events],
        my_events=[EventRead.model_validate(e) for e in my_events],
        my_chats=my_chats
    )