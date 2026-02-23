from typing import List
from repositories.search_repo import search_service
from db.session import get_session
from schemas.search import SearchResult
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix="/search", tags=["search"])

@router.get("", response_model=List[SearchResult])
async def search(
    query: str = Query(..., min_length=1, description="Search query string"),
    limit: int = Query(7, ge=1, le=20, description="Maximum number of results"),
    db: AsyncSession = Depends(get_session)
):
    return await search_service(query, db, limit)