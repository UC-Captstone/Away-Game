from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from ..db.session import get_session
from ..schemas.team import TeamCreate, TeamRead, TeamUpdate
from ..controllers.teams import (
    get_teams_service,
    get_team_service,
    create_team_service,
    update_team_service,
    delete_team_service,
)

router = APIRouter(prefix="/teams", tags=["teams"])


@router.get("/", response_model=List[TeamRead])
async def get_teams(
    league_id: Optional[str] = Query(default=None, description="Filter by league code"),
    search: Optional[str] = Query(default=None, min_length=3, description="Search term for team name or location (minimum 3 characters)"),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session)
):
    return await get_teams_service(
        league_id=league_id,
        search=search,
        limit=limit,
        offset=offset,
        db=db
    )


@router.get("/{team_id}", response_model=TeamRead)
async def get_team(
    team_id: int,
    db: AsyncSession = Depends(get_session)
):
    return await get_team_service(team_id=team_id, db=db)


@router.post("/", response_model=TeamRead, status_code=status.HTTP_201_CREATED)
async def create_team(
    team_data: TeamCreate,
    db: AsyncSession = Depends(get_session)
):
    return await create_team_service(team_data=team_data, db=db)


@router.patch("/{team_id}", response_model=TeamRead)
async def update_team(
    team_id: int,
    team_data: TeamUpdate,
    db: AsyncSession = Depends(get_session)
):
    return await update_team_service(team_id=team_id, team_data=team_data, db=db)


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_team(
    team_id: int,
    db: AsyncSession = Depends(get_session)
):
    await delete_team_service(team_id=team_id, db=db)
    return None
