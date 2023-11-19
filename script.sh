#!/bin/bash

wait_for_elasticsearch() {
  until curl -s -H "Content-Type: application/json" "http://localhost:9200/_cat/health"; do
    echo "Waiting for Elasticsearch..."
    sleep 5
  done
  echo "Elasticsearch is ready!"
}

terminate_processes() {
  local port_list=(3000, 3003)

  for port in $port_list; do
    local pid_list=$(netstat -ano | findstr ":$port")
    
    if [ -n "$pid_list" ]; then
      for pid in $pid_list; do
        taskkill //PID $pid //F
        echo "---"
      done
    else
      echo "No processes found on port $port."
    fi
  done
}


cleanup() {
  echo "Performing cleanup..."

  docker-compose down

  # Terminate processes on port 3000
  terminate_processes

  echo "Cleanup complete."
  sleep 5
  exit 0
}

trap 'cleanup' EXIT INT

docker-compose up --build -d

wait_for_elasticsearch

(cd client && yarn && yarn start) &
(cd server && yarn && node index.js)
