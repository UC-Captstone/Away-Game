from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload

from app.models.team import Team
from app.repositories.team_repo import TeamRepository
from app.schemas.team import TeamCreate, TeamUpdate


async def get_teams_service(
    league_id: Optional[str],
    search: Optional[str],
    limit: int,
    offset: int,
    db: AsyncSession
) -> List[Team]:
    """
    Get a list of teams with optional filtering by league and search term.
    """
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
                Team.home_location.ilike(search_pattern)
            )
        )

    result = await db.execute(stmt)
    teams = result.scalars().all()

    return teams


async def get_team_service(team_id: int, db: AsyncSession) -> Team:
    """
    Get a single team by ID.
    """
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
            detail=f"Team with id {team_id} not found"
        )

    return team


async def create_team_service(team_data: TeamCreate, db: AsyncSession) -> Team:
    """
    Create a new team.
    """
    repo = TeamRepository(db)

    existing_team = await repo.get_by_identity(
        league_id=team_data.league_id,
        home_location=team_data.home_location,
        team_name=team_data.team_name
    )
    if existing_team:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Team '{team_data.team_name}' in '{team_data.home_location}' for league '{team_data.league_id}' already exists"
        )

    new_team = Team(**team_data.model_dump())
    created_team = await repo.add(new_team)
    await db.commit()
    await db.refresh(created_team)

    return created_team


async def update_team_service(
    team_id: int,
    team_data: TeamUpdate,
    db: AsyncSession
) -> Team:
    """
    Update an existing team.
    """
    repo = TeamRepository(db)

    existing_team = await repo.get(team_id)
    if not existing_team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Team with id {team_id} not found"
        )

    update_data = team_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(existing_team, field, value)

    await db.commit()
    await db.refresh(existing_team)

    return existing_team


async def delete_team_service(team_id: int, db: AsyncSession) -> None:
    """
    Delete a team by ID.
    """
    repo = TeamRepository(db)

    team = await repo.get(team_id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Team with id {team_id} not found"
        )

    await repo.remove(team_id)
    await db.commit()