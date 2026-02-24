from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from repositories.event_repo import get_featured_events_service, get_nearby_events_service
from db.session import get_session
from auth import get_optional_current_user
from models.user import User
from schemas.event import EventRead
from schemas.common import Location


router = APIRouter(prefix="/events", tags=["events"])

@router.get("/featured", response_model=List[EventRead])
async def get_featured_events(
    limit: int = Query(5, ge=1, le=20, description="Maximum number of featured events"),
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: AsyncSession = Depends(get_session),
):
    return await get_featured_events_service(
        db,
        limit,
        current_user_id=current_user.user_id if current_user else None,
    )


@router.get("/nearby", response_model=List[EventRead])
async def get_nearby_events(
    lat: float = Query(..., ge=-90, le=90, description="User latitude"),
    lng: float = Query(..., ge=-180, le=180, description="User longitude"),
    radius: float = Query(50, ge=1, le=500, description="Search radius in miles"),
    limit: int = Query(20, ge=1, le=100, description="Maximum number of results"),
    db: AsyncSession = Depends(get_session),
):
    location = Location(lat=lat, lng=lng)
    return await get_nearby_events_service(location, radius, db, limit)