from app.controllers.auth import sync_user_service
from app.schemas.user import UserRead
from fastapi import APIRouter, Request, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_session

router = APIRouter()

@router.post("/sync", status_code=204)
async def sync_user(request: Request, db: AsyncSession = Depends(get_session)):
    await sync_user_service(request, db)
    return None