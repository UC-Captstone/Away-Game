from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.game import Game


class GameRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, game_id: UUID) -> Optional[Game]:
        res = await self.db.execute(
            select(Game).where(Game.game_id == game_id)
        )
        return res.scalar_one_or_none()

    async def get_by_identity(
        self,
        *,
        espn_sport_id: int,
        espn_league_id: int,
        espn_team_id: int,
        date_time: datetime,
    ) -> Optional[Game]:
        res = await self.db.execute(
            select(Game).where(
                (Game.espn_sport_id == espn_sport_id)
                & (Game.espn_league_id == espn_league_id)
                & (Game.espn_team_id == espn_team_id)
                & (Game.date_time == date_time)
            )
        )
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 50, offset: int = 0) -> Sequence[Game]:
        stmt = (
            select(Game)
            .order_by(Game.date_time.desc())
            .limit(limit)
            .offset(offset)
        )
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add(self, game: Game) -> Game:
        self.db.add(game)
        await self.db.flush()
        return game

    async def update_fields(
        self,
        game_id: UUID,
        *,
        espn_sport_id: Optional[int] = None,
        espn_league_id: Optional[int] = None,
        espn_team_id: Optional[int] = None,
        date_time: Optional[datetime] = None,
    ) -> Optional[Game]:
        values = {
            k: v
            for k, v in {
                "espn_sport_id": espn_sport_id,
                "espn_league_id": espn_league_id,
                "espn_team_id": espn_team_id,
                "date_time": date_time,
            }.items()
            if v is not None
        }
        if not values:
            return await self.get(game_id)

        await self.db.execute(
            update(Game)
            .where(Game.game_id == game_id)
            .values(**values)
        )
        return await self.get(game_id)

    async def remove(self, game_id: UUID) -> int:
        res = await self.db.execute(
            delete(Game).where(Game.game_id == game_id)
        )
        return res.rowcount or 0
