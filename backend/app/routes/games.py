from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional

from db.session import get_session
from schemas.game import GameRead
from repositories.game_repo import (
    get_games_by_team_service,
    get_game_service,
    list_games_service,
)

router = APIRouter(prefix="/games", tags=["games"])


@router.get("/team/{team_id}", response_model=List[GameRead])
async def get_games_by_team(
    team_id: int,
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session),
):
    return await get_games_by_team_service(team_id=team_id, limit=limit, offset=offset, db=db)


@router.get("/{game_id}", response_model=GameRead)
async def get_game(game_id: int, db: AsyncSession = Depends(get_session)):
    return await get_game_service(game_id=game_id, db=db)


@router.get("/", response_model=List[GameRead])
async def list_games(
    league_id: Optional[str] = Query(default=None, description="Filter by league code"),
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    db: AsyncSession = Depends(get_session),
):
    return await list_games_service(league_id=league_id, limit=limit, offset=offset, db=db)
