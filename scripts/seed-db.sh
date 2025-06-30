#!/bin/bash
# Seed the Supabase database with initial data for TendProcure
# Usage: ./scripts/seed-db.sh

set -e

SUPABASE_DB_URL=${SUPABASE_DB_URL:-"postgresql://localhost:5432/postgres"}
SEED_SQL="$(dirname "$0")/../src/supabase/sql/seed.sql"

if [ ! -f "$SEED_SQL" ]; then
  echo "Seed SQL file not found: $SEED_SQL"
  exit 1
fi

psql "$SUPABASE_DB_URL" -f "$SEED_SQL"
echo "Database seeded successfully."
