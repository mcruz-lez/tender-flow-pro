#!/bin/bash
set -e

echo "🧹 Cleaning build and cache..."
rm -rf dist .vite node_modules/.cache

echo "🧠 Killing heavy background processes..."
pkill -f vite || true
pkill -f node || true

echo "✅ Clean complete. Ready to run!"
