import os
import jwt
from jwt import PyJWKClient
from dotenv import load_dotenv
from fastapi import Request, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from clerk_backend_api import Clerk
from app.models.user import User
from app.core.config import settings
from app.repositories.user_repo import UserRepository

load_dotenv()

CLERK_SECRET_KEY = settings.clerk_secret_key
clerk_client = Clerk(bearer_auth=CLERK_SECRET_KEY)

try:
    jwks_client = PyJWKClient(
        f"https://{settings.clerk_domain}/.well-known/jwks.json",
        cache_keys=True,
        max_cached_keys=16,
        cache_timeout=3600
    )
except Exception as e:
    print(f"Warning: Could not initialize JWKS client: {e}")
    jwks_client = None

async def verify_clerk_token(token: str) -> dict:
    if not jwks_client:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Authentication service unavailable"
        )

    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        decoded = jwt.decode(
            token,
            signing_key.key,
            algorithms=["RS256"],
            options={"verify_exp": True, "verify_aud": False}
        )
        
        return {
            "clerk_id": decoded.get("sub"),
            "email": decoded.get("email"),
            "username": decoded.get("username") or decoded.get("given_name") or decoded.get("email", "").split("@")[0],
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

async def sync_user_service(request: Request, db: AsyncSession) -> None:
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
    )

    if created:
        await db.commit()
        await db.refresh(user)