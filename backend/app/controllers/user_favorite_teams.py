from typing import List
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from uuid import UUID

from app.models.user_favorite_team import UserFavoriteTeams
from app.models.user import User
from app.models.team import Team
from app.repositories.user_favorite_team_repo import UserFavoriteTeamsRepository


async def get_user_favorite_teams_service(
	user_id: UUID,
	db: AsyncSession
) -> List[Team]:
	"""
	Get all favorite teams for a user.
	"""
	user_result = await db.execute(select(User).where(User.user_id == user_id))
	user = user_result.scalar_one_or_none()
	if not user:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail=f"User with id {user_id} not found"
		)

	stmt = (
		select(Team)
		.join(UserFavoriteTeams, UserFavoriteTeams.team_id == Team.team_id)
		.where(UserFavoriteTeams.user_id == user_id)
		.options(selectinload(Team.league))
		.order_by(Team.display_name.asc())
	)

	result = await db.execute(stmt)
	teams = result.scalars().all()

	return teams


async def add_favorite_team_service(
	user_id: UUID,
	team_id: int,
	db: AsyncSession
) -> Team:
	"""
	Add a team to a user's favorites.
	"""
	user_result = await db.execute(select(User).where(User.user_id == user_id))
	user = user_result.scalar_one_or_none()
	if not user:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail=f"User with id {user_id} not found"
		)

	team_stmt = select(Team).where(Team.team_id == team_id).options(selectinload(Team.league))
	team_result = await db.execute(team_stmt)
	team = team_result.scalar_one_or_none()
	if not team:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail=f"Team with id {team_id} not found"
		)

	existing_stmt = select(UserFavoriteTeams).where(
		(UserFavoriteTeams.user_id == user_id) & (UserFavoriteTeams.team_id == team_id)
	)
	existing_result = await db.execute(existing_stmt)
	existing = existing_result.scalar_one_or_none()

	if existing:
		raise HTTPException(
			status_code=status.HTTP_400_BAD_REQUEST,
			detail=f"Team {team_id} is already in user's favorites"
		)

	repo = UserFavoriteTeamsRepository(db)
	favorite = UserFavoriteTeams(user_id=user_id, team_id=team_id)
	await repo.add(favorite)
	await db.commit()

	return team


async def replace_favorite_teams_service(
	user_id: UUID,
	team_ids: List[int],
	db: AsyncSession
) -> List[Team]:
	"""
	Replace all favorite teams for a user with a new list.
	"""
	user_result = await db.execute(select(User).where(User.user_id == user_id))
	user = user_result.scalar_one_or_none()
	if not user:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail=f"User with id {user_id} not found"
		)

	if team_ids:
		teams_stmt = select(Team).where(Team.team_id.in_(team_ids))
		teams_result = await db.execute(teams_stmt)
		existing_teams = teams_result.scalars().all()

		existing_team_ids = {team.team_id for team in existing_teams}
		invalid_ids = set(team_ids) - existing_team_ids

		if invalid_ids:
			raise HTTPException(
				status_code=status.HTTP_404_NOT_FOUND,
				detail=f"Teams with ids {invalid_ids} not found"
			)

	repo = UserFavoriteTeamsRepository(db)

	existing_favorites = await repo.list_for_user(user_id)

	for fav in existing_favorites:
		await repo.remove(user_id, fav.team_id)

	for team_id in team_ids:
		favorite = UserFavoriteTeams(user_id=user_id, team_id=team_id)
		await repo.add(favorite)

	await db.commit()

	stmt = (
		select(Team)
		.join(UserFavoriteTeams, UserFavoriteTeams.team_id == Team.team_id)
		.where(UserFavoriteTeams.user_id == user_id)
		.options(selectinload(Team.league))
		.order_by(Team.display_name.asc())
	)

	result = await db.execute(stmt)
	teams = result.scalars().all()

	return teams


async def remove_favorite_team_service(
	user_id: UUID,
	team_id: int,
	db: AsyncSession
) -> None:
	"""
	Remove a team from a user's favorites.
	"""
	repo = UserFavoriteTeamsRepository(db)

	existing_stmt = select(UserFavoriteTeams).where(
		(UserFavoriteTeams.user_id == user_id) & (UserFavoriteTeams.team_id == team_id)
	)
	existing_result = await db.execute(existing_stmt)
	existing = existing_result.scalar_one_or_none()

	if not existing:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail=f"Team {team_id} is not in user's favorites"
		)

	rows_deleted = await repo.remove(user_id, team_id)
	await db.commit()

	if rows_deleted == 0:
		raise HTTPException(
			status_code=status.HTTP_404_NOT_FOUND,
			detail=f"Failed to remove team {team_id} from favorites"
		)
