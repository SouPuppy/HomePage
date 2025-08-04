#!/bin/bash

ProjectRoot="$(dirname "$0")/.."
cd "$ProjectRoot" || { echo "Failed to cd to project root"; exit 1; }

echo "Building Docker image from $ProjectRoot..."

docker build -t soupup/homepage:latest .

if [ $? -eq 0 ]; then
  echo "Build succeeded."
else
  echo "Build failed."
  exit 1
fi
