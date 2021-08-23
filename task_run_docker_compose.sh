#!/usr/bin/env bash

docker-compose up -d --build

read -p "Is http://localhost:4444/wd/hub/status ready? " answer
case ${answer} in 
  y|yes) echo "Selenium Hub is ready, moving on" ;;
  *) echo "Selenium Hub is NOT ready, exiting"; docker-compose down; exit 1 ;;
esac

docker-compose run --rm nightwatch npm test

docker-compose down

echo "Script completed in ${SECONDS}s"
