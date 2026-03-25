from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user
from db.session import get_session
from models.user import User
from repositories.alert_type_repo import AlertTypeRepository
from schemas.alert_type import AlertTypeRead

router = APIRouter(prefix="/alert-types", tags=["alert-types"])


@router.get("/", response_model=List[AlertTypeRead])
async def list_alert_types(
    _current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    repo = AlertTypeRepository(db)
    return await repo.list()
