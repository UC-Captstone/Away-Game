from fastapi import APIRouter
from routes import auth, games, users, teams, user_favorite_teams, favorites, profile, search, events, event_chat


api_router = APIRouter(prefix="/api")
api_router.include_router(auth.router)
api_router.include_router(games.router)
api_router.include_router(users.router)
api_router.include_router(teams.router)
api_router.include_router(user_favorite_teams.router)
api_router.include_router(favorites.router)
api_router.include_router(profile.router)
api_router.include_router(search.router)
api_router.include_router(events.router)
api_router.include_router(event_chat.router)