from __future__ import annotations
from typing import Optional
from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class AlertTypeBase(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, from_attributes=True)

    code: str
    type_name: str


class AlertTypeCreate(AlertTypeBase):
    pass


class AlertTypeUpdate(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True)

    type_name: Optional[str] = None


class AlertTypeRead(AlertTypeBase):
    pass
