from __future__ import annotations
import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import ForeignKey, Index, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from geoalchemy2 import Geography

from app.db.base import Base


class Event(Base):
    __tablename__ = "events"

    event_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    creator_user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.user_id", ondelete="CASCADE"), nullable=False
    )
    event_type_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("event_types.event_type_id"), nullable=False
    )

    title: Mapped[str]
    description: Mapped[Optional[str]]
    game_date: Mapped[Optional[datetime]]

    game_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), ForeignKey("games.game_id", ondelete="SET NULL")
    )


    location: Mapped[Optional[str]] = mapped_column(Geography(geometry_type="POINT", srid=4326))

    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[Optional[datetime]] = mapped_column(onupdate=func.now())

    __table_args__ = (
        Index("ix_events_location", "location", postgresql_using="gist"),
        Index("ix_events_game_date", "game_date"),
    )
