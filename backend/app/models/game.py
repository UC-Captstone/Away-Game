from __future__ import annotations
import uuid
from datetime import datetime

from sqlalchemy import UniqueConstraint, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Game(Base):
    __tablename__ = "games"

    game_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # ESPN identifiers (kept to match your Excel fields & earlier favorites logic)
    espn_sport_id: Mapped[int]
    espn_league_id: Mapped[int]
    espn_team_id: Mapped[int]

    # Scheduled time of this game instance
    date_time: Mapped[datetime]

    created_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)

    __table_args__ = (
        # one row per (sport, league, team, datetime)
        UniqueConstraint(
            "espn_sport_id", "espn_league_id", "espn_team_id", "date_time",
            name="uq_games_sport_league_team_dt"
        ),
    )
