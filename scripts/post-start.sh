#!/bin/bash
set -e

echo "🧠 Freeing memory from unused processes..."
pkill -f vite || true
pkill -f node || true

echo "🧹 Cleaning temp files..."
rm -rf node_modules/.cache .vite dist coverage

echo "✅ Post-start memory optimization complete."
