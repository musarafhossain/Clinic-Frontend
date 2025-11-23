#!/bin/bash

# Exit on error
set -e

# Commit message
MSG=${1:-"Build update"}

echo "🔄 Switching to main branch..."
git checkout main

echo "📦 Pulling latest changes..."
git pull origin main

echo "🔀 Switching to build branch..."
git checkout build

echo "🧹 Cleaning old build output..."
rm -rf *

echo "📁 Copying new exported files from /out..."
cp -r ../out/* .

echo "➕ Staging files..."
git add .

echo "💬 Committing changes..."
git commit -m "$MSG"

echo "🚀 Pushing to build branch..."
git push origin build

echo "✨ Deployment complete!"
