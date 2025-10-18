# app/schemas/common.py
from __future__ import annotations
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, model_validator


class LocationPoint(BaseModel):
    """
    Only going to be used on event/alert but defined here for reuse if we extend location features later.
    """
    longitude: float = Field(..., ge=-180, le=180)
    latitude: float = Field(..., ge=-90, le=90)


class TimeRange(BaseModel):
    """
    Optional time window for filtering events or alerts by date range.
    """
    start: Optional[datetime] = None
    end: Optional[datetime] = None

    @model_validator(mode="after")
    def _validate_order(self) -> "TimeRange":
        if self.start and self.end and self.start > self.end:
            raise ValueError("start must be <= end")
        return self


class Msg(BaseModel):
    """
    success/info message envelope for responses.
    """
    message: str
