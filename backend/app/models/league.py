from __future__ import annotations
from sqlalchemy import String, Boolean, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from db.base import Base

class League(Base):
    __tablename__ = "leagues"

    league_code: Mapped[str] = mapped_column(String(10), primary_key=True)
    espn_sport: Mapped[str | None] = mapped_column(String(50))
    espn_league: Mapped[str | None] = mapped_column(String(50))
    league_name: Mapped[str]
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    teams = relationship("Team", back_populates="league")
    games = relationship("Game", back_populates="league")