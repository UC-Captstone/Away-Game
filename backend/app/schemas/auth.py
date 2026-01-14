from __future__ import annotations
from pydantic import BaseModel
from ..schemas.user import UserRead


class UserAuthResponse(BaseModel):
    token: str
    user: UserRead

    class Config:
        from_attributes = True