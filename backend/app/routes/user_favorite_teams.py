from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from db.session import get_session
from schemas.team import TeamRead
from controllers.user_favorite_teams import (
    get_user_favorite_teams_service,
    add_favorite_team_service,
    replace_favorite_teams_service,
    remove_favorite_team_service,
)

router = APIRouter(prefix="/users/{user_id}/favorite-teams", tags=["user-favorite-teams"])


@router.get("/", response_model=List[TeamRead])
async def get_user_favorite_teams(
    user_id: UUID,
    db: AsyncSession = Depends(get_session)
):
    return await get_user_favorite_teams_service(user_id=user_id, db=db)


@router.post("/{team_id}", response_model=TeamRead, status_code=status.HTTP_201_CREATED)
async def add_favorite_team(
    user_id: UUID,
    team_id: int,
    db: AsyncSession = Depends(get_session)
):
    return await add_favorite_team_service(user_id=user_id, team_id=team_id, db=db)


@router.put("/", response_model=List[TeamRead])
async def replace_favorite_teams(
    user_id: UUID,
    team_ids: List[int],
    db: AsyncSession = Depends(get_session)
):
    return await replace_favorite_teams_service(user_id=user_id, team_ids=team_ids, db=db)


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_favorite_team(
    user_id: UUID,
    team_id: int,
    db: AsyncSession = Depends(get_session)
):
    await remove_favorite_team_service(user_id=user_id, team_id=team_id, db=db)
    return None
