from fastapi import FastAPI
from db.session import init_db
from core.middleware import setup_cors
from routes.api import api_router

app = FastAPI(title="Away-Game API")

setup_cors(app)

app.include_router(api_router)

@app.on_event("startup")
async def _startup() -> None:
    await init_db()
    print("Database initialized.")