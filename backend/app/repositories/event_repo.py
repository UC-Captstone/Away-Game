from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.event import Event


class EventRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, event_id: UUID) -> Optional[Event]:
        res = await self.db.execute(select(Event).where(Event.event_id == event_id))
        return res.scalar_one_or_none()

    async def list(self, *, creator_user_id: Optional[UUID] = None, limit: int = 100, offset: int = 0) -> Sequence[Event]:
        stmt = select(Event).order_by(Event.created_at.desc()).limit(limit).offset(offset)
        if creator_user_id:
            stmt = stmt.where(Event.creator_user_id == creator_user_id)
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add(self, event: Event) -> Event:
        self.db.add(event)
        await self.db.flush()
        return event

    async def update_fields(
        self,
        event_id: UUID,
        *,
        event_type_id: Optional[UUID] = None,
        game_id: Optional[UUID] = None,
        venue_id: Optional[UUID] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        game_date: Optional[datetime] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
    ) -> Optional[Event]:
        values = {k: v for k, v in {
            "event_type_id": event_type_id,
            "game_id": game_id,
            "venue_id": venue_id,
            "title": title,
            "description": description,
            "game_date": game_date,
            "latitude": latitude,
            "longitude": longitude,
        }.items() if v is not None}
        if not values:
            return await self.get(event_id)
        await self.db.execute(update(Event).where(Event.event_id == event_id).values(**values))
        return await self.get(event_id)

    async def remove(self, event_id: UUID) -> int:
        res = await self.db.execute(delete(Event).where(Event.event_id == event_id))
        return res.rowcount or 0
