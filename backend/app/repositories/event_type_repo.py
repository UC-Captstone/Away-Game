from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.event_type import EventType


class EventTypeRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, event_type_id: UUID) -> Optional[EventType]:
        res = await self.db.execute(select(EventType).where(EventType.event_type_id == event_type_id))
        return res.scalar_one_or_none()

    async def get_by_name(self, type_name: str) -> Optional[EventType]:
        res = await self.db.execute(select(EventType).where(EventType.type_name == type_name))
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[EventType]:
        res = await self.db.execute(
            select(EventType).order_by(EventType.type_name.asc()).limit(limit).offset(offset)
        )
        return res.scalars().all()

    async def add(self, event_type: EventType) -> EventType:
        self.db.add(event_type)
        await self.db.flush()
        return event_type

    async def update_fields(
        self,
        event_type_id: UUID,
        *,
        type_name: Optional[str] = None,
        code: Optional[str] = None,
    ) -> Optional[EventType]:
        values = {k: v for k, v in {
            "type_name": type_name,
            "code": code,
        }.items() if v is not None}
        if not values:
            return await self.get(event_type_id)
        await self.db.execute(update(EventType).where(EventType.event_type_id == event_type_id).values(**values))
        return await self.get(event_type_id)

    async def remove(self, event_type_id: UUID) -> int:
        res = await self.db.execute(delete(EventType).where(EventType.event_type_id == event_type_id))
        return res.rowcount or 0
