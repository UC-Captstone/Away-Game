from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import ForeignKey, Index, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from geoalchemy2 import Geography

from app.db.base import Base


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
    location: Mapped[Optional[str]] = mapped_column(Geography(geometry_type="POINT", srid=4326))

    # Optional linkage to a game that the alert refers to
    game_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("games.game_id", ondelete="SET NULL")
    )

    game_date: Mapped[Optional[datetime]]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    __table_args__ = (
        Index("ix_safety_alerts_location", "location", postgresql_using="gist"),
        Index("ix_safety_alerts_game_date", "game_date"),
    )
