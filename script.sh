#!/bin/bash

# Start Docker Compose
docker-compose up --build -d

# Function to check if Elasticsearch is ready
wait_for_elasticsearch() {
  until curl -s -H "Content-Type: application/json" "http://localhost:9200/_cat/health";do
    echo "Waiting for Elasticsearch..."
    sleep 5
  done
  echo "Elasticsearch is ready!"
}

# Wait for Elasticsearch to be ready
wait_for_elasticsearch

# Run commands for the client and server
(cd client && yarn && yarn start) &  # Run in the background
(cd server && yarn && node index.js)


sleep 30000 

# Optionally, you can add additional commands or logic here if needed.
