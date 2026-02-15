from typing import List
from models.game import Game
from models.venue import Venue
from models.team import Team
from models.event import Event
from schemas.search import SearchResult, SearchTypeEnum, TeamLogos
from sqlalchemy import or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

async def search_service(query: str, db: AsyncSession, limit: int = 7) -> List[SearchResult]:
    query_lower = query.lower().strip()
    results: List[SearchResult] = []

    team_results = await search_teams(query_lower, db, limit)
    results.extend(team_results)

    game_results = await search_games(query_lower, db, limit)
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

async def search_games(query: str, db: AsyncSession, limit: int) -> List[SearchResult]:
    stmt = (
        select(Game)
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
    games = result.scalars().all()

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
                "date": game.date_time.isoformat() if game.date_time else None,
                "location": game.venue.city if game.venue else None,
                "league": game.league.league_name if game.league else None,
            },
        )
        for game in games
    ]

async def search_events(query: str, db: AsyncSession, limit: int) -> List[SearchResult]:
    stmt = (
        select(Event)
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
            id=f"{city.city}-{city.state_region}",  # Composite ID
            type=SearchTypeEnum.CITY,
            title=f"{city.city}, {city.state_region}" if city.state_region else city.city,
            metadata={
                "country": city.country,
            },
        )
        for city in cities
    ]