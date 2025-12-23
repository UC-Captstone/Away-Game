from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.controllers.profile import get_user_profile_service
from app.db.session import get_session
from app.auth import get_current_user
from app.models.user import User
from app.schemas.user import UserProfile

router = APIRouter(prefix="/users/me", tags=["profile"])

@router.get("/profile", response_model=UserProfile)
async def get_user_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session)
):
    return await get_user_profile_service(current_user, db)
