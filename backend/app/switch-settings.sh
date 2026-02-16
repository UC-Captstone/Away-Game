#!/bin/bash
# Usage: ./switch-settings.sh [local|cloud]

if [ -z "$1" ]; then
    echo "Usage: ./switch-settings.sh [local|cloud]"
    echo "Current setting: $(readlink -f local.settings.json 2>/dev/null || echo 'Not a symlink')"
    exit 1
fi

ENV=$1
SOURCE="local.settings.${ENV}.json"

if [ ! -f "$SOURCE" ]; then
    echo "Error: $SOURCE not found"
    exit 1
fi

# Remove existing file or symlink
rm -f local.settings.json

# Copy the selected settings file
cp "$SOURCE" local.settings.json

echo "✓ Switched to $ENV environment (copied from $SOURCE)"
