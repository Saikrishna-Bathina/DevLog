#!/usr/bin/env bash

# Move to client folder
cd client

# Install client dependencies
npm install

# Run the build script defined in client/package.json (i.e. vite build)
npm run build
