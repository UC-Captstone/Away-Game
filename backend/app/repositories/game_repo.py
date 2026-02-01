from __future__ import annotations
from typing import Optional, Sequence
from datetime import datetime
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.game import Game


class GameRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, game_id: int) -> Optional[Game]:
        res = await self.db.execute(select(Game).where(Game.game_id == game_id))
        return res.scalar_one_or_none()

    async def get_by_identity(
        self,
        *,
        league_id: str,
        home_team_id: int,
        away_team_id: int,
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

    async def list(self, *, league_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> Sequence[Game]:
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
        game_id: int,
        *,
        league_id: Optional[str] = None,
        home_team_id: Optional[int] = None,
        away_team_id: Optional[int] = None,
        venue_id: Optional[int] = None,
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

    async def upsert(
        self,
        game_id: int,
        league_id: str,
        home_team_id: int,
        away_team_id: int,
        date_time: datetime,
        venue_id: Optional[int] = None,
    ) -> Game:
        existing = await self.get(game_id)
        if existing:
            if existing.date_time == date_time and existing.venue_id == venue_id:
                return existing
            return await self.update_fields(
                game_id,
                venue_id=venue_id,
                date_time=date_time,
            )
        game = Game(
            game_id=game_id,
            league_id=league_id,
            home_team_id=home_team_id,
            away_team_id=away_team_id,
            venue_id=venue_id,
            date_time=date_time,
        )
        return await self.add(game)

    async def remove(self, game_id: int) -> int:
        res = await self.db.execute(delete(Game).where(Game.game_id == game_id))
        return res.rowcount or 0
