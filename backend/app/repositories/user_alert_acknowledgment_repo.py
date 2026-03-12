from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID

from sqlalchemy import select, union
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.dialects.postgresql import insert as pg_insert

from models.user_alert_acknowledgment import UserAlertAcknowledgment
from models.safety_alert import SafetyAlert
from models.favorite import Favorite
from models.event import Event


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

        favorited_game_ids_direct = (
            select(Favorite.game_id)
            .where(Favorite.user_id == user_id, Favorite.game_id.isnot(None))
        )

        favorited_game_ids_via_event = (
            select(Event.game_id)
            .join(Favorite, Favorite.event_id == Event.event_id)
            .where(
                Favorite.user_id == user_id,
                Favorite.event_id.isnot(None),
                Event.game_id.isnot(None),
            )
        )

        favorited_game_ids = union(favorited_game_ids_direct, favorited_game_ids_via_event).subquery()

        acknowledged_alert_ids = (
            select(UserAlertAcknowledgment.alert_id)
            .where(UserAlertAcknowledgment.user_id == user_id)
        )

        stmt = (
            select(SafetyAlert)
            .where(
                SafetyAlert.is_active == True,
                SafetyAlert.alert_id.notin_(acknowledged_alert_ids),
                SafetyAlert.game_id.isnot(None),
                SafetyAlert.game_id.in_(favorited_game_ids),
            )
            .order_by(SafetyAlert.is_official.desc(), SafetyAlert.created_at.desc())
        )
        res = await self.db.execute(stmt)
        return res.scalars().all()

    async def get_acknowledged_alerts(
        self,
        user_id: UUID,
        search: Optional[str] = None,
        limit: int = 50,
        offset: int = 0,
    ) -> Sequence[SafetyAlert]:
        acknowledged_alert_ids = (
            select(UserAlertAcknowledgment.alert_id)
            .where(UserAlertAcknowledgment.user_id == user_id)
        )
        stmt = (
            select(SafetyAlert)
            .where(SafetyAlert.alert_id.in_(acknowledged_alert_ids))
            .order_by(SafetyAlert.created_at.desc())
            .limit(limit)
            .offset(offset)
        )
        if search:
            stmt = stmt.where(SafetyAlert.title.ilike(f"%{search}%"))
        res = await self.db.execute(stmt)
        return res.scalars().all()
