from uuid import UUID
import uuid as _uuid

from fastapi import APIRouter, Body, Depends, HTTPException, Query, Response
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from repositories.event_repo import (
    create_event_service,
    get_featured_events_service,
    get_game_events_service,
    get_nearby_events_service,
    search_events_with_filters_service,
    _map_event_to_read,
)
from repositories.game_channel_repo import get_or_create_game_channel_event
from repositories.safety_alert_repo import get_game_safety_alerts_service
from db.session import get_session
from auth import get_optional_current_user, get_current_user, require_verified_creator
from models.event import Event
from models.game import Game
from models.user import User
from schemas.event import EventCreateRequest, EventRead, EventSearchFilters
from schemas.event import TeamLogos
from schemas.safety_alert import SafetyAlertFeedRead
from schemas.common import Location
from schemas.types import EventTypeEnum


router = APIRouter(prefix="/events", tags=["events"])


@router.post("/", response_model=EventRead, status_code=201)
async def create_event(
    event_data: EventCreateRequest,
    current_user: User = Depends(require_verified_creator),
    db: AsyncSession = Depends(get_session),
) -> EventRead:
    return await create_event_service(event_data, current_user.user_id, db)

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
    response: Response,
    lat: float = Query(..., ge=-90, le=90, description="User latitude"),
    lng: float = Query(..., ge=-180, le=180, description="User longitude"),
    radius: float = Query(50, ge=1, le=500, description="Search radius in miles"),
    limit: int = Query(20, ge=1, le=100, description="Maximum number of results"),
    db: AsyncSession = Depends(get_session),
):
    location = Location(lat=lat, lng=lng)
    result = await get_nearby_events_service(location, radius, db, limit)
    # Allow browsers and CDN to cache nearby-events for 60 seconds.
    response.headers["Cache-Control"] = "public, max-age=60, stale-while-revalidate=30"
    return result


@router.post("/search", response_model=List[EventRead])
async def search_events(
    filters: EventSearchFilters = Body(default_factory=EventSearchFilters),
    limit: int = Query(100, ge=1, le=200, description="Maximum number of search results"),
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: AsyncSession = Depends(get_session),
):
    return await search_events_with_filters_service(
        filters,
        db,
        current_user_id=current_user.user_id if current_user else None,
        limit=limit,
    )


@router.get("/game/{game_id}/events", response_model=List[EventRead])
async def get_game_events(
    game_id: int,
    limit: int = Query(50, ge=1, le=200, description="Maximum number of related events"),
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: AsyncSession = Depends(get_session),
):
    return await get_game_events_service(
        game_id,
        db,
        current_user_id=current_user.user_id if current_user else None,
        limit=limit,
    )


@router.get("/game/{game_id}/safety-alerts", response_model=List[SafetyAlertFeedRead])
async def get_game_safety_alerts(
    game_id: int,
    limit: int = Query(50, ge=1, le=200, description="Maximum number of safety alerts"),
    db: AsyncSession = Depends(get_session),
):
    return await get_game_safety_alerts_service(
        game_id,
        db,
        limit=limit,
    )


@router.get("/game-channel/{game_id}", response_model=EventRead)
async def get_or_create_game_channel(
    game_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> EventRead:
    """
    Returns the canonical Events-table record that represents a game's chat
    channel, creating it if it doesn't exist yet.  The returned event_id is
    safe to use as the event_id for event_chats FK.
    """
    event = await get_or_create_game_channel_event(game_id, current_user, db)
    return _map_event_to_read(event)


@router.get("/by-event-id/{event_id}", response_model=EventRead)
async def get_event_by_event_id(
    event_id: UUID,
    _current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
) -> EventRead:
    """Fetch a single event by its UUID.

    For synthetic game UUIDs (uuid5(NAMESPACE_DNS, f"game:{game_id}")), resolve and
    return game metadata without creating a GAME row in events.
    """
    opts = [
        joinedload(Event.venue),
        joinedload(Event.event_type),
        joinedload(Event.game).joinedload(Game.home_team),
        joinedload(Event.game).joinedload(Game.away_team),
        joinedload(Event.game).joinedload(Game.league),
    ]
    res = await db.execute(select(Event).where(Event.event_id == event_id).options(*opts))
    event = res.unique().scalar_one_or_none()

    if event is None:
        # Synthetic uuid5 event — look for an existing GAME event row with matching game_id.
        game_events_res = await db.execute(
            select(Event.game_id).where(
                Event.event_type_id == "GAME", Event.game_id.isnot(None)
            )
        )
        for (gid,) in game_events_res.all():
            if _uuid.uuid5(_uuid.NAMESPACE_DNS, f"game:{gid}") == event_id:
                event_res = await db.execute(
                    select(Event).where(Event.game_id == gid, Event.event_type_id == "GAME").options(*opts)
                )
                event = event_res.unique().scalar_one_or_none()
                break

    if event is None:
        games_res = await db.execute(select(Game.game_id))
        matched_game_id = None
        for (gid,) in games_res.all():
            if _uuid.uuid5(_uuid.NAMESPACE_DNS, f"game:{gid}") == event_id:
                matched_game_id = gid
                break

        if matched_game_id is not None:
            game_res = await db.execute(
                select(Game)
                .where(Game.game_id == matched_game_id)
                .options(
                    joinedload(Game.home_team),
                    joinedload(Game.away_team),
                    joinedload(Game.league),
                    joinedload(Game.venue),
                )
            )
            game = game_res.unique().scalar_one_or_none()
            if game is None:
                raise HTTPException(status_code=404, detail="Event not found")

            home_team_name = (
                game.home_team.display_name
                if game.home_team and game.home_team.display_name
                else (game.home_team.team_name if game.home_team and game.home_team.team_name else "Home")
            )
            away_team_name = (
                game.away_team.display_name
                if game.away_team and game.away_team.display_name
                else (game.away_team.team_name if game.away_team and game.away_team.team_name else "Away")
            )

            league_value = game.league.league_code if game.league and game.league.league_code else None
            location = None
            venue_name = ""
            if game.venue:
                venue_name = game.venue.name or ""
                if game.venue.latitude is not None and game.venue.longitude is not None:
                    location = Location(lat=game.venue.latitude, lng=game.venue.longitude)

            return EventRead(
                event_id=event_id,
                game_id=game.game_id,
                event_type=EventTypeEnum.GAME,
                event_name=f"{away_team_name} @ {home_team_name}",
                date_time=game.date_time,
                location=location,
                venue_name=venue_name,
                image_url=game.home_team.logo_url if game.home_team else None,
                team_logos=TeamLogos(
                    home=game.home_team.logo_url if game.home_team else None,
                    away=game.away_team.logo_url if game.away_team else None,
                ),
                league=league_value,
                is_user_created=False,
                is_saved=False,
            )

    if event is None:
        raise HTTPException(status_code=404, detail="Event not found")
    return _map_event_to_read(event)