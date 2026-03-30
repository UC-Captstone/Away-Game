from typing import List, Optional
import uuid
from uuid import UUID

from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from models.event import Event
from models.favorite import Favorite
from models.game import Game
from models.team import Team
from models.venue import Venue
from schemas.search import SearchResult, SearchTypeEnum, TeamLogos


async def search_service(
    query: str,
    db: AsyncSession,
    limit: int = 7,
    current_user_id: Optional[UUID] = None,
) -> List[SearchResult]:
    query_lower = query.lower().strip()
    results: List[SearchResult] = []

    team_results = await search_teams(query_lower, db, limit)
    results.extend(team_results)

    game_results = await search_games(query_lower, db, limit, current_user_id=current_user_id)
    results.extend(game_results)

    event_results = await search_events(query_lower, db, limit)
    results.extend(event_results)

    city_results = await search_cities(query_lower, db, limit)
    results.extend(city_results)

    return results[:limit]


async def search_teams(query: str, db: AsyncSession, limit: int) -> List[SearchResult]:
    stmt = (
        select(Team)
        .where(
            or_(
                Team.team_name.ilike(f"%{query}%"),
                Team.display_name.ilike(f"%{query}%"),
                Team.home_location.ilike(f"%{query}%"),
            )
        )
        .options(selectinload(Team.league))
        .limit(limit)
    )
    result = await db.execute(stmt)
    teams = result.scalars().all()

    return [
        SearchResult(
            id=str(team.team_id),
            type=SearchTypeEnum.TEAM,
            title=team.display_name,
            image_url=team.logo_url,
            metadata={
                "league": team.league.league_name if team.league else None,
                "location": team.home_location,
            },
        )
        for team in teams
    ]


async def search_games(
    query: str,
    db: AsyncSession,
    limit: int,
    current_user_id: Optional[UUID] = None,
) -> List[SearchResult]:
    event_id_subquery = (
        select(Event.event_id)
        .where(Event.game_id == Game.game_id)
        .order_by(Event.created_at.desc())
        .limit(1)
        .scalar_subquery()
    )

    stmt = (
        select(Game, event_id_subquery.label("event_id"))
        .join(Team, Team.team_id == Game.home_team_id, isouter=True)
        .join(Venue, Venue.venue_id == Game.venue_id, isouter=True)
        .where(
            or_(
                Team.team_name.ilike(f"%{query}%"),
                Team.display_name.ilike(f"%{query}%"),
                Venue.name.ilike(f"%{query}%"),
            )
        )
        .options(
            selectinload(Game.home_team),
            selectinload(Game.away_team),
            selectinload(Game.venue),
            selectinload(Game.league),
        )
        .limit(limit)
    )
    result = await db.execute(stmt)
    game_rows = result.all()
    saved_game_ids: set[int] = set()

    if current_user_id and game_rows:
        game_ids = [game.game_id for game, _ in game_rows]

        saved_games_result = await db.execute(
            select(Favorite.game_id)
            .where(Favorite.user_id == current_user_id)
            .where(Favorite.game_id.in_(game_ids))
        )
        saved_game_ids.update([gid for gid in saved_games_result.scalars().all() if gid is not None])

        saved_games_via_event_result = await db.execute(
            select(Event.game_id)
            .join(Favorite, Favorite.event_id == Event.event_id)
            .where(Favorite.user_id == current_user_id)
            .where(Event.game_id.in_(game_ids))
        )
        saved_game_ids.update([
            gid for gid in saved_games_via_event_result.scalars().all() if gid is not None
        ])

    return [
        SearchResult(
            id=str(game.game_id),
            type=SearchTypeEnum.GAME,
            title=f"{game.away_team.display_name if game.away_team else 'TBD'} @ {game.home_team.display_name if game.home_team else 'TBD'}",
            team_logos=TeamLogos(
                home=game.home_team.logo_url if game.home_team else None,
                away=game.away_team.logo_url if game.away_team else None,
            ),
            metadata={
                "eventId": str(event_id) if event_id else str(uuid.uuid5(uuid.NAMESPACE_DNS, f"game:{game.game_id}")),
                "date": game.date_time.isoformat() if game.date_time else None,
                "location": game.venue.city if game.venue else None,
                "lat": game.venue.latitude if game.venue else None,
                "lng": game.venue.longitude if game.venue else None,
                "league": game.league.league_name if game.league else None,
                "saved": game.game_id in saved_game_ids,
            },
        )
        for game, event_id in game_rows
    ]


async def search_events(query: str, db: AsyncSession, limit: int) -> List[SearchResult]:
    stmt = (
        select(Event)
        .where(Event.event_type_id != "GAME")
        .where(
            or_(
                Event.title.ilike(f"%{query}%"),
                Event.description.ilike(f"%{query}%"),
            )
        )
        .options(
            selectinload(Event.venue),
            selectinload(Event.game).selectinload(Game.home_team),
            selectinload(Event.game).selectinload(Game.away_team),
        )
        .limit(limit)
    )
    result = await db.execute(stmt)
    events = result.scalars().all()

    return [
        SearchResult(
            id=str(event.event_id),
            type=SearchTypeEnum.EVENT,
            title=event.title,
            image_url=event.picture_url,
            metadata={
                "description": event.description,
                "date": event.game_date.isoformat() if event.game_date else None,
                "location": f"{event.venue.city}, {event.venue.state_region}" if event.venue else None,
            },
        )
        for event in events
    ]


async def search_cities(query: str, db: AsyncSession, limit: int) -> List[SearchResult]:
    stmt = (
        select(Venue.city, Venue.state_region, Venue.country)
        .where(
            or_(
                Venue.city.ilike(f"%{query}%"),
                Venue.state_region.ilike(f"%{query}%"),
            )
        )
        .distinct()
        .limit(limit)
    )
    result = await db.execute(stmt)
    cities = result.all()

    return [
        SearchResult(
            id=f"{city.city}-{city.state_region}",
            type=SearchTypeEnum.CITY,
            title=f"{city.city}, {city.state_region}" if city.state_region else city.city,
            metadata={
                "country": city.country,
            },
        )
        for city in cities
    ]
