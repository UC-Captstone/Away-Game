from __future__ import annotations

import asyncio
from typing import Dict, List, Optional

import httpx
from fastapi import HTTPException

from core.config import settings
from schemas.common import Location
from schemas.place import PlaceCategory, PlaceRead


CATEGORY_QUERY_BY_TYPE: Dict[PlaceCategory, str] = {
    "restaurant": "restaurant",
    "bar": "bar",
    "hotel": "hotel",
}


def _parse_categories(raw_categories: str) -> List[PlaceCategory]:
    allowed_categories: set[PlaceCategory] = {"restaurant", "bar", "hotel"}
    categories = [c.strip().lower() for c in raw_categories.split(",") if c.strip()]
    valid_categories: List[PlaceCategory] = []

    for category in categories:
        if category in allowed_categories and category not in valid_categories:
            valid_categories.append(category)  # type: ignore[arg-type]

    return valid_categories or ["restaurant", "bar", "hotel"]


def _infer_category(raw_names: List[str], fallback: PlaceCategory) -> PlaceCategory:
    lowered = " ".join(raw_names).lower()

    if any(keyword in lowered for keyword in ["coffee", "cafe"]):
        return "restaurant"
    if any(keyword in lowered for keyword in ["hotel", "lodging", "resort", "motel"]):
        return "hotel"
    if any(keyword in lowered for keyword in ["bar", "pub", "nightlife"]):
        return "bar"
    if any(keyword in lowered for keyword in ["restaurant", "eatery", "food"]):
        return "restaurant"

    return fallback


def _extract_coordinates(raw_place: dict) -> tuple[Optional[float], Optional[float]]:
    # New Places API returns top-level latitude/longitude.
    lat = raw_place.get("latitude")
    lng = raw_place.get("longitude")

    if isinstance(lat, (int, float)) and isinstance(lng, (int, float)):
        return float(lat), float(lng)

    # Backward-compatible fallback for legacy response shape.
    geocodes_main = (raw_place.get("geocodes") or {}).get("main") or {}
    legacy_lat = geocodes_main.get("latitude")
    legacy_lng = geocodes_main.get("longitude")

    if isinstance(legacy_lat, (int, float)) and isinstance(legacy_lng, (int, float)):
        return float(legacy_lat), float(legacy_lng)

    return None, None


async def _search_places_for_category(
    *,
    client: httpx.AsyncClient,
    lat: float,
    lng: float,
    radius: int,
    per_category_limit: int,
    category: PlaceCategory,
    headers: Dict[str, str],
) -> dict:
    query_term = CATEGORY_QUERY_BY_TYPE[category]
    upstream_response = await client.get(
        f"{settings.foursquare_base_url}/places/search",
        params={
            "ll": f"{lat},{lng}",
            "radius": radius,
            "limit": per_category_limit,
            "sort": "DISTANCE",
            "query": query_term,
        },
        headers=headers,
    )
    upstream_response.raise_for_status()
    return upstream_response.json()


async def get_nearby_places_service(
    *,
    lat: float,
    lng: float,
    radius: int,
    limit: int,
    categories: str,
) -> List[PlaceRead]:
    if not settings.foursquare_api_key:
        raise HTTPException(
            status_code=503,
            detail="FOURSQUARE_API_KEY is not configured on the server",
        )

    selected_categories = _parse_categories(categories)
    per_category_limit = max(3, min(20, (limit + len(selected_categories) - 1) // len(selected_categories)))

    raw_key = settings.foursquare_api_key.strip()
    auth_value = raw_key if raw_key.lower().startswith("bearer ") else f"Bearer {raw_key}"

    headers = {
        "Authorization": auth_value,
        "Accept": "application/json",
        "X-Places-Api-Version": settings.foursquare_api_version,
    }

    places_by_id: Dict[str, PlaceRead] = {}

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            payloads = await asyncio.gather(
                *[
                    _search_places_for_category(
                        client=client,
                        lat=lat,
                        lng=lng,
                        radius=radius,
                        per_category_limit=per_category_limit,
                        category=category,
                        headers=headers,
                    )
                    for category in selected_categories
                ]
            )

            for category, payload in zip(selected_categories, payloads):
                for raw_place in payload.get("results", []):
                    fsq_id = raw_place.get("fsq_place_id") or raw_place.get("fsq_id")
                    place_lat, place_lng = _extract_coordinates(raw_place)
                    place_name = raw_place.get("name")

                    if not isinstance(place_name, str):
                        continue

                    normalized_name = place_name.strip()
                    if (
                        not fsq_id
                        or not normalized_name
                        or not isinstance(place_lat, (int, float))
                        or not isinstance(place_lng, (int, float))
                        or fsq_id in places_by_id
                    ):
                        continue

                    category_labels = [
                        c.get("name", "")
                        for c in (raw_place.get("categories") or [])
                        if isinstance(c, dict)
                    ]
                    place_category = _infer_category(category_labels, category)

                    place = PlaceRead(
                        fsq_id=fsq_id,
                        name=normalized_name,
                        category=place_category,
                        category_label=category_labels[0] if category_labels else None,
                        location=Location(lat=place_lat, lng=place_lng),
                        address=(raw_place.get("location") or {}).get("formatted_address"),
                        distance_meters=raw_place.get("distance"),
                    )
                    places_by_id[fsq_id] = place

                    if len(places_by_id) >= limit:
                        break

                if len(places_by_id) >= limit:
                    break
    except httpx.HTTPStatusError as exc:
        upstream_status = exc.response.status_code if exc.response is not None else 502
        upstream_body = ""
        if exc.response is not None:
            upstream_body = exc.response.text[:300]

        if upstream_status == 401:
            raise HTTPException(
                status_code=502,
                detail=(
                    "Foursquare rejected the API key (401 Unauthorized). "
                    "Use a valid Service API key and Bearer auth for the migrated Places API. "
                    f"Upstream response: {upstream_body or 'Unauthorized'}"
                ),
            ) from exc

        raise HTTPException(
            status_code=502,
            detail=f"Foursquare request failed ({upstream_status}): {upstream_body or str(exc)}",
        ) from exc
    except httpx.TimeoutException as exc:
        raise HTTPException(status_code=504, detail="Foursquare request timed out") from exc

    return list(places_by_id.values())[:limit]
