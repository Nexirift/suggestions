#!/bin/sh

pwd

echo "Migrating database..."
cd /app/migrate
bun db:migrate & PID=$!
# Wait for migration to finish
wait $PID

echo "Starting production server..."
cd /app
node ./server.js & PID=$!

wait $PID
