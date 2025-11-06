# To run: . ./load_env.sh
set -e


ENV_FILE="${1:-.env}"

if [ ! -f "$ENV_FILE" ]; then
  echo ".env file not found at $ENV_FILE"
  return 1 2>/dev/null || exit 1
fi

export $(grep -v '^#' "$ENV_FILE" | xargs)

echo "Environment variables loaded."
