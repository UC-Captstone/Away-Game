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

    async def get_teams(self, espn_sport: str, espn_league: str) -> dict:

        url = f"{self.BASE_URL}/{espn_sport}/{espn_league}/teams"

        try:
            response = await self.client.get(url)
            response.raise_for_status()
            data = response.json()
            logger.info(f"Successfully fetched {espn_league} teams")
            return data

        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error fetching {espn_league} teams: {e.response.status_code} - {e.response.text}")
            raise

        except httpx.TimeoutException as e:
            logger.error(f"Timeout fetching {espn_league} teams: {e}")
            raise

        except Exception as e:
            logger.error(f"Unexpected error fetching {espn_league} teams: {e}")
            raise

    async def get_team_detail(self, espn_sport: str, espn_league: str, espn_team_id: int) -> dict:

        url = f"{self.BASE_URL}/{espn_sport}/{espn_league}/teams/{espn_team_id}"

        try:
            response = await self.client.get(url)
            response.raise_for_status()
            return response.json()

        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error fetching team {espn_team_id}: {e.response.status_code}")
            raise

        except Exception as e:
            logger.error(f"Error fetching team {espn_team_id}: {e}")
            raise

    async def get_schedule(self, espn_sport: str, espn_league: str, dates: Optional[str] = None) -> dict:

        url = f"{self.BASE_URL}/{espn_sport}/{espn_league}/scoreboard"
        params = {"dates": dates} if dates else {}

        logger.info(f"Fetching {espn_league} schedule from {url} with params: {params}")

        try:
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            event_count = len(data.get('events', []))
            logger.info(f"Successfully fetched {espn_league} schedule with {event_count} games")
            return data

        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error fetching {espn_league} schedule: {e.response.status_code} - {e.response.text}")
            raise

        except httpx.TimeoutException as e:
            logger.error(f"Timeout fetching {espn_league} schedule: {e}")
            raise

        except Exception as e:
            logger.error(f"Unexpected error fetching {espn_league} schedule: {e}")
            raise

    async def close(self):

        await self.client.aclose()
        logger.debug("ESPN client closed")
