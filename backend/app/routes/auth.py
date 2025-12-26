from controllers.auth import sync_user_service
from fastapi import APIRouter, Request, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.session import get_session
from schemas.auth import UserAuthResponse

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/sync", response_model=UserAuthResponse)
async def sync_user(request: Request, db: AsyncSession = Depends(get_session)):
    result = await sync_user_service(request, db)
    return result