from __future__ import annotations
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field, model_validator
from pydantic.alias_generators import to_camel

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

class Location(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)
    
    lat: float
    lng: float

class Msg(BaseModel):
    """
    success/info message envelope for responses.
    """
    message: str
