#!/bin/bash

docker-compose up --build -d

wait_for_elasticsearch() {
  until curl -s -H "Content-Type: application/json" "http://localhost:9200/_cat/health";do
    echo "Waiting for Elasticsearch..."
    sleep 5
  done
  echo "Elasticsearch is ready!"
}

wait_for_elasticsearch

(cd client && yarn && yarn start) &
(cd server && yarn && node index.js)


sleep 30000 
