from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import sqlalchemy as sa
from sqlalchemy.orm import selectinload

from app.models.user import User
from app.models.event import Event
from app.models.favorite import Favorite
from app.models.team import Team
from app.models.game import Game
from app.models.user_favorite_team import UserFavoriteTeams
from app.models.team_chat import TeamChat
from app.schemas.user import UserProfile, HeaderInfo, AccountSettings
from app.repositories.user_favorite_team_repo import UserFavoriteTeamsRepository
from app.repositories.favorite_repo import FavoriteRepository
from uuid import UUID
from typing import List
from fastapi import HTTPException, status
from app.schemas.event import EventRead
from app.schemas.team import TeamRead
from app.schemas.converters import convert_team_to_read, convert_event_to_read, convert_team_chat_to_read


async def get_user_profile_service(current_user: User, db: AsyncSession) -> UserProfile:
    # Get favorite teams
    favorite_teams_stmt = (
        select(Team)
        .join(UserFavoriteTeams, UserFavoriteTeams.team_id == Team.team_id)
        .where(UserFavoriteTeams.user_id == current_user.user_id)
        .options(selectinload(Team.league))
    )
    favorite_teams_result = await db.execute(favorite_teams_stmt)
    favorite_teams = favorite_teams_result.scalars().all()

    # Get saved events (with is_saved flag)
    saved_events_stmt = (
        select(Event)
        .join(Favorite, Favorite.event_id == Event.event_id)
        .where(Favorite.user_id == current_user.user_id)
        .where(Favorite.event_id.isnot(None))
        .options(
            selectinload(Event.game).selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.league),
            selectinload(Event.venue)
        )
        .order_by(Favorite.date_time.desc())
        .limit(50)
    )
    saved_events_result = await db.execute(saved_events_stmt)
    saved_events = saved_events_result.scalars().all()

    # Get user-created events
    my_events_stmt = (
        select(Event)
        .where(Event.creator_user_id == current_user.user_id)
        .options(
            selectinload(Event.game).selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.league),
            selectinload(Event.venue)
        )
        .order_by(Event.created_at.desc())
        .limit(50)
    )
    my_events_result = await db.execute(my_events_stmt)
    my_events = my_events_result.scalars().all()

    # Get user's chat messages with team and user info
    my_chats_stmt = (
        select(TeamChat)
        .where(TeamChat.user_id == current_user.user_id)
        .options(
            selectinload(TeamChat.team),
            selectinload(TeamChat.user)
        )
        .order_by(TeamChat.timestamp.desc())
        .limit(50)
    )
    my_chats_result = await db.execute(my_chats_stmt)
    my_chats = my_chats_result.scalars().all()

    # Build display name
    display_name = ""
    if current_user.first_name and current_user.last_name:
        display_name = f"{current_user.first_name} {current_user.last_name}"
    elif current_user.first_name:
        display_name = current_user.first_name
    else:
        display_name = current_user.username

    # Build header info
    header_info = HeaderInfo(
        profile_picture_url=current_user.profile_picture_url,
        username=current_user.username,
        display_name=display_name,
        is_verified=current_user.is_verified,
        favorite_teams=[convert_team_to_read(team) for team in favorite_teams]
    )

    # Build account settings
    account_settings = AccountSettings(
        first_name=current_user.first_name or "",
        last_name=current_user.last_name or "",
        email=current_user.email,
        applied_for_verification=current_user.pending_verification,
        enable_nearby_event_notifications=current_user.enable_nearby_event_notifications,
        enable_favorite_team_notifications=current_user.enable_favorite_team_notifications,
        enable_safety_alert_notifications=current_user.enable_safety_alert_notifications
    )

    return UserProfile(
        header_info=header_info,
        account_settings=account_settings,
        saved_events=[convert_event_to_read(e, is_saved=True) for e in saved_events],
        my_events=[convert_event_to_read(e, is_saved=False) for e in my_events],
        my_chats=[convert_team_chat_to_read(chat) for chat in my_chats]
    )


async def update_account_settings_service(
    current_user: User,
    db: AsyncSession,
    account_settings: AccountSettings,
) -> None:
    # Only allow first_name, last_name, email to be updated
    updated = False
    if account_settings.first_name is not None:
        current_user.first_name = account_settings.first_name
        updated = True
    if account_settings.last_name is not None:
        current_user.last_name = account_settings.last_name
        updated = True
    if account_settings.email and account_settings.email != current_user.email:
        current_user.email = account_settings.email
        updated = True

    if not updated:
        return

    await db.commit()
    await db.refresh(current_user)

    # Nathan: Integrate Clerk update using current_user.clerk_id


async def update_favorite_teams_service(
    current_user: User,
    db: AsyncSession,
    team_ids: List[int],
) -> None:
    repo = UserFavoriteTeamsRepository(db)
    existing = await repo.list_for_user(current_user.user_id)
    existing_ids = {fav.team_id for fav in existing}
    incoming_ids = set(team_ids)

    # Remove extras
    for tid in existing_ids - incoming_ids:
        await repo.remove(current_user.user_id, tid)

    # Add missing
    for tid in incoming_ids - existing_ids:
        fav = UserFavoriteTeams(user_id=current_user.user_id, team_id=tid)
        await repo.add(fav)

    await db.commit()


async def delete_account_service(current_user: User, db: AsyncSession) -> None:
    # Delete from Clerk first
    # Nathan: call Clerk API to delete user using current_user.clerk_id

    # Delete from our database
    await db.delete(current_user)
    await db.commit()


async def delete_saved_event_service(
    current_user: User,
    db: AsyncSession,
    event_id: UUID,
) -> List[EventRead]:
    # Remove favorite record for this event, if exists
    # Use a direct delete based on unique constraint (user_id, event_id)
    await db.execute(
        sa.delete(Favorite).where(
            (Favorite.user_id == current_user.user_id) & (Favorite.event_id == event_id)
        )
    )
    await db.commit()

    # Return updated saved events list (same as in profile)
    saved_events_stmt = (
        select(Event)
        .join(Favorite, Favorite.event_id == Event.event_id)
        .where(Favorite.user_id == current_user.user_id)
        .where(Favorite.event_id.isnot(None))
        .options(
            selectinload(Event.game).selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.league),
            selectinload(Event.venue)
        )
        .order_by(Favorite.date_time.desc())
        .limit(50)
    )
    res = await db.execute(saved_events_stmt)
    events = res.scalars().all()
    
    return [convert_event_to_read(e, is_saved=True) for e in events]