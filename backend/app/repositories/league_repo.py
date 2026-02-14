from __future__ import annotations
from typing import Optional, Sequence
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.league import League


class LeagueRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, league_code: str) -> Optional[League]:
        res = await self.db.execute(select(League).where(League.league_code == league_code))
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[League]:
        res = await self.db.execute(
            select(League).order_by(League.league_code.asc()).limit(limit).offset(offset)
        )
        return res.scalars().all()

    async def add(self, league: League) -> League:
        self.db.add(league)
        await self.db.flush()
        return league

    async def update_fields(
        self,
        league_code: str,
        *,
        league_name: Optional[str] = None,
        espn_sport: Optional[str] = None,
        espn_league: Optional[str] = None,
        is_active: Optional[bool] = None,
    ) -> Optional[League]:
        values = {k: v for k, v in {
            "league_name": league_name,
            "espn_sport": espn_sport,
            "espn_league": espn_league,
            "is_active": is_active,
        }.items() if v is not None}
        if not values:
            return await self.get(league_code)
        await self.db.execute(update(League).where(League.league_code == league_code).values(**values))
        return await self.get(league_code)

    async def remove(self, league_code: str) -> int:
        res = await self.db.execute(delete(League).where(League.league_code == league_code))
        return res.rowcount or 0