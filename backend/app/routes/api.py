from fastapi import APIRouter
from ..routes import auth, games, users, teams, user_favorite_teams, favorites, profile


api_router = APIRouter()
api_router.include_router(auth.router)
api_router.include_router(games.router)
api_router.include_router(users.router)
api_router.include_router(teams.router)
api_router.include_router(user_favorite_teams.router)
api_router.include_router(favorites.router)
api_router.include_router(profile.router)