# Away-Game Backend

Azure Functions app serving the Away-Game REST API and nightly ESPN data scraper.

## Prerequisites

- Python 3.11.x (via pyenv)
- [Azure Functions Core Tools v4](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local): `npm install -g azure-functions-core-tools@4`
- PostgreSQL connection available (local Docker or Azure Postgres)

## Install Dependencies

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r app/requirements.txt
```

## Running Locally

### 1. Create `app/local.settings.json`

This file is gitignored. Populate it with values from Azure Key Vault (or local equivalents):

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<Azure Storage connection string>",
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "DATABASE_URL": "<sync DB connection string>",
    "DATABASE_URL_ASYNC": "<async DB connection string>",
    "CLERK_SECRET_KEY": "<clerk secret>",
    "CLERK_DOMAIN": "<clerk domain>",
    "JWT_SECRET_KEY": "<jwt secret>",
    "FOURSQUARE_API_KEY": "<foursquare api key>",
    "LEAGUES_CONFIG": "<JSON array of league objects>"
  }
}
```

### 2. Start the Function App

```bash
cd backend/app
func start
```

This starts:
- **HttpTrigger** — REST API at `http://localhost:7071/api/{route}`
- **NightlyTaskTimer** — ESPN scraper (cron: 5 AM UTC daily)

Optional (API only, without Functions host):

```bash
cd backend/app
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

With `uvicorn`, app routes are under `http://localhost:8000/api` and Swagger is at `http://localhost:8000/docs`.

### 3. Manually Trigger the Scraper

```bash
curl -X POST http://localhost:7071/admin/functions/NightlyTaskTimer -H "Content-Type: application/json" -d "{}"
```

## LEAGUES_CONFIG

The `LEAGUES_CONFIG` env var controls which leagues the scraper manages. It's a JSON array stored in Azure Key Vault so leagues can be enabled without a code change.

Each entry:

| Field | Example |
|-------|---------|
| `league_code` | `"NFL"` |
| `espn_sport` | `"football"` |
| `espn_league` | `"nfl"` |
| `league_name` | `"National Football League"` |
| `is_active` | `true` |

Supported leagues: NFL, NBA, NHL, MLB, MLS (`usa.1`), NCAAF (`college-football`), NCAAB (`mens-college-basketball`)
