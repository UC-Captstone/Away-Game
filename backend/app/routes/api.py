from fastapi import APIRouter
from routes import auth, games, users, teams, user_favorite_teams, favorites, profile, search, events, event_chat, friends, direct_messages, safety_alerts, alert_types 


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
api_router.include_router(friends.router)
api_router.include_router(direct_messages.router)
api_router.include_router(safety_alerts.router)
api_router.include_router(alert_types.router)
