from __future__ import annotations
from typing import Optional, Sequence
from sqlalchemy import func, select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.team import Team


class TeamRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, team_id: int) -> Optional[Team]:
        res = await self.db.execute(select(Team).where(Team.team_id == team_id))
        return res.scalar_one_or_none()

    async def get_by_espn_id(self, espn_team_id: int, league_id: str) -> Optional[Team]:
        res = await self.db.execute(
            select(Team).where(
                (Team.espn_team_id == espn_team_id) & (Team.league_id == league_id)
            )
        )
        return res.scalar_one_or_none()

    async def get_by_identity(self, *, league_id: str, home_location: str, team_name: str) -> Optional[Team]:
        res = await self.db.execute(
            select(Team).where(
                (Team.league_id == league_id)
                & (Team.home_location == home_location)
                & (Team.team_name == team_name)
            )
        )
        return res.scalar_one_or_none()

    async def count_by_league(self, league_id: str) -> int:
        res = await self.db.execute(
            select(func.count()).select_from(Team).where(Team.league_id == league_id)
        )
        return res.scalar_one()

    async def list(self, *, league_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> Sequence[Team]:
        stmt = select(Team).order_by(Team.display_name.asc()).limit(limit).offset(offset)
        if league_id is not None:
            stmt = stmt.where(Team.league_id == league_id)
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add(self, team: Team) -> Team:
        self.db.add(team)
        await self.db.flush()
        return team

    async def update_fields(
        self,
        team_id: int,
        *,
        league_id: Optional[str] = None,
        home_location: Optional[str] = None,
        team_name: Optional[str] = None,
        display_name: Optional[str] = None,
        logo_url: Optional[str] = None,
        home_venue_id: Optional[int] = None,
    ) -> Optional[Team]:
        values = {k: v for k, v in {
            "league_id": league_id,
            "home_location": home_location,
            "team_name": team_name,
            "display_name": display_name,
            "logo_url": logo_url,
            "home_venue_id": home_venue_id,
        }.items() if v is not None}
        if not values:
            return await self.get(team_id)
        await self.db.execute(update(Team).where(Team.team_id == team_id).values(**values))
        return await self.get(team_id)

    async def upsert(
        self,
        espn_team_id: int,
        league_id: str,
        home_location: str,
        team_name: str,
        display_name: str,
        logo_url: Optional[str] = None,
        home_venue_id: Optional[int] = None,
    ) -> Team:
        existing = await self.get_by_espn_id(espn_team_id, league_id)
        if existing:
            return existing
        team = Team(
            espn_team_id=espn_team_id,
            league_id=league_id,
            home_location=home_location,
            team_name=team_name,
            display_name=display_name,
            logo_url=logo_url,
            home_venue_id=home_venue_id,
        )
        return await self.add(team)

    async def remove(self, team_id: int) -> int:
        res = await self.db.execute(delete(Team).where(Team.team_id == team_id))
        return res.rowcount or 0
