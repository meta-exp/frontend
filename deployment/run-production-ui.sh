#!/bin/bash
docker stop ui-production-container
docker rm ui-production-container
docker run --name ui-production-container \
           --publish=${1:-80}:80 \
           -d \
           -e REACT_APP_API_HOST=$REACT_APP_API_HOST \
           production-ui
           