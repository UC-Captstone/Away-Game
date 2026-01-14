from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from ..models.safety_alert import SafetyAlert


class SafetyAlertRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, alert_id: UUID) -> Optional[SafetyAlert]:
        res = await self.db.execute(select(SafetyAlert).where(SafetyAlert.alert_id == alert_id))
        return res.scalar_one_or_none()

    async def list(self, *, reporter_user_id: Optional[UUID] = None, limit: int = 100, offset: int = 0) -> Sequence[SafetyAlert]:
        stmt = select(SafetyAlert).order_by(SafetyAlert.created_at.desc()).limit(limit).offset(offset)
        if reporter_user_id:
            stmt = stmt.where(SafetyAlert.reporter_user_id == reporter_user_id)
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def add(self, alert: SafetyAlert) -> SafetyAlert:
        self.db.add(alert)
        await self.db.flush()
        return alert

    async def update_fields(
        self,
        alert_id: UUID,
        *,
        alert_type_id: Optional[UUID] = None,
        game_id: Optional[UUID] = None,
        venue_id: Optional[UUID] = None,
        description: Optional[str] = None,
        game_date: Optional[datetime] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
    ) -> Optional[SafetyAlert]:
        values = {k: v for k, v in {
            "alert_type_id": alert_type_id,
            "game_id": game_id,
            "venue_id": venue_id,
            "description": description,
            "game_date": game_date,
            "latitude": latitude,
            "longitude": longitude,
        }.items() if v is not None}
        if not values:
            return await self.get(alert_id)
        await self.db.execute(update(SafetyAlert).where(SafetyAlert.alert_id == alert_id).values(**values))
        return await self.get(alert_id)

    async def remove(self, alert_id: UUID) -> int:
        res = await self.db.execute(delete(SafetyAlert).where(SafetyAlert.alert_id == alert_id))
        return res.rowcount or 0
