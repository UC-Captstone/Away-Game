from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from ..models.team_chat import TeamChat


class TeamChatRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, message_id: UUID) -> Optional[TeamChat]:
        res = await self.db.execute(select(TeamChat).where(TeamChat.message_id == message_id))
        return res.scalar_one_or_none()

    async def list_for_team(self, team_id: UUID, *, limit: int = 100, offset: int = 0) -> Sequence[TeamChat]:
        res = await self.db.execute(
            select(TeamChat)
            .where(TeamChat.team_id == team_id)
            .order_by(TeamChat.timestamp.desc())
            .limit(limit)
            .offset(offset)
        )
        return res.scalars().all()

    async def add(self, chat: TeamChat) -> TeamChat:
        self.db.add(chat)
        await self.db.flush()
        return chat

    async def remove(self, message_id: UUID) -> int:
        res = await self.db.execute(delete(TeamChat).where(TeamChat.message_id == message_id))
        return res.rowcount or 0
