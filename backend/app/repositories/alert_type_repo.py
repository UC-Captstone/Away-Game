from __future__ import annotations
from typing import Optional, Sequence
from sqlalchemy import select, update, delete, case
from sqlalchemy.ext.asyncio import AsyncSession
from models.alert_type import AlertType


class AlertTypeRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, code: str) -> Optional[AlertType]:
        res = await self.db.execute(select(AlertType).where(AlertType.code == code))
        return res.scalar_one_or_none()

    async def get_by_name(self, type_name: str) -> Optional[AlertType]:
        res = await self.db.execute(select(AlertType).where(AlertType.type_name == type_name))
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[AlertType]:
        res = await self.db.execute(
            select(AlertType)
            .order_by(
                case((AlertType.code == 'other', 1), else_=0),
                AlertType.type_name.asc(),
            )
            .limit(limit)
            .offset(offset)
        )
        return res.scalars().all()

    async def add(self, alert_type: AlertType) -> AlertType:
        self.db.add(alert_type)
        await self.db.flush()
        return alert_type

    async def update_fields(
        self,
        code: str,
        *,
        type_name: Optional[str] = None,
    ) -> Optional[AlertType]:
        values = {k: v for k, v in {
            "type_name": type_name,
        }.items() if v is not None}
        if not values:
            return await self.get(code)
        await self.db.execute(update(AlertType).where(AlertType.code == code).values(**values))
        return await self.get(code)

    async def remove(self, code: str) -> int:
        res = await self.db.execute(delete(AlertType).where(AlertType.code == code))
        return res.rowcount or 0
