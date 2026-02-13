from fastapi import FastAPI
from db.session import init_db
from routes import games, users, teams, user_favorite_teams, favorites, profile, auth, event_chat
from core.middleware import setup_cors

app = FastAPI(title="Away-Game API")

setup_cors(app)

app.include_router(auth.router, prefix="/api")
app.include_router(games.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(teams.router, prefix="/api")
app.include_router(user_favorite_teams.router, prefix="/api")
app.include_router(favorites.router, prefix="/api")
app.include_router(profile.router, prefix="/api")
app.include_router(event_chat.router, prefix="/api")

@app.on_event("startup")
async def _startup() -> None:
    await init_db()
    print("Database initialized.")