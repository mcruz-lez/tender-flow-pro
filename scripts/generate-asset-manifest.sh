#!/bin/bash
# Auto-generate asset manifest for TendProcure web app
# Scans /tendprocure-assets and outputs manifest.json for React auto-loading

ASSET_DIR="$(dirname "$0")/../tendprocure-assets"
MANIFEST_FILE="$ASSET_DIR/manifest.json"

find "$ASSET_DIR" -type f \( -name '*.png' -o -name '*.svg' -o -name '*.mp4' -o -name '*.pptx' -o -name '*.html' -o -name '*.js' -o -name '*.css' \) \
  | sed "s|$ASSET_DIR/||" \
  | jq -R -s -c '
    split("\n")[:-1] | map({file: ., section: (. | split("/") | .[0])})
  ' > "$MANIFEST_FILE"

echo "Asset manifest generated at $MANIFEST_FILE"
