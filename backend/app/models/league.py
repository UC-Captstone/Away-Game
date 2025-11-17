from __future__ import annotations
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base

class League(Base):
    __tablename__ = "leagues"

    league_code: Mapped[str] = mapped_column(String(10), primary_key=True)
    sport_code: Mapped[str]
    league_name: Mapped[str]
    espn_league_id: Mapped[int | None] = mapped_column(unique=True)

    teams = relationship("Team", back_populates="league", cascade="all, delete-orphan")
    games = relationship("Game", back_populates="league")
