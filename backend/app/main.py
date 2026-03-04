from fastapi import FastAPI
from fastapi.middleware.gzip import GZipMiddleware
from db.session import init_db
from core.middleware import setup_cors
from routes.api import api_router

app = FastAPI(title="Away-Game API")

# Compress responses > 1 KB — reduces payload size and transfer time,
# especially for large event/game lists.
app.add_middleware(GZipMiddleware, minimum_size=1000)

setup_cors(app)

app.include_router(api_router)

@app.on_event("startup")
async def _startup() -> None:
    await init_db()
    print("Database initialized.")