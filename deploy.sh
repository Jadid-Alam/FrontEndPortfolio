#!/bin/bash
set -e

source .env

DEST="/var/www/jadid-alam.com"

echo "Building..."
npm run build

echo "Deploying to $DEPLOY_USER@$DEPLOY_HOST:$DEST..."
rsync -az --delete dist/ "$DEPLOY_USER@$DEPLOY_HOST:$DEST"

echo "Done."
