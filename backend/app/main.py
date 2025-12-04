from fastapi import FastAPI
from app.db.session import init_db
from app.routes.api import api_router
from app.core.middleware import setup_cors

from app.routes import games, users, teams, user_favorite_teams, favorites, profile

app = FastAPI(title="Away-Game API")

setup_cors(app)

app.include_router(games.router)
app.include_router(users.router)
app.include_router(teams.router)
app.include_router(user_favorite_teams.router)
app.include_router(favorites.router)
app.include_router(profile.router)

@app.on_event("startup")
async def _startup() -> None:
    await init_db()
    print("Database initialized.")