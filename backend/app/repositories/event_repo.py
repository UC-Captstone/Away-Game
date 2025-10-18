# app/repositories/event_repo.py
from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.event import Event
from app.schemas.common import LocationPoint


class EventRepository:

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, event_id: UUID) -> Optional[Event]:
        res = await self.db.execute(
            select(Event).where(Event.event_id == event_id)
        )
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 50, offset: int = 0) -> Sequence[Event]:
        stmt = (
            select(Event)
            .order_by(Event.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add_from_create(
        self,
        *,
        creator_user_id: UUID,
        title: str,
        event_type_id: UUID,
        description: Optional[str] = None,
        game_date: Optional[datetime] = None,
        game_id: Optional[UUID] = None,
        location: Optional[LocationPoint] = None,
    ) -> Event:
        ev = Event(
            creator_user_id=creator_user_id,
            title=title,
            description=description,
            event_type_id=event_type_id,
            game_date=game_date,
            game_id=game_id,
        )
        if location is not None:
            ev.latitude = location.latitude
            ev.longitude = location.longitude

        self.db.add(ev)
        await self.db.flush()
        return ev


    async def update_fields(
        self,
        event_id: UUID,
        *,
        title: Optional[str] = None,
        description: Optional[str] = None,
        event_type_id: Optional[UUID] = None,
        game_date: Optional[datetime] = None,
        game_id: Optional[UUID] = None,
        location: Optional[LocationPoint] = None,
    ) -> Optional[Event]:
        values = {
            k: v
            for k, v in {
                "title": title,
                "description": description,
                "event_type_id": event_type_id,
                "game_date": game_date,
                "game_id": game_id,
            }.items()
            if v is not None
        }

        if location is not None:
            values["latitude"] = location.latitude
            values["longitude"] = location.longitude

        if not values:
            return await self.get(event_id)

        await self.db.execute(
            update(Event)
            .where(Event.event_id == event_id)
            .values(**values)
        )
        return await self.get(event_id)


    async def remove(self, event_id: UUID) -> int:
        res = await self.db.execute(
            delete(Event).where(Event.event_id == event_id)
        )
        return res.rowcount or 0
