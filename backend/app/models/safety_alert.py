from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Index, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

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
    description: Mapped[Optional[str]]
    game_date: Mapped[Optional[datetime]]
    latitude: Mapped[float | None]
    longitude: Mapped[float | None]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    reporter = relationship("User", back_populates="safety_alerts")
    alert_type = relationship("AlertType")
    game = relationship("Game")
    venue = relationship("Venue", back_populates="alerts")

    __table_args__ = (
        Index("ix_alerts_game_date", "game_date"),
        CheckConstraint("latitude IS NULL OR (latitude BETWEEN -90 AND 90)", name="chk_alert_lat_range"),
        CheckConstraint("longitude IS NULL OR (longitude BETWEEN -180 AND 180)", name="chk_alert_lon_range"),
    )
