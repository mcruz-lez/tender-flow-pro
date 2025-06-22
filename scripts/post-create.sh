#!/bin/bash
set -e

echo "📦 Installing dependencies..."
npm install

echo "🧹 Initial cleanup..."
rm -rf node_modules/.cache .vite dist coverage

echo "✅ Post-create complete."
