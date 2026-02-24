from __future__ import annotations
import logging
from typing import Optional, Sequence
from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession
from models.venue import Venue


logger = logging.getLogger(__name__)


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
            select(Venue).order_by(Venue.name.asc()).limit(limit).offset(offset)
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
        city: Optional[str] = None,
        state_region: Optional[str] = None,
        country: Optional[str] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        is_indoor: Optional[bool] = None,
    ) -> Optional[Venue]:
        values = {k: v for k, v in {
            "name": name,
            "city": city,
            "state_region": state_region,
            "country": country,
            "latitude": latitude,
            "longitude": longitude,
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
        city: Optional[str] = None,
        state_region: Optional[str] = None,
        country: Optional[str] = None,
        latitude: Optional[float] = None,
        longitude: Optional[float] = None,
        is_indoor: Optional[bool] = None,
    ) -> Venue:
        existing = await self.get(venue_id)
        if existing:
            updates = {}
            if existing.latitude is None and latitude is not None:
                updates["latitude"] = latitude
            if existing.longitude is None and longitude is not None:
                updates["longitude"] = longitude
            if existing.is_indoor is None and is_indoor is not None:
                updates["is_indoor"] = is_indoor
            if updates:
                logger.info(f"Venue {venue_id} exists, updating missing fields: {updates}")
                await self.db.execute(
                    update(Venue).where(Venue.venue_id == venue_id).values(**updates)
                )
                await self.db.flush()
                return await self.get(venue_id)
            return existing
        venue = Venue(
            venue_id=venue_id,
            name=name,
            city=city,
            state_region=state_region,
            country=country,
            latitude=latitude,
            longitude=longitude,
            is_indoor=is_indoor,
        )
        return await self.add(venue)

    async def remove(self, venue_id: int) -> int:
        res = await self.db.execute(delete(Venue).where(Venue.venue_id == venue_id))
        return res.rowcount or 0
