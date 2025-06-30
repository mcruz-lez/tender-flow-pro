#!/bin/bash
# Bootstrap the AI assistant for TendProcure (e.g., upload prompts, set up vector DB, etc.)
# Usage: ./scripts/bootstrap-ai-assistant.sh

set -e

# Example: Upload prompt markdowns to storage or vector DB
PROMPT_DIR="$(dirname "$0")/../src/data/prompts"

for file in "$PROMPT_DIR"/*.md; do
  echo "Uploading $file to AI assistant backend (stub)..."
  # TODO: Replace with actual upload/embedding logic
  # e.g., curl -X POST ...
done

echo "AI assistant bootstrapping complete (stub)."
