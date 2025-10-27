from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey, UniqueConstraint, func, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Team(Base):
    __tablename__ = "teams"

    team_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    league_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("leagues.league_id"), nullable=False
    )

    sport_league: Mapped[str]
    sport_conference: Mapped[str | None]
    sport_division: Mapped[str | None]

    home_location: Mapped[str]
    team_name: Mapped[str]
    display_name: Mapped[str]

    home_venue_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("venues.venue_id")
    )
    espn_team_id: Mapped[int | None] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=func.now())

    league = relationship("League", back_populates="teams")
    home_venue = relationship("Venue", foreign_keys=[home_venue_id])
    home_games = relationship("Game", foreign_keys="[Game.home_team_id]", viewonly=True)
    away_games = relationship("Game", foreign_keys="[Game.away_team_id]", viewonly=True)
    chats = relationship("TeamChat", back_populates="team", viewonly=True)
    user_favorite_teams = relationship("UserFavoriteTeams", back_populates="team", viewonly=True)

    __table_args__ = (
        UniqueConstraint("league_id", "home_location", "team_name", name="uq_teams_league_location_name"),
    )
