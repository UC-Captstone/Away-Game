from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, func
from sqlalchemy.orm import selectinload
from typing import List
from datetime import datetime
import uuid

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
    event_counts_stmt = (
        select(Favorite.event_id, func.count(Favorite.favorite_id).label("favorite_count"))
        .where(Favorite.event_id.isnot(None))
        .group_by(Favorite.event_id)
    )
    game_counts_stmt = (
        select(Favorite.game_id, func.count(Favorite.favorite_id).label("favorite_count"))
        .where(Favorite.game_id.isnot(None))
        .group_by(Favorite.game_id)
    )

    event_counts_result = await db.execute(event_counts_stmt)
    game_counts_result = await db.execute(game_counts_stmt)

    ranked_items = [
        ("event", event_id, int(favorite_count))
        for event_id, favorite_count in event_counts_result.all()
        if event_id is not None
    ] + [
        ("game", game_id, int(favorite_count))
        for game_id, favorite_count in game_counts_result.all()
        if game_id is not None
    ]

    ranked_items.sort(key=lambda item: item[2], reverse=True)
    ranked_items = ranked_items[:limit]

    event_ids = [item_id for item_type, item_id, _ in ranked_items if item_type == "event"]
    game_ids = [item_id for item_type, item_id, _ in ranked_items if item_type == "game"]

    events_by_id = {}
    games_by_id = {}

    if event_ids:
        events_stmt = (
            select(Event)
            .where(Event.event_id.in_(event_ids))
            .options(
                selectinload(Event.game).selectinload(Game.home_team),
                selectinload(Event.game).selectinload(Game.away_team),
                selectinload(Event.game).selectinload(Game.league),
                selectinload(Event.venue),
                selectinload(Event.event_type),
            )
        )
        events_result = await db.execute(events_stmt)
        events = events_result.scalars().all()
        events_by_id = {event.event_id: event for event in events}

    if game_ids:
        games_stmt = (
            select(Game)
            .where(Game.game_id.in_(game_ids))
            .options(
                selectinload(Game.home_team),
                selectinload(Game.away_team),
                selectinload(Game.league),
                selectinload(Game.venue),
            )
        )
        games_result = await db.execute(games_stmt)
        games = games_result.scalars().all()
        games_by_id = {game.game_id: game for game in games}

    featured_items: List[EventRead] = []
    for item_type, item_id, _ in ranked_items:
        if item_type == "event":
            event = events_by_id.get(item_id)
            if event is not None:
                featured_items.append(_map_event_to_read(event))
        else:
            game = games_by_id.get(item_id)
            if game is not None:
                featured_items.append(_map_game_to_read(game))

    return featured_items


def _map_game_to_read(game: Game) -> EventRead:
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
    venue_lat = game.venue.latitude if game.venue and game.venue.latitude is not None else 0.0
    venue_lng = game.venue.longitude if game.venue and game.venue.longitude is not None else 0.0

    return EventRead(
        event_id=uuid.uuid5(uuid.NAMESPACE_DNS, f"game:{game.game_id}"),
        event_type=EventTypeEnum.GAME,
        event_name=f"{away_team_name} @ {home_team_name}",
        date_time=game.date_time,
        location=Location(lat=venue_lat, lng=venue_lng),
        venue_name=game.venue.name if game.venue else "",
        image_url=game.home_team.logo_url if game.home_team else None,
        team_logos=TeamLogos(
            home=game.home_team.logo_url if game.home_team else None,
            away=game.away_team.logo_url if game.away_team else None,
        ),
        league=game.league.league_code if game.league else None,
        is_user_created=False,
        is_saved=False,
    )


async def get_nearby_events_service(
    location: Location,
    radius_miles: float = 50,
    db: AsyncSession = None,
    limit: int = 20,
) -> List[EventRead]:
    # Convert miles to degrees (approximate: 1 degree = 69 miles)
    radius_degrees = radius_miles / 69.0
    now = datetime.utcnow()
    fetch_limit = max(limit * 3, limit)

    events_stmt = (
        select(Event)
        .where(
            and_(
                Event.latitude.isnot(None),
                Event.longitude.isnot(None),
                Event.game_date.isnot(None),
                Event.game_date >= now,
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
        .order_by(Event.game_date.asc())
        .limit(fetch_limit)
    )
    events_result = await db.execute(events_stmt)
    events = events_result.scalars().all()

    games_stmt = (
        select(Game)
        .join(Venue, Game.venue_id == Venue.venue_id)
        .where(
            and_(
                Game.date_time.isnot(None),
                Game.date_time >= now,
                Venue.latitude.isnot(None),
                Venue.longitude.isnot(None),
                Venue.latitude >= location.lat - radius_degrees,
                Venue.latitude <= location.lat + radius_degrees,
                Venue.longitude >= location.lng - radius_degrees,
                Venue.longitude <= location.lng + radius_degrees,
            )
        )
        .options(
            selectinload(Game.home_team),
            selectinload(Game.away_team),
            selectinload(Game.league),
            selectinload(Game.venue),
        )
        .order_by(Game.date_time.asc())
        .limit(fetch_limit)
    )
    games_result = await db.execute(games_stmt)
    games = games_result.scalars().all()

    # Filter by actual distance using haversine formula
    filtered_items = [
        (
            event.game_date,
            _haversine_distance(
                location.lat,
                location.lng,
                event.latitude,
                event.longitude,
            ),
            "event",
            event,
        )
        for event in events
        if _haversine_distance(
            location.lat,
            location.lng,
            event.latitude,
            event.longitude,
        )
        <= radius_miles
    ] + [
        (
            game.date_time,
            _haversine_distance(
                location.lat,
                location.lng,
                game.venue.latitude,
                game.venue.longitude,
            ),
            "game",
            game,
        )
        for game in games
        if game.venue
        and game.venue.latitude is not None
        and game.venue.longitude is not None
        and _haversine_distance(
            location.lat,
            location.lng,
            game.venue.latitude,
            game.venue.longitude,
        )
        <= radius_miles
    ]

    filtered_items.sort(key=lambda item: (item[0], item[1]))
    filtered_items = filtered_items[:limit]

    return [
        _map_event_to_read(item)
        if item_type == "event"
        else _map_game_to_read(item)
        for _, _, item_type, item in filtered_items
    ]


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