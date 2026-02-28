#!/bin/bash

URL="localhost:7000/api/healthcheck"

while true; do
  curl "$URL"
  echo "" 
  sleep 0.1
done