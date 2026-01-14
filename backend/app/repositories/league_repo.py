from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from ..models.league import League


class LeagueRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, league_id: UUID) -> Optional[League]:
        res = await self.db.execute(select(League).where(League.league_id == league_id))
        return res.scalar_one_or_none()

    async def get_by_codes(self, *, sport_code: str, league_code: str) -> Optional[League]:
        res = await self.db.execute(
            select(League).where((League.sport_code == sport_code) & (League.league_code == league_code))
        )
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[League]:
        res = await self.db.execute(
            select(League).order_by(League.sport_code.asc(), League.league_code.asc()).limit(limit).offset(offset)
        )
        return res.scalars().all()

    async def add(self, league: League) -> League:
        self.db.add(league)
        await self.db.flush()
        return league

    async def update_fields(
        self,
        league_id: UUID,
        *,
        sport_code: Optional[str] = None,
        league_code: Optional[str] = None,
        league_name: Optional[str] = None,
        espn_league_id: Optional[int] = None,
    ) -> Optional[League]:
        values = {k: v for k, v in {
            "sport_code": sport_code,
            "league_code": league_code,
            "league_name": league_name,
            "espn_league_id": espn_league_id,
        }.items() if v is not None}
        if not values:
            return await self.get(league_id)
        await self.db.execute(update(League).where(League.league_id == league_id).values(**values))
        return await self.get(league_id)

    async def remove(self, league_id: UUID) -> int:
        res = await self.db.execute(delete(League).where(League.league_id == league_id))
        return res.rowcount or 0
