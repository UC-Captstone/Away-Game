from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Depends, Query, Response

from auth import get_optional_current_user
from models.user import User
from repositories.places_repo import get_nearby_places_service
from schemas.place import PlaceCategory, PlaceRead

router = APIRouter(prefix="/places", tags=["places"])


@router.get("/nearby", response_model=List[PlaceRead])
async def get_nearby_places(
    response: Response,
    lat: float = Query(..., ge=-90, le=90, description="User latitude"),
    lng: float = Query(..., ge=-180, le=180, description="User longitude"),
    radius: int = Query(8000, ge=500, le=50000, description="Search radius in meters"),
    limit: int = Query(24, ge=4, le=80, description="Maximum number of results"),
    categories: str = Query(
        "restaurant,bar,hotel",
        description="Comma-separated categories: restaurant,bar,hotel,coffee",
    ),
    _current_user: Optional[User] = Depends(get_optional_current_user),
):
    places = await get_nearby_places_service(
        lat=lat,
        lng=lng,
        radius=radius,
        limit=limit,
        categories=categories,
    )

    response.headers["Cache-Control"] = "public, max-age=60, stale-while-revalidate=60"
    return places
