from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.favorite import Favorite


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
