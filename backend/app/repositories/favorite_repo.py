from __future__ import annotations
from typing import Optional, Sequence, List
from uuid import UUID
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status

from models.event import Event
from models.favorite import Favorite
from models.user import User


class FavoriteRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, favorite_id: UUID) -> Optional[Favorite]:
        res = await self.db.execute(select(Favorite).where(Favorite.favorite_id == favorite_id))
        return res.scalar_one_or_none()

    async def list_for_user(self, user_id: UUID, *, limit: int = 100, offset: int = 0) -> Sequence[Favorite]:
        res = await self.db.execute(
            select(Favorite)
            .where(Favorite.user_id == user_id)
            .order_by(Favorite.date_time.desc())
            .limit(limit)
            .offset(offset)
        )
        return res.scalars().all()

    async def add(self, fav: Favorite) -> Favorite:
        self.db.add(fav)
        await self.db.flush()
        return fav

    async def remove(self, favorite_id: UUID) -> int:
        res = await self.db.execute(delete(Favorite).where(Favorite.favorite_id == favorite_id))
        return res.rowcount or 0


async def get_saved_events_service(
    user_id: UUID,
    limit: int,
    offset: int,
    db: AsyncSession,
) -> List[Event]:
    user_result = await db.execute(select(User).where(User.user_id == user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found",
        )

    stmt = (
        select(Event)
        .join(Favorite, Favorite.event_id == Event.event_id)
        .where(Favorite.user_id == user_id)
        .where(Favorite.event_id.isnot(None))
        .options(
            selectinload(Event.game),
            selectinload(Event.venue),
        )
        .order_by(Favorite.date_time.desc())
        .limit(limit)
        .offset(offset)
    )

    result = await db.execute(stmt)
    events = result.scalars().all()
    return events


async def delete_saved_event_service(
    user_id: UUID,
    event_id: UUID,
    db: AsyncSession,
) -> List[Event]:
    stmt = select(Favorite).where(
        (Favorite.user_id == user_id) & (Favorite.event_id == event_id)
    )
    result = await db.execute(stmt)
    favorite = result.scalar_one_or_none()

    if not favorite:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event {event_id} is not in user's saved events",
        )

    repo = FavoriteRepository(db)
    await repo.remove(favorite.favorite_id)
    await db.commit()

    updated_stmt = (
        select(Event)
        .join(Favorite, Favorite.event_id == Event.event_id)
        .where(Favorite.user_id == user_id)
        .where(Favorite.event_id.isnot(None))
        .options(
            selectinload(Event.game),
            selectinload(Event.venue),
        )
        .order_by(Favorite.date_time.desc())
    )

    updated_result = await db.execute(updated_stmt)
    updated_events = updated_result.scalars().all()
    return updated_events


async def add_saved_event_service(
    user_id: UUID,
    event_id: UUID,
    db: AsyncSession,
) -> Event:
    user_result = await db.execute(select(User).where(User.user_id == user_id))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found",
        )

    event_stmt = select(Event).where(Event.event_id == event_id).options(
        selectinload(Event.game),
        selectinload(Event.venue),
    )
    event_result = await db.execute(event_stmt)
    event = event_result.scalar_one_or_none()
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event with id {event_id} not found",
        )

    existing_stmt = select(Favorite).where(
        (Favorite.user_id == user_id) & (Favorite.event_id == event_id)
    )
    existing_result = await db.execute(existing_stmt)
    existing = existing_result.scalar_one_or_none()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Event {event_id} is already in user's saved events",
        )

    repo = FavoriteRepository(db)
    favorite = Favorite(user_id=user_id, event_id=event_id, game_id=None)
    await repo.add(favorite)
    await db.commit()

    return event
