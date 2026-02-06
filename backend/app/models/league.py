from __future__ import annotations
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from db.base import Base

class League(Base):
    __tablename__ = "leagues"

    league_code: Mapped[str] = mapped_column(String(10), primary_key=True)
    espn_sport: Mapped[str]
    espn_league: Mapped[str | None]
    league_name: Mapped[str]
    is_active: Mapped[bool] = mapped_column(default=False)

    teams = relationship("Team", back_populates="league", cascade="all, delete-orphan")
    games = relationship("Game", back_populates="league")
