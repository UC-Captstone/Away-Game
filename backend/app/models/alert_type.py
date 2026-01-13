from __future__ import annotations
from sqlalchemy import String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from db.base import Base


class AlertType(Base):
    __tablename__ = "alert_types"

    code: Mapped[str] = mapped_column(String(20), primary_key=True)
    type_name: Mapped[str]

    __table_args__ = (
        UniqueConstraint("type_name", name="uq_alert_types_name"),
    )
