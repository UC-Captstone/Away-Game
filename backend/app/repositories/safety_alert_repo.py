from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.safety_alert import SafetyAlert

class SafetyAlertRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, alert_id: UUID) -> Optional[SafetyAlert]:
        res = await self.db.execute(select(SafetyAlert).where(SafetyAlert.alert_id == alert_id))
        return res.scalar_one_or_none()

    async def list(
        self,
        *,
        reporter_user_id: Optional[UUID] = None,
        game_id: Optional[int] = None,
        source: Optional[str] = None,
        active_only: bool = False,
        limit: int = 100,
        offset: int = 0
    ) -> Sequence[SafetyAlert]:
        stmt = select(SafetyAlert).order_by(SafetyAlert.created_at.desc()).limit(limit).offset(offset)
        if reporter_user_id:
            stmt = stmt.where(SafetyAlert.reporter_user_id == reporter_user_id)
        if game_id is not None:
            stmt = stmt.where(SafetyAlert.game_id == game_id)
        if source is not None:
            stmt = stmt.where(SafetyAlert.source == source)
        if active_only:
            stmt = stmt.where(SafetyAlert.is_active == True)
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
        alert_type_id: Optional[str] = None,
        game_id: Optional[int] = None,
        venue_id: Optional[int] = None,
        title: Optional[str] = None,
        description: Optional[str] = None,
        severity: Optional[str] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        expires_at: Optional[datetime] = None,
        is_active: Optional[bool] = None,
    ) -> Optional[SafetyAlert]:
        values = {k: v for k, v in {
            "alert_type_id": alert_type_id,
            "game_id": game_id,
            "venue_id": venue_id,
            "title": title,
            "description": description,
            "severity": severity,
            "latitude": latitude,
            "longitude": longitude,
            "expires_at": expires_at,
            "is_active": is_active,
        }.items() if v is not None}
        if not values:
            return await self.get(alert_id)
        await self.db.execute(update(SafetyAlert).where(SafetyAlert.alert_id == alert_id).values(**values))
        return await self.get(alert_id)

    async def remove(self, alert_id: UUID) -> int:
        res = await self.db.execute(delete(SafetyAlert).where(SafetyAlert.alert_id == alert_id))
        return res.rowcount or 0
