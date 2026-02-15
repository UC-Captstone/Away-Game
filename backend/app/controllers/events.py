from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func
from sqlalchemy.orm import selectinload
from typing import List
from datetime import datetime

from models.event import Event
from models.game import Game
from models.venue import Venue
from models.team import Team
from models.favorite import Favorite
from models.user import User
from schemas.common import Location
from schemas.types import EventTypeEnum
from schemas.event import EventRead, TeamLogos

async def get_featured_events_service(db: AsyncSession, limit: int = 5) -> List[EventRead]:
    stmt = (
        select(Event)
        .options(
            selectinload(Event.game).selectinload(Game.home_team),
            selectinload(Event.game).selectinload(Game.away_team),
            selectinload(Event.game).selectinload(Game.league),
            selectinload(Event.venue),
            selectinload(Event.event_type),
        )
        .outerjoin(Favorite, Favorite.event_id == Event.event_id)
        .group_by(Event.event_id)
        .order_by(func.count(Favorite.favorite_id).desc())
        .limit(limit)
    )
    result = await db.execute(stmt)
    events = result.scalars().all()

    return [_map_event_to_read(event) for event in events]


async def get_nearby_events_service(
    location: Location,
    radius_miles: float = 50,
    db: AsyncSession = None,
    limit: int = 20,
) -> List[EventRead]:
    # Convert miles to degrees (approximate: 1 degree = 69 miles)
    radius_degrees = radius_miles / 69.0

    stmt = (
        select(Event)
        .where(
            and_(
                Event.latitude.isnot(None),
                Event.longitude.isnot(None),
                Event.latitude >= location.lat - radius_degrees,
                Event.latitude <= location.lat + radius_degrees,
                Event.longitude >= location.lng - radius_degrees,
                Event.longitude <= location.lng + radius_degrees,
            )
        )
        .options(
            selectinload(Event.game).selectinload(Game.home_team),
            selectinload(Event.game).selectinload(Game.away_team),
            selectinload(Event.game).selectinload(Game.league),
            selectinload(Event.venue),
            selectinload(Event.event_type),
        )
        .limit(limit)
    )
    result = await db.execute(stmt)
    events = result.scalars().all()

    # Filter by actual distance using haversine formula
    filtered_events = [
        event
        for event in events
        if _haversine_distance(
            location.lat,
            location.lng,
            event.latitude,
            event.longitude,
        )
        <= radius_miles
    ]

    return [_map_event_to_read(event) for event in filtered_events]


def _map_event_to_read(event: Event) -> EventRead:
    # Get the raw event_type value from the database
    type_code = event.event_type if isinstance(event.event_type, str) else (
        event.event_type.code if hasattr(event.event_type, 'code') else str(event.event_type)
    )
    
    # Map to enum
    event_type_map = {
        'GAME': EventTypeEnum.GAME,
        'TAILGATE': EventTypeEnum.TAILGATE,
        'PREGAME': EventTypeEnum.PREGAME,
        'POSTGAME': EventTypeEnum.POSTGAME,
        'WATCH': EventTypeEnum.WATCH,
    }
    event_type_value = event_type_map.get(type_code, EventTypeEnum.GAME)  # Default to GAME if not found
    
    return EventRead(
        event_id=event.event_id,
        event_type=event_type_value,
        event_name=event.title,
        date_time=event.game_date,
        location=Location(lat=event.latitude, lng=event.longitude),
        venue_name=event.venue.name if event.venue else "",
        image_url=event.picture_url,
        team_logos=TeamLogos(
            home=event.game.home_team.logo_url if event.game and event.game.home_team else None,
            away=event.game.away_team.logo_url if event.game and event.game.away_team else None,
        ) if event.game else None,
        league=event.game.league.league_code if event.game and event.game.league else None,
        is_user_created=event.is_user_created if hasattr(event, "is_user_created") else True,
        is_saved=False,
    )


def _haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    from math import radians, cos, sin, asin, sqrt

    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * asin(sqrt(a))
    r = 3959  # Radius of earth in miles
    return c * r