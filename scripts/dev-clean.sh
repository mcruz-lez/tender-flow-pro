#!/bin/bash
set -e

CLEAN_TARGETS=(dist .vite node_modules/.cache .next .nuxt .parcel-cache)

before=$(df -h . | tail -1 | awk '{print $4}')

echo "🧹 Cleaning build and cache..."
for target in "${CLEAN_TARGETS[@]}"; do
  if [ -d "$target" ]; then
    rm -rf "$target"
    echo "Removed $target"
  fi
done

# Clear npm and Vite cache
npm cache clean --force || true
npx vite --clearScreen false --force || true

# Optionally clear pnpm/yarn cache if used
if command -v pnpm &> /dev/null; then pnpm store prune; fi
if command -v yarn &> /dev/null; then yarn cache clean; fi

echo "🧠 Killing heavy background processes..."
pkill -f vite || true
pkill -f node || true

after=$(df -h . | tail -1 | awk '{print $4}')
echo "✅ Clean complete. Freed disk space: $before -> $after. Ready to run!"
