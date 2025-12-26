from typing import List, Optional
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload

from models.game import Game
from models.team import Team


async def get_games_by_team_service(team_id: int, limit: int, offset: int, db: AsyncSession) -> List[Game]:
    stmt = (
        select(Game)
        .where(or_(Game.home_team_id == team_id, Game.away_team_id == team_id))
        .options(
            selectinload(Game.league),
            selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Game.venue)
        )
        .order_by(Game.date_time.desc())
        .limit(limit)
        .offset(offset)
    )

    result = await db.execute(stmt)
    games = result.scalars().all()

    if not games and offset == 0:
        team_check = await db.execute(select(Team).where(Team.team_id == team_id))
        if not team_check.scalar_one_or_none():
            raise HTTPException(status_code=404, detail=f"Team with id {team_id} not found")

    return games


async def get_game_service(game_id: int, db: AsyncSession) -> Optional[Game]:
    stmt = (
        select(Game)
        .where(Game.game_id == game_id)
        .options(
            selectinload(Game.league),
            selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Game.venue)
        )
    )

    result = await db.execute(stmt)
    game = result.scalar_one_or_none()

    if not game:
        raise HTTPException(status_code=404, detail=f"Game with id {game_id} not found")

    return game


async def list_games_service(league_id: Optional[str], limit: int, offset: int, db: AsyncSession):
    stmt = (
        select(Game)
        .options(
            selectinload(Game.league),
            selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Game.venue)
        )
        .order_by(Game.date_time.desc())
        .limit(limit)
        .offset(offset)
    )

    if league_id:
        stmt = stmt.where(Game.league_id == league_id)

    result = await db.execute(stmt)
    games = result.scalars().all()

    return games
