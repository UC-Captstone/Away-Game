from __future__ import annotations
from typing import Optional, Sequence, List
from datetime import datetime
from sqlalchemy import select, update, delete, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from fastapi import HTTPException

from models.game import Game
from models.team import Team


class GameRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, game_id: int) -> Optional[Game]:
        res = await self.db.execute(select(Game).where(Game.game_id == game_id))
        return res.scalar_one_or_none()

    async def get_by_identity(
        self,
        *,
        league_id: str,
        home_team_id: int,
        away_team_id: int,
        date_time: datetime,
    ) -> Optional[Game]:
        res = await self.db.execute(
            select(Game).where(
                (Game.league_id == league_id)
                & (Game.home_team_id == home_team_id)
                & (Game.away_team_id == away_team_id)
                & (Game.date_time == date_time)
            )
        )
        return res.scalar_one_or_none()

    async def list(self, *, league_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> Sequence[Game]:
        stmt = select(Game).order_by(Game.date_time.desc()).limit(limit).offset(offset)
        if league_id is not None:
            stmt = stmt.where(Game.league_id == league_id)
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add(self, game: Game) -> Game:
        self.db.add(game)
        await self.db.flush()
        return game

    async def update_fields(
        self,
        game_id: int,
        *,
        league_id: Optional[str] = None,
        home_team_id: Optional[int] = None,
        away_team_id: Optional[int] = None,
        venue_id: Optional[int] = None,
        date_time: Optional[datetime] = None,
    ) -> Optional[Game]:
        values = {k: v for k, v in {
            "league_id": league_id,
            "home_team_id": home_team_id,
            "away_team_id": away_team_id,
            "venue_id": venue_id,
            "date_time": date_time,
        }.items() if v is not None}
        if not values:
            return await self.get(game_id)
        await self.db.execute(update(Game).where(Game.game_id == game_id).values(**values))
        return await self.get(game_id)

    async def remove(self, game_id: int) -> int:
        res = await self.db.execute(delete(Game).where(Game.game_id == game_id))
        return res.rowcount or 0


async def get_games_by_team_service(team_id: int, limit: int, offset: int, db: AsyncSession) -> List[Game]:
    stmt = (
        select(Game)
        .where(or_(Game.home_team_id == team_id, Game.away_team_id == team_id))
        .options(
            selectinload(Game.league),
            selectinload(Game.home_team).selectinload(Team.league),
            selectinload(Game.away_team).selectinload(Team.league),
            selectinload(Game.venue),
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
            selectinload(Game.venue),
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
            selectinload(Game.venue),
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
