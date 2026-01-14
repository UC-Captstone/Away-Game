from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from ..models.alert import SafetyAlert
from schemas.common import LocationPoint


class AlertRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, alert_id: UUID) -> Optional[SafetyAlert]:
        res = await self.db.execute(
            select(SafetyAlert).where(SafetyAlert.alert_id == alert_id)
        )
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 50, offset: int = 0) -> Sequence[SafetyAlert]:
        stmt = (
            select(SafetyAlert)
            .order_by(SafetyAlert.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add_from_create(
        self,
        *,
        reporter_user_id: UUID,
        alert_type_id: UUID,
        description: Optional[str] = None,
        game_id: Optional[UUID] = None,
        game_date: Optional[datetime] = None,
        location: Optional[LocationPoint] = None,
    ) -> SafetyAlert:
        alert = SafetyAlert(
            reporter_user_id=reporter_user_id,
            alert_type_id=alert_type_id,
            description=description,
            game_id=game_id,
            game_date=game_date,
        )
        if location is not None:
            alert.latitude = location.latitude
            alert.longitude = location.longitude

        self.db.add(alert)
        await self.db.flush()
        return alert

    async def update_fields(
        self,
        alert_id: UUID,
        *,
        alert_type_id: Optional[UUID] = None,
        description: Optional[str] = None,
        game_id: Optional[UUID] = None,
        game_date: Optional[datetime] = None,
        location: Optional[LocationPoint] = None,
    ) -> Optional[SafetyAlert]:
        values = {
            k: v
            for k, v in {
                "alert_type_id": alert_type_id,
                "description": description,
                "game_id": game_id,
                "game_date": game_date,
            }.items()
            if v is not None
        }

        if location is not None:
            values["latitude"] = location.latitude
            values["longitude"] = location.longitude

        if not values:
            return await self.get(alert_id)

        await self.db.execute(
            update(SafetyAlert)
            .where(SafetyAlert.alert_id == alert_id)
            .values(**values)
        )
        return await self.get(alert_id)

    async def remove(self, alert_id: UUID) -> int:
        res = await self.db.execute(
            delete(SafetyAlert).where(SafetyAlert.alert_id == alert_id)
        )
        return res.rowcount or 0
