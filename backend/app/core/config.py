from pydantic_settings import BaseSettings
from pydantic import ConfigDict

class Settings(BaseSettings):
    model_config = ConfigDict(
        env_file=".env",
        extra="ignore"
    )

    project_name: str = "Away-Game"
    app_env: str = "dev"

    database_url: str
    database_url_async: str

    clerk_secret_key: str
    clerk_domain: str

    jwt_secret_key: str = "dev-internal-jwt-secret"
    jwt_algorithm: str = "HS256"
    jwt_exp_minutes: int = 720

settings = Settings()
