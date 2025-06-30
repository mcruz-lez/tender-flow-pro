#!/bin/bash
# Deploy all Supabase Edge Functions for TendProcure
# Usage: ./scripts/deploy-edge-functions.sh

set -e

cd "$(dirname "$0")/../src/supabase/edge-functions"

for fn in *.ts; do
  if [ -f "$fn" ]; then
    echo "Deploying $fn..."
    supabase functions deploy "${fn%.ts}"
  fi
done

echo "All edge functions deployed."
