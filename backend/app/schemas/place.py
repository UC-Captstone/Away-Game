from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel

from schemas.common import Location

PlaceCategory = Literal["restaurant", "bar", "hotel"]


class PlaceRead(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    fsq_id: str
    name: str
    category: PlaceCategory
    category_label: Optional[str] = None
    location: Location
    address: Optional[str] = None
    distance_meters: Optional[int] = None
