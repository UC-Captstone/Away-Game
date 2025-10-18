from __future__ import annotations
from typing import Sequence
from uuid import UUID
from datetime import datetime

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.chat import TeamChat


class TeamChatRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def list_by_team(
        self,
        *,
        espn_sport_id: int,
        espn_league_id: int,
        espn_team_id: int,
        limit: int = 100,
        after: datetime | None = None,
    ) -> Sequence[TeamChat]:
        stmt = (
            select(TeamChat)
            .where(
                (TeamChat.espn_sport_id == espn_sport_id)
                & (TeamChat.espn_league_id == espn_league_id)
                & (TeamChat.espn_team_id == espn_team_id)
            )
            .order_by(TeamChat.timestamp.desc())
            .limit(limit)
        )
        if after is not None:
            stmt = stmt.where(TeamChat.timestamp > after)
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add_message(
        self,
        *,
        user_id: UUID,
        espn_sport_id: int,
        espn_league_id: int,
        espn_team_id: int,
        message_text: str,
    ) -> TeamChat:
        msg = TeamChat(
            user_id=user_id,
            espn_sport_id=espn_sport_id,
            espn_league_id=espn_league_id,
            espn_team_id=espn_team_id,
            message_text=message_text,
        )
        self.db.add(msg)
        await self.db.flush()
        return msg

    async def purge_older_than(self, *, cutoff: datetime) -> int:
        res = await self.db.execute(
            delete(TeamChat).where(TeamChat.timestamp < cutoff)
        )
        return res.rowcount or 0
