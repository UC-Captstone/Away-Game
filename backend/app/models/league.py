from __future__ import annotations
import uuid
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import UniqueConstraint
from app.db.base import Base


class League(Base):
    __tablename__ = "leagues"

    league_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    sport_code: Mapped[str]
    league_code: Mapped[str]
    league_name: Mapped[str]
    espn_league_id: Mapped[int | None] = mapped_column(unique=True)
    teams = relationship("Team", back_populates="league", cascade="all, delete-orphan")

    __table_args__ = (
        UniqueConstraint("sport_code", "league_code", name="uq_leagues_sport_league_code"),
    )
