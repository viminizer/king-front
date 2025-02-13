#!/bin/bash

echo "Starting deploys..."
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 16.17.0 || {
  echo "Failed to use Node.js version"
  exit 1
}

#PRODUCTION
git reset --hard
git checkout master
pwd
git pull origin master || {
  echo "Git pull failed"
  exit 1
}

npm i yarn -g
yarn
yarn run build

if pm2 list | grep -q "KING-REACT"; then
  echo "App is already running. Restarting..."
  pm2 reload KING-REACT
else
  echo "App is not running. Starting..."
  pm2 start "yarn run start:prod" --name=KING-REACT
fi

pm2 startup
pm2 save
