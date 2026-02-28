#!/bin/bash

URL="localhost:7000/api/healthcheck"

while true; do
  timestamp=$(date +"%H:%M:%S.%3N")
  echo -n "[$timestamp] "
  curl "$URL"
  echo ""
  
  sleep 0.1
done