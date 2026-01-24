"""ESPN Public API HTTP Client."""

import httpx
import logging
from typing import Optional

logger = logging.getLogger(__name__)


class ESPNClient:
    """Async HTTP client for ESPN public API.

    Provides methods to fetch NFL teams, games, and scoreboard data
    from ESPN's public API endpoints.

    Example:
        ```python
        client = ESPNClient()
        try:
            teams = await client.get_nfl_teams()
            games = await client.get_nfl_scoreboard(dates="20260122")
        finally:
            await client.close()
        ```
    """

    BASE_URL = "https://site.api.espn.com/apis/site/v2/sports"

    def __init__(self, timeout: float = 30.0):
        """Initialize ESPN API client.

        Args:
            timeout: Request timeout in seconds (default: 30.0)
        """
        self.client = httpx.AsyncClient(
            timeout=timeout,
            follow_redirects=True
        )

    async def get_nfl_teams(self) -> dict:
        """Fetch all NFL teams.

        Returns:
            dict: ESPN API response containing all 32 NFL teams with:
                - team.id (int): ESPN team ID
                - team.location (str): Team location (e.g., "Atlanta")
                - team.name (str): Team name (e.g., "Falcons")
                - team.displayName (str): Full name (e.g., "Atlanta Falcons")
                - team.logos (list): Array of logo URLs

        Raises:
            httpx.HTTPStatusError: If API returns error status
            httpx.TimeoutException: If request times out

        Example:
            ```python
            teams = await client.get_nfl_teams()
            for sport in teams['sports']:
                for league in sport['leagues']:
                    for team_data in league['teams']:
                        team = team_data['team']
                        print(f"{team['id']}: {team['displayName']}")
            ```
        """
        url = f"{self.BASE_URL}/football/nfl/teams"
        logger.info(f"Fetching NFL teams from {url}")

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

    async def get_nfl_scoreboard(self, dates: Optional[str] = None) -> dict:
        """Fetch NFL scoreboard (games and venues) for a specific date.

        Args:
            dates: Date in YYYYMMDD format (e.g., "20260122").
                   If None, returns today's games.

        Returns:
            dict: ESPN API response containing games with:
                - events[].id (str): ESPN game/event ID
                - events[].date (str): ISO datetime
                - events[].competitions[].competitors[]: Home/away teams
                    - homeAway (str): "home" or "away"
                    - team.id (str): ESPN team ID
                - events[].competitions[].venue: Venue information
                    - id (str): ESPN venue ID
                    - fullName (str): Stadium name
                    - address.city (str): City
                    - address.state (str): State
                    - address.country (str): Country
                    - indoor (bool): Indoor stadium flag

        Raises:
            httpx.HTTPStatusError: If API returns error status
            httpx.TimeoutException: If request times out

        Example:
            ```python
            # Get games for January 22, 2026
            scoreboard = await client.get_nfl_scoreboard(dates="20260122")

            for event in scoreboard.get('events', []):
                game_id = event['id']
                date_time = event['date']
                venue = event['competitions'][0]['venue']
                print(f"Game {game_id} at {venue['fullName']}")
            ```
        """
        url = f"{self.BASE_URL}/football/nfl/scoreboard"
        params = {"dates": dates} if dates else {}

        logger.info(f"Fetching NFL scoreboard from {url} with params: {params}")

        try:
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            event_count = len(data.get('events', []))
            logger.info(f"Successfully fetched scoreboard with {event_count} games")
            return data

        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error fetching scoreboard: {e.response.status_code} - {e.response.text}")
            raise

        except httpx.TimeoutException as e:
            logger.error(f"Timeout fetching scoreboard: {e}")
            raise

        except Exception as e:
            logger.error(f"Unexpected error fetching scoreboard: {e}")
            raise

    async def close(self):
        """Close the HTTP client connection.

        Should be called when done using the client to free resources.

        Example:
            ```python
            client = ESPNClient()
            try:
                await client.get_nfl_teams()
            finally:
                await client.close()
            ```
        """
        await self.client.aclose()
        logger.debug("ESPN client closed")
