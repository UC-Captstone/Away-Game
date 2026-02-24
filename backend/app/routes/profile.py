from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from repositories.profile_repo import (
    get_user_profile_service,
    update_account_settings_service,
    update_favorite_teams_service,
    delete_account_service,
    add_saved_event_service,
    delete_saved_event_service,
    get_navbar_info_service,
)
from db.session import get_session
from auth import get_current_user
from models.user import User
from schemas.user import NavBarInfo, UserProfile, AccountSettings
from schemas.user_favorite_team import FavoriteTeamsUpdate
from schemas.event import EventRead

router = APIRouter(prefix="/users/me", tags=["profile"])

@router.get("/profile", response_model=UserProfile)
async def get_user_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    return await get_user_profile_service(current_user, db)


@router.patch("/account-settings", status_code=status.HTTP_204_NO_CONTENT)
async def update_account_settings(
    account_settings: AccountSettings,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    await update_account_settings_service(current_user, db, account_settings)
    return None


@router.put("/favorite-teams", status_code=status.HTTP_204_NO_CONTENT)
async def update_favorite_teams(
    payload: FavoriteTeamsUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    await update_favorite_teams_service(current_user, db, payload.team_ids)
    return None


@router.delete("/account", status_code=status.HTTP_204_NO_CONTENT)
async def delete_account(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    await delete_account_service(current_user, db)
    return None


@router.delete("/saved-events/{event_id}", response_model=List[EventRead])
async def delete_saved_event(
    event_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    return await delete_saved_event_service(current_user, db, event_id)


@router.post("/saved-events/{event_id}", response_model=List[EventRead])
async def add_saved_event(
    event_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    return await add_saved_event_service(current_user, db, event_id)

@router.get("/navbar-info", response_model=NavBarInfo)
async def get_navbar_info(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    return await get_navbar_info_service(current_user, db)