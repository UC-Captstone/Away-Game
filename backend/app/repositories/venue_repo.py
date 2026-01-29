from __future__ import annotations
from typing import Optional, Sequence
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.venue import Venue


class VenueRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, venue_id: int) -> Optional[Venue]:
        res = await self.db.execute(select(Venue).where(Venue.venue_id == venue_id))
        return res.scalar_one_or_none()

    async def get_by_identity(
        self,
        *,
        name: str,
        city: Optional[str] = None,
        state_region: Optional[str] = None,
        country: Optional[str] = None,
    ) -> Optional[Venue]:
        stmt = select(Venue).where(Venue.name == name)
        if city is not None:
            stmt = stmt.where(Venue.city == city)
        if state_region is not None:
            stmt = stmt.where(Venue.state_region == state_region)
        if country is not None:
            stmt = stmt.where(Venue.country == country)
        res = await self.db.execute(stmt)
        return res.scalar_one_or_none()

    async def list(self, *, limit: int = 100, offset: int = 0) -> Sequence[Venue]:
        res = await self.db.execute(
            select(Venue).order_by(Venue.display_name.asc()).limit(limit).offset(offset)
        )
        return res.scalars().all()

    async def add(self, venue: Venue) -> Venue:
        self.db.add(venue)
        await self.db.flush()
        return venue

    async def update_fields(
        self,
        venue_id: int,
        *,
        name: Optional[str] = None,
        display_name: Optional[str] = None,
        city: Optional[str] = None,
        state_region: Optional[str] = None,
        country: Optional[str] = None,
        timezone: Optional[str] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        capacity: Optional[int] = None,
        is_indoor: Optional[bool] = None,
    ) -> Optional[Venue]:
        values = {k: v for k, v in {
            "name": name,
            "display_name": display_name,
            "city": city,
            "state_region": state_region,
            "country": country,
            "timezone": timezone,
            "latitude": latitude,
            "longitude": longitude,
            "capacity": capacity,
            "is_indoor": is_indoor,
        }.items() if v is not None}
        if not values:
            return await self.get(venue_id)
        await self.db.execute(update(Venue).where(Venue.venue_id == venue_id).values(**values))
        return await self.get(venue_id)

    async def upsert(
        self,
        venue_id: int,
        name: str,
        display_name: str,
        city: Optional[str] = None,
        state_region: Optional[str] = None,
        country: Optional[str] = None,
        timezone: Optional[str] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        capacity: Optional[int] = None,
        is_indoor: Optional[bool] = None,
    ) -> Venue:
        existing = await self.get(venue_id)
        if existing:
            return existing
        venue = Venue(
            venue_id=venue_id,
            name=name,
            display_name=display_name,
            city=city,
            state_region=state_region,
            country=country,
            timezone=timezone,
            latitude=latitude,
            longitude=longitude,
            capacity=capacity,
            is_indoor=is_indoor,
        )
        return await self.add(venue)

    async def remove(self, venue_id: int) -> int:
        res = await self.db.execute(delete(Venue).where(Venue.venue_id == venue_id))
        return res.rowcount or 0
