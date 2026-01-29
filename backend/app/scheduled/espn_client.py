import httpx
import logging
from typing import Optional

logger = logging.getLogger(__name__)


class ESPNClient:

    BASE_URL = "https://site.api.espn.com/apis/site/v2/sports"

    def __init__(self, timeout: float = 30.0):

        self.client = httpx.AsyncClient(
            timeout=timeout,
            follow_redirects=True
        )

    async def get_nfl_teams(self) -> dict:

        url = f"{self.BASE_URL}/football/nfl/teams"
        logger.info(f"Fetching NFL teams")

        try:
            response = await self.client.get(url)
            response.raise_for_status()
            data = response.json()
            logger.info(f"Successfully fetched NFL teams")
            return data

        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error fetching teams: {e.response.status_code} - {e.response.text}")
            raise

        except httpx.TimeoutException as e:
            logger.error(f"Timeout fetching teams: {e}")
            raise

        except Exception as e:
            logger.error(f"Unexpected error fetching teams: {e}")
            raise

    async def get_nfl_schedule(self, dates: Optional[str] = None) -> dict:

        url = f"{self.BASE_URL}/football/nfl/scoreboard"
        params = {"dates": dates} if dates else {}

        logger.info(f"Fetching NFL schedule from {url} with params: {params}")

        try:
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            event_count = len(data.get('events', []))
            logger.info(f"Successfully fetched schedule with {event_count} games")
            return data

        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error fetching schedule: {e.response.status_code} - {e.response.text}")
            raise

        except httpx.TimeoutException as e:
            logger.error(f"Timeout fetching schedule: {e}")
            raise

        except Exception as e:
            logger.error(f"Unexpected error fetching schedule: {e}")
            raise

    async def close(self):

        await self.client.aclose()
        logger.debug("ESPN client closed")
