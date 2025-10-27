from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.alert_type import AlertType


class AlertTypeRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, alert_type_id: UUID) -> Optional[AlertType]:
        res = await self.db.execute(select(AlertType).where(AlertType.alert_type_id == alert_type_id))
        return res.scalar_one_or_none()

    async def get_by_name(self, type_name: str) -> Optional[AlertType]:
        res = await self.db.execute(select(AlertType).where(AlertType.type_name == type_name))
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[AlertType]:
        res = await self.db.execute(
            select(AlertType).order_by(AlertType.type_name.asc()).limit(limit).offset(offset)
        )
        return res.scalars().all()

    async def add(self, alert_type: AlertType) -> AlertType:
        self.db.add(alert_type)
        await self.db.flush()
        return alert_type

    async def update_fields(
        self,
        alert_type_id: UUID,
        *,
        type_name: Optional[str] = None,
        code: Optional[str] = None,
    ) -> Optional[AlertType]:
        values = {k: v for k, v in {
            "type_name": type_name,
            "code": code,
        }.items() if v is not None}
        if not values:
            return await self.get(alert_type_id)
        await self.db.execute(update(AlertType).where(AlertType.alert_type_id == alert_type_id).values(**values))
        return await self.get(alert_type_id)

    async def remove(self, alert_type_id: UUID) -> int:
        res = await self.db.execute(delete(AlertType).where(AlertType.alert_type_id == alert_type_id))
        return res.rowcount or 0
