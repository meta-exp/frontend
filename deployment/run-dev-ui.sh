#!/bin/bash
docker stop ui-dev-container
docker rm ui-dev-container
docker run --name ui-dev-container \
           --publish=${1:-3000}:3000 \
           -d \
           -e REACT_APP_API_HOST=$REACT_APP_API_HOST \
           dev-ui \
           npm start
           