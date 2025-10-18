# app/repositories/favorite_repo.py
from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.favorite import Favorite


class FavoriteRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, favorite_id: UUID) -> Optional[Favorite]:
        res = await self.db.execute(
            select(Favorite).where(Favorite.favorite_id == favorite_id)
        )
        return res.scalar_one_or_none()

    async def list_by_user(self, user_id: UUID, *, limit: int = 50, offset: int = 0) -> Sequence[Favorite]:
        res = await self.db.execute(
            select(Favorite)
            .where(Favorite.user_id == user_id)
            .order_by(Favorite.date_time.desc())
            .limit(limit)
            .offset(offset)
        )
        return res.scalars().all()

    async def add_event_favorite(self, *, user_id: UUID, event_id: UUID, date_time: datetime) -> Favorite:
        fav = Favorite(user_id=user_id, event_id=event_id, game_id=None, date_time=date_time)
        self.db.add(fav)
        await self.db.flush()
        return fav

    async def add_game_favorite(self, *, user_id: UUID, game_id: UUID, date_time: datetime) -> Favorite:
        fav = Favorite(user_id=user_id, game_id=game_id, event_id=None, date_time=date_time)
        self.db.add(fav)
        await self.db.flush()
        return fav

    async def remove(self, favorite_id: UUID) -> int:
        res = await self.db.execute(
            delete(Favorite).where(Favorite.favorite_id == favorite_id)
        )
        return res.rowcount or 0

    async def remove_event_for_user(self, *, user_id: UUID, event_id: UUID) -> int:
        res = await self.db.execute(
            delete(Favorite).where(
                (Favorite.user_id == user_id) & (Favorite.event_id == event_id)
            )
        )
        return res.rowcount or 0

    async def remove_game_for_user(self, *, user_id: UUID, game_id: UUID) -> int:
        res = await self.db.execute(
            delete(Favorite).where(
                (Favorite.user_id == user_id) & (Favorite.game_id == game_id)
            )
        )
        return res.rowcount or 0
