from __future__ import annotations
from typing import Sequence
from uuid import UUID

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.favorite import UserFavoriteTeams


class UserFavoriteTeamsRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_for_user(self, user_id: UUID) -> Sequence[UserFavoriteTeams]:
        res = await self.db.execute(
            select(UserFavoriteTeams).where(UserFavoriteTeams.user_id == user_id)
        )
        return res.scalars().all()

    async def add(
        self,
        *,
        user_id: UUID,
        espn_sport_id: int,
        espn_league_id: int,
        espn_team_id: int,
    ) -> UserFavoriteTeams:
        fav = UserFavoriteTeams(
            user_id=user_id,
            espn_sport_id=espn_sport_id,
            espn_league_id=espn_league_id,
            espn_team_id=espn_team_id,
        )
        self.db.add(fav)
        await self.db.flush()
        return fav

    async def remove(
        self,
        *,
        user_id: UUID,
        espn_sport_id: int,
        espn_league_id: int,
        espn_team_id: int,
    ) -> int:
        res = await self.db.execute(
            delete(UserFavoriteTeams).where(
                (UserFavoriteTeams.user_id == user_id)
                & (UserFavoriteTeams.espn_sport_id == espn_sport_id)
                & (UserFavoriteTeams.espn_league_id == espn_league_id)
                & (UserFavoriteTeams.espn_team_id == espn_team_id)
            )
        )
        return res.rowcount or 0
