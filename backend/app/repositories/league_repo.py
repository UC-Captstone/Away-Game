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

    async def get_by_codes(self, *, espn_sport: str, league_code: str) -> Optional[League]:
        res = await self.db.execute(
            select(League).where((League.espn_sport == espn_sport) & (League.league_code == league_code))
        )
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[League]:
        res = await self.db.execute(
            select(League).order_by(League.espn_sport.asc(), League.league_code.asc()).limit(limit).offset(offset)
        )
        return res.scalars().all()

    async def list_active(self) -> Sequence[League]:
        res = await self.db.execute(
            select(League).where(League.is_active == True).order_by(League.league_code.asc())
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
        espn_sport: Optional[str] = None,
        espn_league: Optional[str] = None,
        league_name: Optional[str] = None,
    ) -> Optional[League]:
        values = {k: v for k, v in {
            "espn_sport": espn_sport,
            "espn_league": espn_league,
            "league_name": league_name,
        }.items() if v is not None}
        if not values:
            return await self.get(league_code)
        await self.db.execute(update(League).where(League.league_code == league_code).values(**values))
        return await self.get(league_code)

    async def upsert(
        self,
        league_code: str,
        espn_sport: str,
        league_name: str,
        espn_league: Optional[str] = None,
        is_active: bool = False,
    ) -> League:
        existing = await self.get(league_code)
        if existing:
            return existing
        league = League(
            league_code=league_code,
            espn_sport=espn_sport,
            espn_league=espn_league,
            league_name=league_name,
            is_active=is_active,
        )
        return await self.add(league)

    async def remove(self, league_code: str) -> int:
        res = await self.db.execute(delete(League).where(League.league_code == league_code))
        return res.rowcount or 0
