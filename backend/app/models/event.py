from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, Index, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..db.base import Base

class Event(Base):
    __tablename__ = "events"

    event_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    creator_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    event_type_id: Mapped[str] = mapped_column(
        ForeignKey("event_types.code"), nullable=False
    )

    game_id: Mapped[int | None] = mapped_column(
        ForeignKey("games.game_id", ondelete="SET NULL")
    )
    venue_id: Mapped[int | None] = mapped_column(
        ForeignKey("venues.venue_id")
    )
    title: Mapped[str]
    description: Mapped[Optional[str]]
    picture_url: Mapped[Optional[str]]
    game_date: Mapped[Optional[datetime]]
    latitude: Mapped[float | None]
    longitude: Mapped[float | None]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=func.now())
    creator = relationship("User", back_populates="events")
    event_type = relationship("EventType")
    game = relationship("Game")
    venue = relationship("Venue", back_populates="events")

    __table_args__ = (
        Index("ix_events_game_date", "game_date"),
        CheckConstraint("latitude IS NULL OR (latitude BETWEEN -90 AND 90)", name="chk_event_lat_range"),
        CheckConstraint("longitude IS NULL OR (longitude BETWEEN -180 AND 180)", name="chk_event_lon_range"),
    )
