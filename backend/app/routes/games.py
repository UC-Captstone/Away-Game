from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload
from typing import List, Optional

from app.db.session import get_session
from app.models.game import Game
from app.models.team import Team
from app.schemas.game import GameRead

router = APIRouter(prefix="/games", tags=["games"])


@router.get("/team/{team_id}", response_model=List[GameRead])
async def get_games_by_team(
    team_id: int,
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session)
):
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


@router.get("/{game_id}", response_model=GameRead)
async def get_game(
    game_id: int,
    db: AsyncSession = Depends(get_session)
):
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


@router.get("/", response_model=List[GameRead])
async def list_games(
    league_id: Optional[str] = Query(default=None, description="Filter by league code"),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session)
):
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
