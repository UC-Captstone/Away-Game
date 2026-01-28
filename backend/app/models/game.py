from __future__ import annotations
from datetime import datetime

from sqlalchemy import Integer, String, ForeignKey, UniqueConstraint, CheckConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from db.base import Base

class Game(Base):
    __tablename__ = "games"

    game_id: Mapped[int] = mapped_column(Integer, primary_key=True)

    league_id: Mapped[str] = mapped_column(
        String(10), ForeignKey("leagues.league_code"), nullable=False
    )
    home_team_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("teams.team_id"), nullable=False
    )
    away_team_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("teams.team_id"), nullable=False
    )

    venue_id: Mapped[int | None] = mapped_column(
        Integer, ForeignKey("venues.venue_id")
    )

    date_time: Mapped[datetime]
    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    league = relationship("League", back_populates="games")
    home_team = relationship("Team", foreign_keys=[home_team_id])
    away_team = relationship("Team", foreign_keys=[away_team_id])
    venue = relationship("Venue", back_populates="games")

    __table_args__ = (
        CheckConstraint("home_team_id <> away_team_id", name="chk_game_distinct_teams"),
        UniqueConstraint(
            "league_id", "home_team_id", "away_team_id", "date_time",
            name="uq_games_league_teams_datetime",
        ),
    )
