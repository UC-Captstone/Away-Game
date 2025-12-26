from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload
from typing import List, Optional

from db.session import get_session
from models.team import Team
from repositories.team_repo import TeamRepository
from schemas.team import TeamCreate, TeamRead, TeamUpdate

router = APIRouter(prefix="/teams", tags=["teams"])


@router.get("/", response_model=List[TeamRead])
async def get_teams(
    league_id: Optional[str] = Query(default=None, description="Filter by league code"),
    search: Optional[str] = Query(default=None, min_length=3, description="Search term for team name or location (minimum 3 characters)"),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session)
):

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


@router.get("/{team_id}", response_model=TeamRead)
async def get_team(
    team_id: int,
    db: AsyncSession = Depends(get_session)
):
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


@router.post("/", response_model=TeamRead, status_code=status.HTTP_201_CREATED)
async def create_team(
    team_data: TeamCreate,
    db: AsyncSession = Depends(get_session)
):

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


@router.patch("/{team_id}", response_model=TeamRead)
async def update_team(
    team_id: int,
    team_data: TeamUpdate,
    db: AsyncSession = Depends(get_session)
):
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


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team(
    team_id: int,
    db: AsyncSession = Depends(get_session)
):
    repo = TeamRepository(db)

    team = await repo.get(team_id)
    if not team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Team with id {team_id} not found"
        )

    await repo.remove(team_id)
    await db.commit()

    return None
