from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from db.session import get_session
from schemas.event import EventRead
from auth import get_current_user, check_owner_or_admin
from models.user import User
from repositories.favorite_repo import (
    get_saved_events_service,
    delete_saved_event_service,
    add_saved_event_service,
)

router = APIRouter(prefix="/users/{user_id}/favorites", tags=["favorites"])


@router.get("/events", response_model=List[EventRead])
async def get_saved_events(
    user_id: UUID,
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    check_owner_or_admin(user_id, current_user)
    return await get_saved_events_service(user_id=user_id, limit=limit, offset=offset, db=db)


@router.delete("/events/{event_id}", response_model=List[EventRead])
async def delete_saved_event(
    user_id: UUID,
    event_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    check_owner_or_admin(user_id, current_user)
    return await delete_saved_event_service(user_id=user_id, event_id=event_id, db=db)


@router.post("/events/{event_id}", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def add_saved_event(
    user_id: UUID,
    event_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    check_owner_or_admin(user_id, current_user)
    return await add_saved_event_service(user_id=user_id, event_id=event_id, db=db)
