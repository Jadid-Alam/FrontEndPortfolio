#!/bin/bash
set -e

DEST="/var/www/jadid-alam.com"

echo "Building..."
npm run build

echo "Deploying to $DEST..."
sudo rsync -a --delete dist/ "$DEST/"

echo "Setting permissions..."
sudo chown -R www-data:www-data "$DEST"
sudo find "$DEST" -type d -exec chmod 755 {} \;
sudo find "$DEST" -type f -exec chmod 644 {} \;

echo "Done."
