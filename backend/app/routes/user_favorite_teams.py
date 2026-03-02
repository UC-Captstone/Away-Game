from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from db.session import get_session
from schemas.team import TeamRead
from auth import get_current_user, check_owner_or_admin
from models.user import User
from repositories.user_favorite_team_repo import (
    get_user_favorite_teams_service,
    add_favorite_team_service,
    replace_favorite_teams_service,
    remove_favorite_team_service,
)

router = APIRouter(prefix="/users/{user_id}/favorite-teams", tags=["user-favorite-teams"])


@router.get("/", response_model=List[TeamRead])
async def get_user_favorite_teams(
    user_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    check_owner_or_admin(user_id, current_user)
    return await get_user_favorite_teams_service(user_id=user_id, db=db)


@router.post("/{team_id}", response_model=TeamRead, status_code=status.HTTP_201_CREATED)
async def add_favorite_team(
    user_id: UUID,
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    check_owner_or_admin(user_id, current_user)
    return await add_favorite_team_service(user_id=user_id, team_id=team_id, db=db)


@router.put("/", response_model=List[TeamRead])
async def replace_favorite_teams(
    user_id: UUID,
    team_ids: List[int],
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    check_owner_or_admin(user_id, current_user)
    return await replace_favorite_teams_service(user_id=user_id, team_ids=team_ids, db=db)


@router.delete("/{team_id}", status_code=status.HTTP_204_NO_CONTENT)
async def remove_favorite_team(
    user_id: UUID,
    team_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    check_owner_or_admin(user_id, current_user)
    await remove_favorite_team_service(user_id=user_id, team_id=team_id, db=db)
    return None
