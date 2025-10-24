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
        res = await self.db.execute(select(Game).where(Game.game_id == game_id))
        return res.scalar_one_or_none()

    async def get_by_identity(
        self,
        *,
        league_id: UUID,
        home_team_id: UUID,
        away_team_id: UUID,
        date_time: datetime,
    ) -> Optional[Game]:
        res = await self.db.execute(
            select(Game).where(
                (Game.league_id == league_id)
                & (Game.home_team_id == home_team_id)
                & (Game.away_team_id == away_team_id)
                & (Game.date_time == date_time)
            )
        )
        return res.scalar_one_or_none()

    async def list(self, *, league_id: Optional[UUID] = None, limit: int = 100, offset: int = 0) -> Sequence[Game]:
        stmt = select(Game).order_by(Game.date_time.desc()).limit(limit).offset(offset)
        if league_id is not None:
            stmt = stmt.where(Game.league_id == league_id)
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
        league_id: Optional[UUID] = None,
        home_team_id: Optional[UUID] = None,
        away_team_id: Optional[UUID] = None,
        venue_id: Optional[UUID] = None,
        date_time: Optional[datetime] = None,
    ) -> Optional[Game]:
        values = {k: v for k, v in {
            "league_id": league_id,
            "home_team_id": home_team_id,
            "away_team_id": away_team_id,
            "venue_id": venue_id,
            "date_time": date_time,
        }.items() if v is not None}
        if not values:
            return await self.get(game_id)
        await self.db.execute(update(Game).where(Game.game_id == game_id).values(**values))
        return await self.get(game_id)

    async def remove(self, game_id: UUID) -> int:
        res = await self.db.execute(delete(Game).where(Game.game_id == game_id))
        return res.rowcount or 0
