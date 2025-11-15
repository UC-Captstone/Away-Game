from __future__ import annotations
from typing import Sequence
from uuid import UUID
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user_favorite_team import UserFavoriteTeams


class UserFavoriteTeamsRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_for_user(self, user_id: UUID) -> Sequence[UserFavoriteTeams]:
        res = await self.db.execute(
            select(UserFavoriteTeams).where(UserFavoriteTeams.user_id == user_id)
        )
        return res.scalars().all()

    async def add(self, fav: UserFavoriteTeams) -> UserFavoriteTeams:
        self.db.add(fav)
        await self.db.flush()
        return fav

    async def remove(self, user_id: UUID, team_id: int) -> int:
        res = await self.db.execute(
            delete(UserFavoriteTeams).where(
                (UserFavoriteTeams.user_id == user_id) & (UserFavoriteTeams.team_id == team_id)
            )
        )
        return res.rowcount or 0
