from typing import List
from uuid import UUID
import uuid

import sqlalchemy as sa
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from models.event import Event
from models.favorite import Favorite
from models.game import Game
from models.team import Team
from models.team_chat import TeamChat
from models.user import User
from models.user_favorite_team import UserFavoriteTeams
from repositories.user_favorite_team_repo import UserFavoriteTeamsRepository
from schemas.converters import convert_event_to_read, convert_team_chat_to_read, convert_team_to_read
from schemas.common import Location
from schemas.event import EventRead, TeamLogos
from schemas.types import EventTypeEnum
from schemas.user import AccountSettings, HeaderInfo, NavBarInfo, UserProfile


async def get_user_profile_service(current_user: User, db: AsyncSession) -> UserProfile:
    favorite_teams_stmt = (
        select(Team)
        .join(UserFavoriteTeams, UserFavoriteTeams.team_id == Team.team_id)
        .where(UserFavoriteTeams.user_id == current_user.user_id)
        .options(selectinload(Team.league))
    )
    favorite_teams_result = await db.execute(favorite_teams_stmt)
    favorite_teams = favorite_teams_result.scalars().all()

    saved_items = await _get_saved_items_for_user(current_user.user_id, db)

    my_events_stmt = (
        select(Event)
        .where(Event.creator_user_id == current_user.user_id)
        .options(
            selectinload(Event.game).selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Event.game).selectinload(Game.league),
            selectinload(Event.venue),
        )
        .order_by(Event.created_at.desc())
        .limit(50)
    )
    my_events_result = await db.execute(my_events_stmt)
    my_events = my_events_result.scalars().all()

    my_chats_stmt = (
        select(TeamChat)
        .where(TeamChat.user_id == current_user.user_id)
        .options(
            selectinload(TeamChat.team),
            selectinload(TeamChat.user),
        )
        .order_by(TeamChat.timestamp.desc())
        .limit(50)
    )
    my_chats_result = await db.execute(my_chats_stmt)
    my_chats = my_chats_result.scalars().all()

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
        favorite_teams=[convert_team_to_read(team) for team in favorite_teams],
    )

    account_settings = AccountSettings(
        first_name=current_user.first_name or "",
        last_name=current_user.last_name or "",
        email=current_user.email,
        applied_for_verification=current_user.pending_verification,
        enable_nearby_event_notifications=current_user.enable_nearby_event_notifications,
        enable_favorite_team_notifications=current_user.enable_favorite_team_notifications,
        enable_safety_alert_notifications=current_user.enable_safety_alert_notifications,
    )

    return UserProfile(
        header_info=header_info,
        account_settings=account_settings,
        saved_events=saved_items,
        my_events=[convert_event_to_read(e, is_saved=False) for e in my_events],
        my_chats=[convert_team_chat_to_read(chat) for chat in my_chats],
    )


async def update_account_settings_service(
    current_user: User,
    db: AsyncSession,
    account_settings: AccountSettings,
) -> None:
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

    if account_settings.enable_nearby_event_notifications is not None:
        current_user.enable_nearby_event_notifications = account_settings.enable_nearby_event_notifications
        updated = True
    if account_settings.enable_favorite_team_notifications is not None:
        current_user.enable_favorite_team_notifications = account_settings.enable_favorite_team_notifications
        updated = True
    if account_settings.enable_safety_alert_notifications is not None:
        current_user.enable_safety_alert_notifications = account_settings.enable_safety_alert_notifications
        updated = True

    if account_settings.applied_for_verification is not None:
        current_user.pending_verification = account_settings.applied_for_verification
        updated = True

    if not updated:
        return

    await db.commit()
    await db.refresh(current_user)


async def submit_verification_service(current_user: User, db: AsyncSession) -> None:
    current_user.is_verified = True
    current_user.pending_verification = False
    current_user.role = "verified_creator"
    await db.commit()
    await db.refresh(current_user)


async def update_favorite_teams_service(
    current_user: User,
    db: AsyncSession,
    team_ids: List[int],
) -> None:
    repo = UserFavoriteTeamsRepository(db)
    existing = await repo.list_for_user(current_user.user_id)
    existing_ids = {fav.team_id for fav in existing}
    incoming_ids = set(team_ids)

    for tid in existing_ids - incoming_ids:
        await repo.remove(current_user.user_id, tid)

    for tid in incoming_ids - existing_ids:
        fav = UserFavoriteTeams(user_id=current_user.user_id, team_id=tid)
        await repo.add(fav)

    await db.commit()


async def delete_account_service(current_user: User, db: AsyncSession) -> None:
    await db.delete(current_user)
    await db.commit()


async def delete_saved_event_service(
    current_user: User,
    db: AsyncSession,
    event_id: UUID,
) -> List[EventRead]:
    deleted_by_event = await db.execute(
        sa.delete(Favorite).where(
            (Favorite.user_id == current_user.user_id) & (Favorite.event_id == event_id)
        )
    )

    if (deleted_by_event.rowcount or 0) == 0:
        game_favs_stmt = (
            select(Favorite)
            .where(Favorite.user_id == current_user.user_id)
            .where(Favorite.game_id.isnot(None))
        )
        game_favs_result = await db.execute(game_favs_stmt)
        game_favorites = game_favs_result.scalars().all()

        matched_game_id = None
        for favorite in game_favorites:
            synthetic_id = uuid.uuid5(uuid.NAMESPACE_DNS, f"game:{favorite.game_id}")
            if synthetic_id == event_id:
                matched_game_id = favorite.game_id
                break

        if matched_game_id is not None:
            await db.execute(
                sa.delete(Favorite).where(
                    (Favorite.user_id == current_user.user_id) & (Favorite.game_id == matched_game_id)
                )
            )

    await db.commit()
    return await _get_saved_items_for_user(current_user.user_id, db)


async def add_saved_event_service(
    current_user: User,
    db: AsyncSession,
    event_id: UUID,
) -> List[EventRead]:
    existing_event_favorite_stmt = (
        select(Favorite)
        .where(Favorite.user_id == current_user.user_id)
        .where(Favorite.event_id == event_id)
    )
    existing_event_favorite_result = await db.execute(existing_event_favorite_stmt)
    if existing_event_favorite_result.scalar_one_or_none() is not None:
        return await _get_saved_items_for_user(current_user.user_id, db)

    event_stmt = (
        select(Event)
        .where(Event.event_id == event_id)
    )
    event_result = await db.execute(event_stmt)
    event = event_result.scalar_one_or_none()

    if event is not None:
        db.add(Favorite(user_id=current_user.user_id, event_id=event.event_id, game_id=None))
        await db.commit()
        return await _get_saved_items_for_user(current_user.user_id, db)

    games_id_stmt = select(Game.game_id)
    games_id_result = await db.execute(games_id_stmt)
    matched_game_id = None
    for game_id in games_id_result.scalars().all():
        synthetic_id = uuid.uuid5(uuid.NAMESPACE_DNS, f"game:{game_id}")
        if synthetic_id == event_id:
            matched_game_id = game_id
            break

    if matched_game_id is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event with id {event_id} not found",
        )

    existing_game_favorite_stmt = (
        select(Favorite)
        .where(Favorite.user_id == current_user.user_id)
        .where(Favorite.game_id == matched_game_id)
    )
    existing_game_favorite_result = await db.execute(existing_game_favorite_stmt)
    if existing_game_favorite_result.scalar_one_or_none() is None:
        db.add(Favorite(user_id=current_user.user_id, event_id=None, game_id=matched_game_id))
        await db.commit()

    return await _get_saved_items_for_user(current_user.user_id, db)


async def get_navbar_info_service(current_user: User, db: AsyncSession) -> NavBarInfo:
    display_name = ""
    if current_user.first_name and current_user.last_name:
        display_name = f"{current_user.first_name} {current_user.last_name}"
    elif current_user.first_name:
        display_name = current_user.first_name
    else:
        display_name = current_user.username

    return NavBarInfo(
        profile_picture_url=current_user.profile_picture_url,
        username=current_user.username,
        display_name=display_name,
    )


def _convert_game_to_read(game: Game, is_saved: bool = False) -> EventRead:
    home_team_name = (
        game.home_team.display_name
        if game.home_team and game.home_team.display_name
        else (game.home_team.team_name if game.home_team and game.home_team.team_name else "Home")
    )
    away_team_name = (
        game.away_team.display_name
        if game.away_team and game.away_team.display_name
        else (game.away_team.team_name if game.away_team and game.away_team.team_name else "Away")
    )

    venue_lat = game.venue.latitude if game.venue and game.venue.latitude is not None else 0.0
    venue_lng = game.venue.longitude if game.venue and game.venue.longitude is not None else 0.0

    league_value = game.league.league_code if game.league and game.league.league_code else None

    return EventRead(
        event_id=uuid.uuid5(uuid.NAMESPACE_DNS, f"game:{game.game_id}"),
        event_type=EventTypeEnum.GAME,
        event_name=f"{away_team_name} @ {home_team_name}",
        date_time=game.date_time,
        location=Location(lat=venue_lat, lng=venue_lng),
        venue_name=game.venue.name if game.venue else "",
        image_url=game.home_team.logo_url if game.home_team else None,
        team_logos=TeamLogos(
            home=game.home_team.logo_url if game.home_team else None,
            away=game.away_team.logo_url if game.away_team else None,
        ),
        league=league_value,
        is_user_created=False,
        is_saved=is_saved,
    )


async def _get_saved_items_for_user(
    user_id: UUID,
    db: AsyncSession,
    limit: int = 50,
) -> List[EventRead]:
    favorites_stmt = (
        select(Favorite)
        .where(Favorite.user_id == user_id)
        .order_by(Favorite.date_time.desc())
        .limit(limit)
    )
    favorites_result = await db.execute(favorites_stmt)
    favorites = favorites_result.scalars().all()

    event_ids = [fav.event_id for fav in favorites if fav.event_id is not None]
    game_ids = [fav.game_id for fav in favorites if fav.game_id is not None]

    events_by_id = {}
    games_by_id = {}

    if event_ids:
        events_stmt = (
            select(Event)
            .where(Event.event_id.in_(event_ids))
            .options(
                selectinload(Event.game).selectinload(Game.home_team).selectinload(Team.league),
                selectinload(Event.game).selectinload(Game.away_team).selectinload(Team.league),
                selectinload(Event.game).selectinload(Game.league),
                selectinload(Event.venue),
            )
        )
        events_result = await db.execute(events_stmt)
        events = events_result.scalars().all()
        events_by_id = {event.event_id: event for event in events}

    if game_ids:
        games_stmt = (
            select(Game)
            .where(Game.game_id.in_(game_ids))
            .options(
                selectinload(Game.home_team),
                selectinload(Game.away_team),
                selectinload(Game.league),
                selectinload(Game.venue),
            )
        )
        games_result = await db.execute(games_stmt)
        games = games_result.scalars().all()
        games_by_id = {game.game_id: game for game in games}

    saved_items: list[EventRead] = []
    for favorite in favorites:
        if favorite.event_id is not None:
            event = events_by_id.get(favorite.event_id)
            if event:
                saved_items.append(convert_event_to_read(event, is_saved=True))
            continue
        if favorite.game_id is not None:
            game = games_by_id.get(favorite.game_id)
            if game:
                saved_items.append(_convert_game_to_read(game, is_saved=True))

    return saved_items
