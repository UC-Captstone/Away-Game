from typing import List, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from auth import get_current_user, require_admin, require_verified_creator
from db.session import get_session
from models.safety_alert import SafetyAlert
from models.user import User
from repositories.game_repo import GameRepository
from repositories.venue_repo import VenueRepository
from repositories.safety_alert_repo import SafetyAlertRepository
from repositories.user_alert_acknowledgment_repo import UserAlertAcknowledgmentRepository
from schemas.safety_alert import SafetyAlertCreateRequest, SafetyAlertRead, SafetyAlertUpdate

router = APIRouter(prefix="/safety-alerts", tags=["safety-alerts"])


@router.get("/unacknowledged", response_model=List[SafetyAlertRead])
async def get_unacknowledged_alerts(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    repo = UserAlertAcknowledgmentRepository(db)
    return await repo.get_unacknowledged_alerts(current_user.user_id)


@router.get("/history", response_model=List[SafetyAlertRead])
async def get_alert_history(
    search: Optional[str] = Query(default=None, description="Filter by title"),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    repo = UserAlertAcknowledgmentRepository(db)
    return await repo.get_acknowledged_alerts(current_user.user_id, search=search, limit=limit, offset=offset)


@router.get("/", response_model=List[SafetyAlertRead])
async def list_alerts(
    game_id: Optional[int] = Query(default=None, description="Filter by game ID"),
    source: Optional[str] = Query(default=None, description="Filter by source (admin or user)"),
    active_only: bool = Query(default=True, description="Only return active alerts"),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
    _current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    repo = SafetyAlertRepository(db)
    return await repo.list(
        game_id=game_id,
        source=source,
        active_only=active_only,
        limit=limit,
        offset=offset,
    )


@router.get("/{alert_id}", response_model=SafetyAlertRead)
async def get_alert(
    alert_id: UUID,
    _current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    repo = SafetyAlertRepository(db)
    alert = await repo.get(alert_id)
    if not alert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Alert not found")
    return alert


@router.post("/", response_model=SafetyAlertRead, status_code=status.HTTP_201_CREATED)
async def create_alert(
    alert_data: SafetyAlertCreateRequest,
    current_user: User = Depends(require_verified_creator),
    db: AsyncSession = Depends(get_session),
):
    source = "admin" if current_user.role == "admin" else "user"

    # Only admins can create official alerts
    is_official = alert_data.is_official and current_user.role == "admin"

    # Auto-populate venue_id and coordinates from the game if not supplied
    venue_id = alert_data.venue_id
    latitude = alert_data.latitude
    longitude = alert_data.longitude
    if alert_data.game_id is not None:
        game_repo = GameRepository(db)
        game = await game_repo.get(alert_data.game_id)
        if game and game.venue_id:
            if venue_id is None:
                venue_id = game.venue_id
            if latitude is None and longitude is None:
                venue_repo = VenueRepository(db)
                venue = await venue_repo.get(game.venue_id)
                if venue:
                    latitude = venue.latitude
                    longitude = venue.longitude

    alert = SafetyAlert(
        reporter_user_id=current_user.user_id,
        alert_type_id=alert_data.alert_type_id,
        game_id=alert_data.game_id,
        venue_id=venue_id,
        title=alert_data.title,
        description=alert_data.description,
        source=source,
        severity=alert_data.severity,
        is_official=is_official,
        latitude=latitude,
        longitude=longitude,
        expires_at=alert_data.expires_at,
    )
    repo = SafetyAlertRepository(db)
    created = await repo.add(alert)
    await db.commit()
    await db.refresh(created)
    return created


@router.patch("/{alert_id}", response_model=SafetyAlertRead)
async def update_alert(
    alert_id: UUID,
    alert_data: SafetyAlertUpdate,
    _admin: User = Depends(require_admin),
    db: AsyncSession = Depends(get_session),
):
    repo = SafetyAlertRepository(db)
    alert = await repo.get(alert_id)
    if not alert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Alert not found")

    updated = await repo.update_fields(
        alert_id,
        **alert_data.model_dump(exclude_unset=True),
    )
    await db.commit()
    await db.refresh(updated)
    return updated


@router.delete("/{alert_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_alert(
    alert_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    repo = SafetyAlertRepository(db)
    alert = await repo.get(alert_id)
    if not alert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Alert not found")

    is_owner = alert.reporter_user_id == current_user.user_id
    is_admin = current_user.role == "admin"
    if not is_owner and not is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    await repo.remove(alert_id)
    await db.commit()
    return None


@router.post("/acknowledge-all", status_code=status.HTTP_200_OK)
async def acknowledge_all_non_official(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    """Acknowledge all non-official unacknowledged alerts for the current user."""
    ack_repo = UserAlertAcknowledgmentRepository(db)
    alerts = await ack_repo.get_unacknowledged_alerts(current_user.user_id)
    for alert in alerts:
        if not alert.is_official:
            await ack_repo.acknowledge(current_user.user_id, alert.alert_id)
    await db.commit()
    return {"detail": f"Acknowledged {sum(1 for a in alerts if not a.is_official)} alerts"}


@router.post("/{alert_id}/acknowledge", status_code=status.HTTP_201_CREATED)
async def acknowledge_alert(
    alert_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    alert_repo = SafetyAlertRepository(db)
    alert = await alert_repo.get(alert_id)
    if not alert:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Alert not found")

    ack_repo = UserAlertAcknowledgmentRepository(db)
    await ack_repo.acknowledge(current_user.user_id, alert_id)
    await db.commit()
    return {"detail": "Alert acknowledged"}
