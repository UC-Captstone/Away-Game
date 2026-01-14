from datetime import datetime, timedelta
import jwt
from jwt import PyJWKClient
from dotenv import load_dotenv
from pathlib import Path
from fastapi import Request, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from clerk_backend_api import Clerk
from ..models.user import User
from ..core.config import settings
from ..repositories.user_repo import UserRepository

# load environment variables from both the backend/.env and project root .env
env_loaded = False
for candidate in [
    Path(__file__).resolve().parents[3] / ".env",  # project root
    Path(__file__).resolve().parents[1] / ".env"   # backend/.env
]:
    try:
        if candidate.exists():
            load_dotenv(dotenv_path=str(candidate), override=False)
            env_loaded = True
    except Exception:
        pass
if not env_loaded:
    # Fallback to default search
    load_dotenv()

CLERK_SECRET_KEY = settings.clerk_secret_key
clerk_client = Clerk(bearer_auth=CLERK_SECRET_KEY)

def _build_jwks_url(domain: str) -> str:
    if not domain:
        raise ValueError("CLERK_DOMAIN is not set")
    normalized = domain.strip()
    if normalized.startswith("http://"):
        normalized = normalized[len("http://"):]
    if normalized.startswith("https://"):
        normalized = normalized[len("https://"):]
    return f"https://{normalized}/.well-known/jwks.json"

try:
    jwks_url = _build_jwks_url(settings.clerk_domain)
    jwks_client = PyJWKClient(
        jwks_url,
        cache_keys=True,
        max_cached_keys=16
    )
except Exception as e:
    print(f"Warning: Could not initialize JWKS client (domain='{settings.clerk_domain}'): {e}")
    jwks_client = None

async def verify_clerk_token(token: str) -> dict:
    if not jwks_client:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service unavailable"
        )

    try:
        print(f"DEBUG: Attempting to verify token (first 50 chars): {token[:50]}...")
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        decoded = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_exp": True, "verify_aud": False}
        )
        
        return {
            "clerk_id": decoded.get("clerk_id"),
            "email": decoded.get("email"),
            "username": decoded.get("username"),
            "first_name": decoded.get("first_name"),
            "last_name": decoded.get("last_name"),
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token verification failed: {str(e)}"
        )

def _create_internal_jwt(user: User) -> str:
    exp = datetime.utcnow() + timedelta(minutes=settings.jwt_exp_minutes)
    payload = {
        "sub": str(user.user_id),
        "uid": str(user.user_id),
        "username": user.username,
        "email": user.email,
        "exp": exp,
    }
    token = jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)
    return token

async def sync_user_service(request: Request, db: AsyncSession):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization header"
        )

    token = auth_header.split("Bearer ")[1]
    clerk_data = await verify_clerk_token(token)

    if not clerk_data.get("email") or not clerk_data.get("clerk_id"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user data from Clerk"
        )

    repo = UserRepository(db)
    user, created = await repo.get_or_create_by_clerk_id(
        clerk_id=clerk_data["clerk_id"],
        email=clerk_data["email"],
        username=clerk_data["username"],
        first_name=clerk_data.get("first_name"),
        last_name=clerk_data.get("last_name")
    )

    if created:
        await db.commit()
        await db.refresh(user)

    internal_token = _create_internal_jwt(user)

    return {"token": internal_token, "user": user}