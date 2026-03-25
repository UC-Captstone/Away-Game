from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Index, CheckConstraint, String, Boolean, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base

class SafetyAlert(Base):
    __tablename__ = "safety_alerts"

    alert_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reporter_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    alert_type_id: Mapped[str] = mapped_column(
        ForeignKey("alert_types.code"), nullable=False
    )
    game_id: Mapped[int | None] = mapped_column(
        ForeignKey("games.game_id", ondelete="SET NULL")
    )
    venue_id: Mapped[int | None] = mapped_column(
        ForeignKey("venues.venue_id")
    )
    title: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[Optional[str]]
    source: Mapped[str] = mapped_column(String(10), default="admin", server_default="admin", nullable=False)
    severity: Mapped[str] = mapped_column(String(10), default="low", server_default="low", nullable=False)
    latitude: Mapped[float | None]
    longitude: Mapped[float | None]
    expires_at: Mapped[datetime | None]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true", nullable=False)
    is_official: Mapped[bool] = mapped_column(Boolean, default=False, server_default="false", nullable=False)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    reporter = relationship("User", back_populates="safety_alerts")
    alert_type = relationship("AlertType")
    game = relationship("Game")
    venue = relationship("Venue", back_populates="alerts")
    acknowledgments = relationship("UserAlertAcknowledgment", back_populates="alert", cascade="all, delete-orphan")

    __table_args__ = (
        Index("ix_alerts_game_id", "game_id"),
        CheckConstraint("latitude IS NULL OR (latitude BETWEEN -90 AND 90)", name="chk_alert_lat_range"),
        CheckConstraint("longitude IS NULL OR (longitude BETWEEN -180 AND 180)", name="chk_alert_lon_range"),
        CheckConstraint("severity IN ('low', 'medium', 'high')", name="chk_alert_severity"),
        CheckConstraint("source IN ('admin', 'user')", name="chk_alert_source"),
    )
