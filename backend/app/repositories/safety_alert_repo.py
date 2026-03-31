from __future__ import annotations
from typing import Optional, Sequence
from uuid import UUID
from datetime import datetime
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from models.safety_alert import SafetyAlert
from schemas.common import Location
from schemas.safety_alert import SafetyAlertFeedRead, SafetyAlertSeverity

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


def _derive_alert_severity(alert_type_code: Optional[str], alert_type_name: Optional[str]) -> SafetyAlertSeverity:
    combined = f"{alert_type_code or ''} {alert_type_name or ''}".lower()

    if any(token in combined for token in ["high", "critical", "severe", "danger", "emergency"]):
        return SafetyAlertSeverity.HIGH
    if any(token in combined for token in ["low", "info", "advisory"]):
        return SafetyAlertSeverity.LOW
    return SafetyAlertSeverity.MEDIUM


def _severity_from_db_or_derived(alert: SafetyAlert) -> SafetyAlertSeverity:
    # Prefer the persisted alert severity; derive from type only as a fallback.
    raw = (alert.severity or "").strip().lower()
    if raw == "high":
        return SafetyAlertSeverity.HIGH
    if raw == "medium":
        return SafetyAlertSeverity.MEDIUM
    if raw == "low":
        return SafetyAlertSeverity.LOW

    return _derive_alert_severity(
        alert.alert_type_id,
        alert.alert_type.type_name if alert.alert_type is not None else None,
    )


def _map_alert_to_feed(alert: SafetyAlert) -> Optional[SafetyAlertFeedRead]:
    lat = alert.latitude
    lng = alert.longitude

    if (lat is None or lng is None) and alert.venue is not None:
        lat = alert.venue.latitude
        lng = alert.venue.longitude

    if lat is None or lng is None:
        return None

    title = "Safety Alert"
    if alert.alert_type is not None and alert.alert_type.type_name:
        title = alert.alert_type.type_name

    date_time = alert.created_at
    if date_time is None:
        date_time = datetime.utcnow()

    description = alert.description or "Reported safety issue in the area."

    return SafetyAlertFeedRead(
        alert_id=alert.alert_id,
        reporter_user_id=alert.reporter_user_id,
        alert_type_id=alert.alert_type_id,
        game_id=alert.game_id,
        venue_id=alert.venue_id,
        latitude=lat,
        longitude=lng,
        created_at=alert.created_at,
        severity=_severity_from_db_or_derived(alert),
        title=title,
        description=description,
        date_time=date_time,
        location=Location(lat=lat, lng=lng),
    )


async def get_game_safety_alerts_service(
    game_id: int,
    db: AsyncSession,
    *,
    limit: int = 50,
) -> list[SafetyAlertFeedRead]:
    stmt = (
        select(SafetyAlert)
        .where(SafetyAlert.game_id == game_id)
        .options(
            selectinload(SafetyAlert.alert_type),
            selectinload(SafetyAlert.venue),
        )
        .order_by(SafetyAlert.created_at.desc())
        .limit(limit)
    )
    result = await db.execute(stmt)
    alerts = result.unique().scalars().all()

    mapped_alerts: list[SafetyAlertFeedRead] = []
    for alert in alerts:
        mapped = _map_alert_to_feed(alert)
        if mapped is not None:
            mapped_alerts.append(mapped)

    return mapped_alerts
