from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import UniqueConstraint, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Venue(Base):
    __tablename__ = "venues"

    venue_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str]
    display_name: Mapped[str]
    city: Mapped[str | None]
    state_region: Mapped[str | None]
    country: Mapped[str | None]
    timezone: Mapped[str]
    latitude: Mapped[float | None]
    longitude: Mapped[float | None]
    capacity: Mapped[int | None]
    is_indoor: Mapped[bool | None]
    espn_venue_id: Mapped[int | None] = mapped_column(unique=True)

    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=func.now())

    teams = relationship("Team", back_populates="home_venue", viewonly=True)
    games = relationship("Game", back_populates="venue", viewonly=True)
    events = relationship("Event", back_populates="venue", viewonly=True)
    alerts = relationship("SafetyAlert", back_populates="venue", viewonly=True)

    __table_args__ = (
        UniqueConstraint("name", "city", "state_region", "country", name="uq_venues_name_location"),
        CheckConstraint("latitude IS NULL OR (latitude BETWEEN -90 AND 90)", name="chk_lat_range"),
        CheckConstraint("longitude IS NULL OR (longitude BETWEEN -180 AND 180)", name="chk_lon_range"),
    )
