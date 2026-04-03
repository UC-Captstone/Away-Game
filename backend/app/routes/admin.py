from fastapi import APIRouter, Depends, Query, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

from db.session import get_session


class AdminOverview(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    total_users: int
    active_users: int
    total_events: int
    events_today: int
    games_today: int
    verified_creators: int
    pending_approvals: int

from auth import require_admin, clerk_client
from models.user import User
from schemas.user import UserRead
from schemas.league import AdminLeagueRead
from repositories.admin_repo import (
    get_overview_stats_service,
    list_all_leagues_service,
    update_league_active_service,
    list_pending_verifications_service,
    approve_verification_service,
    deny_verification_service,
    list_verified_creators_service,
    revoke_creator_status_service,
    list_all_users_service,
    deactivate_user_service,
    delete_user_service,
)

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/overview", response_model=AdminOverview)
async def get_overview(
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    data = await get_overview_stats_service(db)
    return AdminOverview(**data)


@router.get("/leagues", response_model=List[AdminLeagueRead])
async def list_leagues(
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await list_all_leagues_service(db)


@router.post("/leagues/sync", status_code=204)
async def trigger_league_sync(
    _admin: User = Depends(require_admin),
):
    from scheduled.nightly_tasks import run_nightly_task
    import asyncio
    asyncio.create_task(run_nightly_task())
    return None


@router.patch("/leagues/{league_code}/active", response_model=AdminLeagueRead)
async def set_league_active(
    league_code: str,
    is_active: bool = Query(...),
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await update_league_active_service(league_code, is_active, db)


@router.get("/pending-approvals", response_model=List[UserRead])
async def list_pending_approvals(
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await list_pending_verifications_service(db)


@router.post("/pending-approvals/{user_id}/approve", response_model=UserRead)
async def approve_verification(
    user_id: UUID,
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await approve_verification_service(user_id, db)


@router.post("/pending-approvals/{user_id}/deny", response_model=UserRead)
async def deny_verification(
    user_id: UUID,
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await deny_verification_service(user_id, db)


@router.get("/verified-creators", response_model=List[UserRead])
async def list_verified_creators(
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await list_verified_creators_service(db)


@router.post("/verified-creators/{user_id}/revoke", response_model=UserRead)
async def revoke_creator(
    user_id: UUID,
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await revoke_creator_status_service(user_id, db)


@router.get("/users", response_model=List[UserRead])
async def list_users(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    return await list_all_users_service(db, limit=limit, offset=offset)


@router.post("/users/{user_id}/deactivate", status_code=204)
async def deactivate_user(
    user_id: UUID,
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    user = await deactivate_user_service(user_id, db)
    if user.clerk_id:
        clerk_client.users.delete(user_id=user.clerk_id)
    await delete_user_service(user_id, db)
    return None


@router.post("/users/{user_id}/reset-password", status_code=204)
async def reset_user_password(
    user_id: UUID,
    new_password: str = Body(..., embed=True),
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    result = await db.execute(select(User).where(User.user_id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        from fastapi import HTTPException, status as http_status
        raise HTTPException(status_code=http_status.HTTP_404_NOT_FOUND, detail="User not found")
    if not user.clerk_id:
        from fastapi import HTTPException, status as http_status
        raise HTTPException(status_code=http_status.HTTP_400_BAD_REQUEST, detail="User has no Clerk account")
    clerk_client.users.update(user_id=user.clerk_id, password=new_password)
    return None
