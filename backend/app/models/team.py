from __future__ import annotations
from datetime import datetime

from sqlalchemy import Integer, String, ForeignKey, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base

class Team(Base):
    __tablename__ = "teams"

    team_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)

    espn_team_id: Mapped[int] = mapped_column(Integer, nullable=False)

    league_id: Mapped[str] = mapped_column(
        String(10), ForeignKey("leagues.league_code"), nullable=False
    )

    home_location: Mapped[str]
    team_name: Mapped[str]
    display_name: Mapped[str]
    logo_url: Mapped[str | None]

    home_venue_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("venues.venue_id")
    )
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime | None] = mapped_column(onupdate=func.now())

    league = relationship("League", back_populates="teams")
    home_venue = relationship("Venue", foreign_keys=[home_venue_id])
    home_games = relationship("Game", foreign_keys="[Game.home_team_id]", viewonly=True)
    away_games = relationship("Game", foreign_keys="[Game.away_team_id]", viewonly=True)
    chats = relationship("TeamChat", back_populates="team", viewonly=True)
    user_favorite_teams = relationship("UserFavoriteTeams", back_populates="team", viewonly=True)

    __table_args__ = (
        UniqueConstraint("espn_team_id", "league_id", name="uq_teams_espn_id_league"),
    )
