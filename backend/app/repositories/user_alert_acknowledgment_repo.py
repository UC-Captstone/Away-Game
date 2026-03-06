from __future__ import annotations
from typing import Sequence
from uuid import UUID

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert as pg_insert

from models.user_alert_acknowledgment import UserAlertAcknowledgment
from models.safety_alert import SafetyAlert


class UserAlertAcknowledgmentRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def acknowledge(self, user_id: UUID, alert_id: UUID) -> UserAlertAcknowledgment:
        stmt = pg_insert(UserAlertAcknowledgment).values(
            user_id=user_id, alert_id=alert_id
        ).on_conflict_do_nothing(index_elements=["user_id", "alert_id"])
        await self.db.execute(stmt)
        await self.db.flush()
        res = await self.db.execute(
            select(UserAlertAcknowledgment).where(
                UserAlertAcknowledgment.user_id == user_id,
                UserAlertAcknowledgment.alert_id == alert_id,
            )
        )
        return res.scalar_one()

    async def get_unacknowledged_alerts(self, user_id: UUID) -> Sequence[SafetyAlert]:
        subquery = (
            select(UserAlertAcknowledgment.alert_id)
            .where(UserAlertAcknowledgment.user_id == user_id)
        )
        stmt = (
            select(SafetyAlert)
            .where(
                SafetyAlert.is_active == True,
                SafetyAlert.alert_id.notin_(subquery),
            )
            .order_by(SafetyAlert.created_at.desc())
        )
        res = await self.db.execute(stmt)
        return res.scalars().all()
