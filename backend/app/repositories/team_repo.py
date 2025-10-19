from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.team import Team


class TeamRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, team_id: UUID) -> Optional[Team]:
        res = await self.db.execute(select(Team).where(Team.team_id == team_id))
        return res.scalar_one_or_none()

    async def get_by_identity(self, *, league_id: UUID, home_location: str, team_name: str) -> Optional[Team]:
        res = await self.db.execute(
            select(Team).where(
                (Team.league_id == league_id)
                & (Team.home_location == home_location)
                & (Team.team_name == team_name)
            )
        )
        return res.scalar_one_or_none()

    async def list(self, *, league_id: Optional[UUID] = None, limit: int = 100, offset: int = 0) -> Sequence[Team]:
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
        team_id: UUID,
        *,
        league_id: Optional[UUID] = None,
        sport_league: Optional[str] = None,
        sport_conference: Optional[str] = None,
        sport_division: Optional[str] = None,
        home_location: Optional[str] = None,
        team_name: Optional[str] = None,
        display_name: Optional[str] = None,
        home_venue_id: Optional[UUID] = None,
        espn_team_id: Optional[int] = None,
    ) -> Optional[Team]:
        values = {k: v for k, v in {
            "league_id": league_id,
            "sport_league": sport_league,
            "sport_conference": sport_conference,
            "sport_division": sport_division,
            "home_location": home_location,
            "team_name": team_name,
            "display_name": display_name,
            "home_venue_id": home_venue_id,
            "espn_team_id": espn_team_id,
        }.items() if v is not None}
        if not values:
            return await self.get(team_id)
        await self.db.execute(update(Team).where(Team.team_id == team_id).values(**values))
        return await self.get(team_id)

    async def remove(self, team_id: UUID) -> int:
        res = await self.db.execute(delete(Team).where(Team.team_id == team_id))
        return res.rowcount or 0
