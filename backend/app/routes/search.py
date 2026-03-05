from typing import List, Optional
from repositories.search_repo import search_service
from db.session import get_session
from schemas.search import SearchResult
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from auth import get_optional_current_user
from models.user import User


router = APIRouter(prefix="/search", tags=["search"])

@router.get("", response_model=List[SearchResult])
async def search(
    query: str = Query(..., min_length=1, description="Search query string"),
    limit: int = Query(7, ge=1, le=20, description="Maximum number of results"),
    current_user: Optional[User] = Depends(get_optional_current_user),
    db: AsyncSession = Depends(get_session)
):
    return await search_service(
        query,
        db,
        limit,
        current_user_id=current_user.user_id if current_user else None,
    )