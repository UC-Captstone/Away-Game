import os
from sqlalchemy import create_engine, text


url = os.getenv("SYNC_DATABASE_URL")
if not url:
    raise RuntimeError("SYNC_DATABASE_URL not found in environment")

print(f"Testing connection to: {url}")
engine = create_engine(url)

with engine.connect() as conn:
    version = conn.execute(text("SELECT version();")).scalar_one()
    print("✅ Connected successfully!")
    print("Postgres version:", version)
