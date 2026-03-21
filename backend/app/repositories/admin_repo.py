from __future__ import annotations

from datetime import date, datetime
from typing import Sequence
from uuid import UUID

from sqlalchemy import delete, func, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status

from models.event import Event
from models.game import Game
from models.league import League
from models.user import User


async def get_overview_stats_service(db: AsyncSession) -> dict:
    today_start = datetime.combine(date.today(), datetime.min.time())
    today_end = datetime.combine(date.today(), datetime.max.time())

    total_users_result = await db.execute(select(func.count()).select_from(User))
    total_users: int = total_users_result.scalar_one()

    active_users_result = await db.execute(
        select(func.count()).select_from(User).where(User.role != "deactivated")
    )
    active_users: int = active_users_result.scalar_one()

    total_events_result = await db.execute(select(func.count()).select_from(Event))
    total_events: int = total_events_result.scalar_one()

    events_today_result = await db.execute(
        select(func.count())
        .select_from(Event)
        .where(Event.game_date >= today_start, Event.game_date <= today_end)
    )
    events_today: int = events_today_result.scalar_one()

    games_today_result = await db.execute(
        select(func.count())
        .select_from(Game)
        .where(Game.date_time >= today_start, Game.date_time <= today_end)
    )
    games_today: int = games_today_result.scalar_one()

    verified_creators_result = await db.execute(
        select(func.count()).select_from(User).where(User.role == "verified_creator")
    )
    verified_creators: int = verified_creators_result.scalar_one()

    pending_approvals_result = await db.execute(
        select(func.count()).select_from(User).where(User.pending_verification == True)
    )
    pending_approvals: int = pending_approvals_result.scalar_one()

    return {
        "total_users": total_users,
        "active_users": active_users,
        "total_events": total_events,
        "events_today": events_today,
        "games_today": games_today,
        "verified_creators": verified_creators,
        "pending_approvals": pending_approvals,
    }


async def list_all_leagues_service(db: AsyncSession) -> Sequence[League]:
    result = await db.execute(
        select(League).order_by(League.espn_sport.asc(), League.league_code.asc())
    )
    return result.scalars().all()


async def update_league_active_service(
    league_code: str, is_active: bool, db: AsyncSession
) -> League:
    result = await db.execute(select(League).where(League.league_code == league_code))
    league = result.scalar_one_or_none()
    if not league:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="League not found")
    league.is_active = is_active
    await db.commit()
    await db.refresh(league)
    return league


async def list_pending_verifications_service(db: AsyncSession) -> Sequence[User]:
    result = await db.execute(
        select(User)
        .where(User.pending_verification == True)
        .order_by(User.created_at.asc())
    )
    return result.scalars().all()


async def approve_verification_service(user_id: UUID, db: AsyncSession) -> User:
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_verified = True
    user.pending_verification = False
    user.role = "verified_creator"
    await db.commit()
    await db.refresh(user)
    return user


async def deny_verification_service(user_id: UUID, db: AsyncSession) -> User:
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.pending_verification = False
    await db.commit()
    await db.refresh(user)
    return user


async def list_verified_creators_service(db: AsyncSession) -> Sequence[User]:
    result = await db.execute(
        select(User)
        .where(User.role == "verified_creator")
        .order_by(User.username.asc())
    )
    return result.scalars().all()


async def revoke_creator_status_service(user_id: UUID, db: AsyncSession) -> User:
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_verified = False
    user.role = "user"
    await db.commit()
    await db.refresh(user)
    return user


async def list_all_users_service(
    db: AsyncSession, limit: int = 100, offset: int = 0
) -> Sequence[User]:
    result = await db.execute(
        select(User).order_by(User.created_at.desc()).limit(limit).offset(offset)
    )
    return result.scalars().all()


async def deactivate_user_service(user_id: UUID, db: AsyncSession) -> User:
    """Returns the user object (with clerk_id) before deleting from DB."""
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user


async def clear_clerk_id_service(user_id: UUID, db: AsyncSession) -> None:
    await db.execute(update(User).where(User.user_id == user_id).values(clerk_id=None))
    await db.commit()


async def delete_user_service(user_id: UUID, db: AsyncSession) -> None:
    await db.execute(delete(User).where(User.user_id == user_id))
    await db.commit()
