from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import ForeignKey, Index, func, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from db.base import Base


class SafetyAlert(Base):
    __tablename__ = "safety_alerts"

    alert_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    reporter_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    alert_type_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("alert_types.alert_type_id"), nullable=False
    )

    description: Mapped[Optional[str]]

    latitude: Mapped[Optional[float]]
    longitude: Mapped[Optional[float]]

    game_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("games.game_id", ondelete="SET NULL")
    )

    game_date: Mapped[Optional[datetime]]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    __table_args__ = (
        Index("ix_safety_alerts_game_date", "game_date"),
        CheckConstraint("(latitude IS NULL OR (latitude >= -90 AND latitude <= 90))", name="ck_alerts_lat_range"),
        CheckConstraint("(longitude IS NULL OR (longitude >= -180 AND longitude <= 180))", name="ck_alerts_lon_range"),
    )
