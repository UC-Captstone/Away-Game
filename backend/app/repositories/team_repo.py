from __future__ import annotations
from typing import Optional, Sequence
from sqlalchemy import func, select, update, delete, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from fastapi import HTTPException, status

from models.team import Team
from schemas.converters import convert_team_to_read
from schemas.team import TeamCreate, TeamRead, TeamUpdate


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
        espn_team_id: Optional[str] = None,
    ) -> Optional[Team]:
        values = {k: v for k, v in {
            "league_id": league_id,
            "home_location": home_location,
            "team_name": team_name,
            "display_name": display_name,
            "logo_url": logo_url,
            "home_venue_id": home_venue_id,
            "espn_team_id": espn_team_id,
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


async def get_teams_service(
    league_id: Optional[str],
    search: Optional[str],
    limit: int,
    offset: int,
    db: AsyncSession,
) -> list[TeamRead]:
    stmt = (
        select(Team)
        .options(selectinload(Team.league))
        .order_by(Team.display_name.asc())
        .limit(limit)
        .offset(offset)
    )

    if league_id:
        stmt = stmt.where(Team.league_id == league_id)

    if search:
        search_pattern = f"%{search}%"
        stmt = stmt.where(
            or_(
                Team.display_name.ilike(search_pattern),
                Team.team_name.ilike(search_pattern),
                Team.home_location.ilike(search_pattern),
            )
        )

    result = await db.execute(stmt)
    teams = result.scalars().all()

    return [convert_team_to_read(team) for team in teams]


async def get_team_service(team_id: int, db: AsyncSession) -> TeamRead:
    stmt = (
        select(Team)
        .where(Team.team_id == team_id)
        .options(selectinload(Team.league))
    )

    result = await db.execute(stmt)
    team = result.scalar_one_or_none()

    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Team with id {team_id} not found",
        )

    return convert_team_to_read(team)


async def create_team_service(team_data: TeamCreate, db: AsyncSession) -> TeamRead:
    repo = TeamRepository(db)

    existing_team = await repo.get_by_identity(
        league_id=team_data.league_id,
        home_location=team_data.home_location,
        team_name=team_data.team_name,
    )
    if existing_team:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Team '{team_data.team_name}' in '{team_data.home_location}' for league '{team_data.league_id}' already exists",
        )

    new_team = Team(**team_data.model_dump())
    created_team = await repo.add(new_team)
    await db.commit()
    await db.refresh(created_team)

    await db.refresh(created_team, ["league"])

    return convert_team_to_read(created_team)


async def update_team_service(
    team_id: int,
    team_data: TeamUpdate,
    db: AsyncSession,
) -> TeamRead:
    repo = TeamRepository(db)

    existing_team = await repo.get(team_id)
    if not existing_team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Team with id {team_id} not found",
        )

    update_data = team_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(existing_team, field, value)

    await db.commit()
    await db.refresh(existing_team)

    await db.refresh(existing_team, ["league"])

    return convert_team_to_read(existing_team)


async def delete_team_service(team_id: int, db: AsyncSession) -> None:
    repo = TeamRepository(db)

    team = await repo.get(team_id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Team with id {team_id} not found",
        )

    await repo.remove(team_id)
    await db.commit()
