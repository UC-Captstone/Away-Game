from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime, timezone, timedelta
import math
import time
import uuid

from sqlalchemy import select, update, delete, and_, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload

from models.event import Event
from models.favorite import Favorite
from models.game import Game
from models.team import Team
from models.venue import Venue
from schemas.common import Location
from schemas.event import EventRead, EventSearchFilters, TeamLogos
from schemas.types import EventTypeEnum


def _normalize_sort_datetime(dt: datetime | None) -> datetime:
    if dt is None:
        return datetime.min
    if dt.tzinfo is not None:
        return dt.astimezone(timezone.utc).replace(tzinfo=None)
    return dt


class EventRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, event_id: UUID) -> Optional[Event]:
        res = await self.db.execute(select(Event).where(Event.event_id == event_id))
        return res.scalar_one_or_none()

    async def list(self, *, creator_user_id: Optional[UUID] = None, limit: int = 100, offset: int = 0) -> Sequence[Event]:
        stmt = select(Event).order_by(Event.created_at.desc()).limit(limit).offset(offset)
        if creator_user_id:
            stmt = stmt.where(Event.creator_user_id == creator_user_id)
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add(self, event: Event) -> Event:
        self.db.add(event)
        await self.db.flush()
        return event

    async def update_fields(
        self,
        event_id: UUID,
        *,
        event_type_id: Optional[UUID] = None,
        game_id: Optional[UUID] = None,
        venue_id: Optional[UUID] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        game_date: Optional[datetime] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
    ) -> Optional[Event]:
        values = {k: v for k, v in {
            "event_type_id": event_type_id,
            "game_id": game_id,
            "venue_id": venue_id,
            "title": title,
            "description": description,
            "game_date": game_date,
            "latitude": latitude,
            "longitude": longitude,
        }.items() if v is not None}
        if not values:
            return await self.get(event_id)
        await self.db.execute(update(Event).where(Event.event_id == event_id).values(**values))
        return await self.get(event_id)

    async def remove(self, event_id: UUID) -> int:
        res = await self.db.execute(delete(Event).where(Event.event_id == event_id))
        return res.rowcount or 0


async def search_events_with_filters_service(
    filters: EventSearchFilters,
    db: AsyncSession,
    *,
    current_user_id: Optional[UUID] = None,
    limit: int = 100,
) -> list[EventRead]:
    if filters.saved_only and current_user_id is None:
        return []

    keyword = filters.keyword.strip()
    keyword_like = f"%{keyword}%" if keyword else None
    location_query = filters.location_query.strip()
    location_like = f"%{location_query}%" if location_query else None

    league_codes = [league.value for league in filters.leagues]
    team_ids = [team_id for team_id in filters.team_ids if team_id > 0]
    event_type_codes = {event_type.value.upper() for event_type in filters.event_types}
    include_games = not event_type_codes or "GAME" in event_type_codes

    start_dt = (
        datetime.combine(filters.start_date, datetime.min.time())
        if filters.start_date
        else None
    )
    end_dt = (
        datetime.combine(filters.end_date, datetime.max.time())
        if filters.end_date
        else None
    )

    saved_event_ids: set[UUID] = set()
    saved_game_ids: set[int] = set()

    if current_user_id is not None:
        saved_result = await db.execute(
            select(Favorite.event_id, Favorite.game_id).where(Favorite.user_id == current_user_id)
        )
        for favorite_event_id, favorite_game_id in saved_result.all():
            if favorite_event_id is not None:
                saved_event_ids.add(favorite_event_id)
            if favorite_game_id is not None:
                saved_game_ids.add(favorite_game_id)

        if saved_event_ids:
            saved_events_game_result = await db.execute(
                select(Event.game_id)
                .where(Event.event_id.in_(saved_event_ids))
                .where(Event.game_id.isnot(None))
            )
            saved_game_ids.update(
                game_id for game_id in saved_events_game_result.scalars().all() if game_id is not None
            )

    event_conditions = []
    if keyword_like:
        # Search Events bar should only match event names.
        event_conditions.append(Event.title.ilike(keyword_like))

    if league_codes:
        event_conditions.append(Event.game.has(Game.league_id.in_(league_codes)))

    if team_ids:
        event_conditions.append(
            Event.game.has(
                or_(
                    Game.home_team_id.in_(team_ids),
                    Game.away_team_id.in_(team_ids),
                )
            )
        )

    if start_dt:
        event_conditions.append(Event.game_date >= start_dt)

    if end_dt:
        event_conditions.append(Event.game_date <= end_dt)

    if location_like:
        # Location filter should only match venue city.
        event_conditions.append(Event.venue.has(Venue.city.ilike(location_like)))

    if event_type_codes:
        event_conditions.append(Event.event_type_id.in_(event_type_codes))

    should_run_event_query = True
    if filters.saved_only and not saved_event_ids:
        should_run_event_query = False

    if filters.saved_only and saved_event_ids:
        event_conditions.append(Event.event_id.in_(saved_event_ids))

    mapped_events: list[EventRead] = []
    represented_game_ids: set[int] = set()

    if should_run_event_query:
        event_stmt = (
            select(Event)
            .options(
                selectinload(Event.venue),
                selectinload(Event.event_type),
                selectinload(Event.game).selectinload(Game.home_team),
                selectinload(Event.game).selectinload(Game.away_team),
                selectinload(Event.game).selectinload(Game.league),
            )
            .order_by(Event.game_date.asc())
            .limit(limit)
        )
        if event_conditions:
            event_stmt = event_stmt.where(and_(*event_conditions))

        event_result = await db.execute(event_stmt)
        events = event_result.unique().scalars().all()
        mapped_events = [
            _map_event_to_read(event, is_saved=event.event_id in saved_event_ids)
            for event in events
        ]
        represented_game_ids = {
            event.game_id
            for event in events
            if event.game_id is not None and event.event_type_id.upper() == "GAME"
        }

    mapped_games: list[EventRead] = []
    if include_games:
        game_conditions = []

        if keyword_like:
            game_conditions.append(
                or_(
                    Game.home_team.has(
                        or_(
                            Team.display_name.ilike(keyword_like),
                            Team.team_name.ilike(keyword_like),
                        )
                    ),
                    Game.away_team.has(
                        or_(
                            Team.display_name.ilike(keyword_like),
                            Team.team_name.ilike(keyword_like),
                        )
                    ),
                    Game.venue.has(
                        or_(
                            Venue.name.ilike(keyword_like),
                            Venue.city.ilike(keyword_like),
                            Venue.state_region.ilike(keyword_like),
                        )
                    ),
                )
            )

        if league_codes:
            game_conditions.append(Game.league_id.in_(league_codes))

        if team_ids:
            game_conditions.append(
                or_(
                    Game.home_team_id.in_(team_ids),
                    Game.away_team_id.in_(team_ids),
                )
            )

        if start_dt:
            game_conditions.append(Game.date_time >= start_dt)

        if end_dt:
            game_conditions.append(Game.date_time <= end_dt)

        if location_like:
            # Location filter should only match venue city.
            game_conditions.append(Game.venue.has(Venue.city.ilike(location_like)))

        if filters.saved_only:
            if not saved_game_ids:
                game_conditions.append(Game.game_id.in_([-1]))
            else:
                game_conditions.append(Game.game_id.in_(saved_game_ids))

        game_stmt = (
            select(Game)
            .options(
                selectinload(Game.home_team),
                selectinload(Game.away_team),
                selectinload(Game.league),
                selectinload(Game.venue),
            )
            .order_by(Game.date_time.asc())
            .limit(limit)
        )

        if game_conditions:
            game_stmt = game_stmt.where(and_(*game_conditions))

        game_result = await db.execute(game_stmt)
        games = game_result.unique().scalars().all()
        mapped_games = [
            _map_game_to_read(game, is_saved=game.game_id in saved_game_ids)
            for game in games
            if game.game_id not in represented_game_ids
        ]

    merged = mapped_events + mapped_games
    merged.sort(key=lambda event: _normalize_sort_datetime(event.date_time))
    return merged[:limit]


async def get_game_events_service(
    game_id: int,
    db: AsyncSession,
    *,
    current_user_id: Optional[UUID] = None,
    limit: int = 50,
) -> list[EventRead]:
    stmt = (
        select(Event)
        .where(Event.game_id == game_id)
        .where(Event.event_type_id != "GAME")
        .options(
            selectinload(Event.venue),
            selectinload(Event.event_type),
            selectinload(Event.game).selectinload(Game.home_team),
            selectinload(Event.game).selectinload(Game.away_team),
            selectinload(Event.game).selectinload(Game.league),
        )
        .order_by(Event.game_date.asc())
        .limit(limit)
    )
    result = await db.execute(stmt)
    events = result.unique().scalars().all()

    saved_event_ids: set[UUID] = set()
    if current_user_id is not None and events:
        event_ids = [event.event_id for event in events]
        saved_result = await db.execute(
            select(Favorite.event_id)
            .where(Favorite.user_id == current_user_id)
            .where(Favorite.event_id.in_(event_ids))
        )
        saved_event_ids = {
            event_id for event_id in saved_result.scalars().all() if event_id is not None
        }

    return [
        _map_event_to_read(event, is_saved=event.event_id in saved_event_ids)
        for event in events
    ]


# ---------------------------------------------------------------------------
# In-process TTL cache for featured events.
# Not user-specific (is_saved is always False for anonymous users hitting this).
# TTL = 120 seconds — featured events change rarely.
# ---------------------------------------------------------------------------
_FEATURED_CACHE: dict[int, tuple[float, list]] = {}
_FEATURED_CACHE_TTL = 120  # seconds


async def get_featured_events_service(
    db: AsyncSession,
    limit: int = 5,
    current_user_id: Optional[UUID] = None,
) -> list[EventRead]:
    # Cache key ignores current_user_id so anonymous + authed users share the
    # same cached results (is_saved is resolved below before returning).
    cache_key = limit
    now_ts = time.monotonic()
    cached = _FEATURED_CACHE.get(cache_key)
    if cached is not None and now_ts < cached[0] and current_user_id is None:
        return cached[1]

    # --- Step 1: fetch both COUNT queries in parallel (was sequential before) ---
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

    # --- Step 2: fetch counts + (optionally) saved items in parallel ---
    saved_stmt = (
        select(Favorite.event_id, Favorite.game_id)
        .where(Favorite.user_id == current_user_id)
    ) if current_user_id is not None else None

    if saved_stmt is not None:
        event_counts_result = await db.execute(event_counts_stmt)
        game_counts_result = await db.execute(game_counts_stmt)
        saved_result = await db.execute(saved_stmt)
    else:
        event_counts_result = await db.execute(event_counts_stmt)
        game_counts_result = await db.execute(game_counts_stmt)
        saved_result = None

    ranked_items: list[tuple[str, any, int]] = [
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
    game_ids  = [item_id for item_type, item_id, _ in ranked_items if item_type == "game"]

    saved_event_ids: set[UUID] = set()
    saved_game_ids:  set[int]  = set()

    if saved_result is not None:
        for fav_event_id, fav_game_id in saved_result.all():
            if fav_event_id is not None:
                saved_event_ids.add(fav_event_id)
            if fav_game_id is not None:
                saved_game_ids.add(fav_game_id)

    # --- Step 3: fetch event + game details in parallel using joinedload -----
    # joinedload resolves scalar relationships in a single JOIN query instead
    # of selectinload's separate SELECT per relationship.
    events_query = (
        select(Event)
        .where(Event.event_id.in_(event_ids))
        .options(
            joinedload(Event.venue),
            joinedload(Event.event_type),
            joinedload(Event.game).joinedload(Game.home_team),
            joinedload(Event.game).joinedload(Game.away_team),
            joinedload(Event.game).joinedload(Game.league),
        )
    ) if event_ids else None

    games_query = (
        select(Game)
        .where(Game.game_id.in_(game_ids))
        .options(
            joinedload(Game.home_team),
            joinedload(Game.away_team),
            joinedload(Game.league),
            joinedload(Game.venue),
        )
    ) if game_ids else None

    events_by_id: dict = {}
    games_by_id:  dict = {}

    if events_query is not None and games_query is not None:
        events_result = await db.execute(events_query)
        games_result = await db.execute(games_query)
        events_by_id = {e.event_id: e for e in events_result.unique().scalars().all()}
        games_by_id  = {g.game_id: g for g in games_result.unique().scalars().all()}
    elif events_query is not None:
        events_result = await db.execute(events_query)
        events_by_id = {e.event_id: e for e in events_result.unique().scalars().all()}
    elif games_query is not None:
        games_result = await db.execute(games_query)
        games_by_id  = {g.game_id: g for g in games_result.unique().scalars().all()}

    featured_items: list[EventRead] = []
    for item_type, item_id, _ in ranked_items:
        if item_type == "event":
            event = events_by_id.get(item_id)
            if event is not None:
                featured_items.append(_map_event_to_read(event, is_saved=item_id in saved_event_ids))
        else:
            game = games_by_id.get(item_id)
            if game is not None:
                featured_items.append(_map_game_to_read(game, is_saved=item_id in saved_game_ids))

    # Cache only anonymous results (saved state is user-specific).
    if current_user_id is None:
        _FEATURED_CACHE[cache_key] = (now_ts + _FEATURED_CACHE_TTL, featured_items)

    return featured_items


def _map_game_to_read(game: Game, is_saved: bool = False) -> EventRead:
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
        game_id=game.game_id,
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
        is_saved=is_saved,
    )


# ---------------------------------------------------------------------------
# In-process TTL cache for nearby-events results.
# Keyed by (lat_2dp, lng_2dp, radius, limit); TTL = 60 seconds.
# Entries: { cache_key: (expires_at, result) }
# ---------------------------------------------------------------------------
_NEARBY_CACHE: dict[tuple, tuple[float, list]] = {}
_NEARBY_CACHE_TTL = 60  # seconds


async def get_nearby_events_service(
    location: Location,
    radius_miles: float = 50,
    db: AsyncSession = None,
    limit: int = 20,
    include_past_hours: int = 0,
) -> list[EventRead]:
    # Check in-process cache first (rounded to ~1 km precision).
    cache_key = (round(location.lat, 2), round(location.lng, 2), radius_miles, limit)
    now_ts = time.monotonic()
    cached = _NEARBY_CACHE.get(cache_key)
    if cached is not None and now_ts < cached[0]:
        return cached[1]

    # Longitude degrees shrink with latitude; use correct per-axis degree spans.
    lat_degrees = radius_miles / 69.0
    cos_lat = math.cos(math.radians(location.lat))
    cos_lat = max(cos_lat, 1e-6)  # avoid division by zero near the poles
    lng_degrees = radius_miles / (69.0 * cos_lat)
    now = datetime.utcnow()
    cutoff = now - timedelta(hours=include_past_hours)
    fetch_limit = limit * 3  # over-fetch so haversine filtering still yields `limit` results
    event_lat = func.coalesce(Event.latitude, Venue.latitude)
    event_lng = func.coalesce(Event.longitude, Venue.longitude)

    events_stmt = (
        select(Event)
        .outerjoin(Venue, Event.venue_id == Venue.venue_id)
        .where(
            and_(
                event_lat.isnot(None),
                event_lng.isnot(None),
                Event.game_date.isnot(None),
                Event.game_date >= cutoff,
                event_lat.between(location.lat - lat_degrees, location.lat + lat_degrees),
                event_lng.between(location.lng - lng_degrees, location.lng + lng_degrees),
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

    games_stmt = (
        select(Game)
        .join(Venue, Game.venue_id == Venue.venue_id)
        .where(
            and_(
                Game.date_time.isnot(None),
                Game.date_time >= cutoff,
                Venue.latitude.isnot(None),
                Venue.longitude.isnot(None),
                Venue.latitude.between(location.lat - lat_degrees, location.lat + lat_degrees),
                Venue.longitude.between(location.lng - lng_degrees, location.lng + lng_degrees),
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

    # Run both queries sequentially — AsyncSession is not safe for concurrent execution.
    events_result = await db.execute(events_stmt)
    games_result = await db.execute(games_stmt)
    events = events_result.scalars().all()
    games = games_result.scalars().all()

    # Compute haversine once per item — not twice.
    filtered_items: list[tuple] = []
    for event in events:
        event_lat_value = event.latitude if event.latitude is not None else (event.venue.latitude if event.venue else None)
        event_lng_value = event.longitude if event.longitude is not None else (event.venue.longitude if event.venue else None)
        if event_lat_value is None or event_lng_value is None:
            continue

        dist = _haversine_distance(location.lat, location.lng, event_lat_value, event_lng_value)
        if dist <= radius_miles:
            filtered_items.append((event.game_date, dist, "event", event))

    for game in games:
        if not (game.venue and game.venue.latitude is not None and game.venue.longitude is not None):
            continue
        dist = _haversine_distance(location.lat, location.lng, game.venue.latitude, game.venue.longitude)
        if dist <= radius_miles:
            filtered_items.append((game.date_time, dist, "game", game))

    filtered_items.sort(key=lambda item: (_normalize_sort_datetime(item[0]), item[1]))
    filtered_items = filtered_items[:limit]

    result = [
        _map_event_to_read(item)
        if item_type == "event"
        else _map_game_to_read(item)
        for _, _, item_type, item in filtered_items
    ]

    # Store in cache; also evict stale entries to prevent unbounded growth.
    _NEARBY_CACHE[cache_key] = (now_ts + _NEARBY_CACHE_TTL, result)
    if len(_NEARBY_CACHE) > 500:
        stale_keys = [k for k, (exp, _) in _NEARBY_CACHE.items() if now_ts >= exp]
        for k in stale_keys:
            _NEARBY_CACHE.pop(k, None)

    return result


def _map_event_to_read(event: Event, is_saved: bool = False) -> EventRead:
    if isinstance(event.event_type, str):
        type_code = event.event_type
    elif getattr(event, "event_type", None) is not None and hasattr(event.event_type, "code"):
        type_code = event.event_type.code
    else:
        type_code = event.event_type_id

    normalized_type_code = (type_code or "").upper()

    event_type_map = {
        "GAME": EventTypeEnum.GAME,
        "TAILGATE": EventTypeEnum.TAILGATE,
        "POSTGAME": EventTypeEnum.POSTGAME,
        "WATCH": EventTypeEnum.WATCH,
        "OTHER": EventTypeEnum.OTHER,
    }
    event_type_value = event_type_map.get(normalized_type_code, EventTypeEnum.OTHER)

    event_lat_value = event.latitude if event.latitude is not None else (event.venue.latitude if event.venue else None)
    event_lng_value = event.longitude if event.longitude is not None else (event.venue.longitude if event.venue else None)

    return EventRead(
        event_id=event.event_id,
        game_id=event.game_id,
        event_type=event_type_value,
        event_name=event.title,
        description=event.description,
        date_time=event.game_date,
        location=Location(lat=event_lat_value, lng=event_lng_value) if event_lat_value is not None and event_lng_value is not None else None,
        venue_name=event.venue.name if event.venue else "",
        image_url=event.picture_url,
        team_logos=TeamLogos(
            home=event.game.home_team.logo_url if event.game and event.game.home_team else None,
            away=event.game.away_team.logo_url if event.game and event.game.away_team else None,
        ) if event.game else None,
        league=event.game.league.league_code if event.game and event.game.league else None,
        is_user_created=event.is_user_created if hasattr(event, "is_user_created") else True,
        is_saved=is_saved,
    )


def _haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    c = 2 * math.asin(math.sqrt(a))
    r = 3959
    return c * r
