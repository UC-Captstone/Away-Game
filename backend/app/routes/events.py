from fastapi import APIRouter, Depends, Query, Response, HTTPException
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from typing import List, Optional

from repositories.event_repo import get_featured_events_service, get_nearby_events_service, _map_event_to_read, _map_game_to_read
from db.session import get_session
from auth import get_optional_current_user, get_current_user
from models.event import Event
from models.game import Game
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
    # Try to find an existing Game-type event for this game_id.
    find_stmt = (
        select(Event)
        .where(Event.game_id == game_id, Event.event_type_id == "GAME")
        .options(
            joinedload(Event.venue),
            joinedload(Event.event_type),
            joinedload(Event.game).joinedload(Game.home_team),
            joinedload(Event.game).joinedload(Game.away_team),
            joinedload(Event.game).joinedload(Game.league),
        )
        .limit(1)
    )
    result = await db.execute(find_stmt)
    event = result.unique().scalar_one_or_none()
    if event is not None:
        return _map_event_to_read(event)

    # Event doesn't exist yet — fetch the game to build a stub.
    game_result = await db.execute(
        select(Game)
        .where(Game.game_id == game_id)
        .options(
            joinedload(Game.home_team),
            joinedload(Game.away_team),
            joinedload(Game.league),
            joinedload(Game.venue),
        )
    )
    game = game_result.unique().scalar_one_or_none()
    if game is None:
        raise HTTPException(status_code=404, detail=f"Game {game_id} not found")

    home_name = (
        (game.home_team.display_name or game.home_team.team_name)
        if game.home_team else "Home"
    )
    away_name = (
        (game.away_team.display_name or game.away_team.team_name)
        if game.away_team else "Away"
    )

    # Ensure the GAME event-type row exists (idempotent upsert).
    await db.execute(
        text(
            "INSERT INTO event_types (code, type_name) "
            "VALUES ('GAME', 'Game Channel') "
            "ON CONFLICT (code) DO NOTHING"
        )
    )
    new_event = Event(
        creator_user_id=current_user.user_id,
        event_type_id="GAME",
        game_id=game_id,
        venue_id=game.venue_id,
        title=f"{away_name} @ {home_name}",
        game_date=game.date_time.replace(tzinfo=None) if game.date_time else None,
        latitude=game.venue.latitude if game.venue else None,
        longitude=game.venue.longitude if game.venue else None,
    )
    db.add(new_event)
    try:
        await db.flush()
        await db.commit()
    except Exception:
        await db.rollback()
        # Race condition: another request created it — just re-fetch.
        result = await db.execute(find_stmt)
        event = result.unique().scalar_one_or_none()
        if event is not None:
            return _map_event_to_read(event)
        raise

    # Re-fetch with all relationships loaded for correct serialisation.
    result = await db.execute(find_stmt)
    created = result.unique().scalar_one()
    return _map_event_to_read(created)