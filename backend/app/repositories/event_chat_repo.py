from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.event_chat import EventChat


class EventChatRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, message_id: UUID) -> Optional[EventChat]:
        res = await self.db.execute(select(EventChat).where(EventChat.message_id == message_id))
        return res.scalar_one_or_none()

    async def list_for_event(self, event_id: UUID, *, limit: int = 100, offset: int = 0) -> Sequence[EventChat]:
        res = await self.db.execute(
            select(EventChat)
            .where(EventChat.event_id == event_id)
            .order_by(EventChat.timestamp.desc())
            .limit(limit)
            .offset(offset)
        )
        return res.scalars().all()

    async def add(self, chat: EventChat) -> EventChat:
        self.db.add(chat)
        await self.db.flush()
        return chat

    async def remove(self, message_id: UUID) -> int:
        res = await self.db.execute(delete(EventChat).where(EventChat.message_id == message_id))
        return res.rowcount or 0
