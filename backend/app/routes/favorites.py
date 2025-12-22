from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from uuid import UUID

from app.db.session import get_session
from app.schemas.event import EventRead
from app.controllers.favorites import (
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
    db: AsyncSession = Depends(get_session)
):
    return await get_saved_events_service(user_id=user_id, limit=limit, offset=offset, db=db)


@router.delete("/events/{event_id}", response_model=List[EventRead])
async def delete_saved_event(
    user_id: UUID,
    event_id: UUID,
    db: AsyncSession = Depends(get_session)
):
    return await delete_saved_event_service(user_id=user_id, event_id=event_id, db=db)


@router.post("/events/{event_id}", response_model=EventRead, status_code=status.HTTP_201_CREATED)
async def add_saved_event(
    user_id: UUID,
    event_id: UUID,
    db: AsyncSession = Depends(get_session)
):
    return await add_saved_event_service(user_id=user_id, event_id=event_id, db=db)
