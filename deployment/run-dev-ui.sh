#!/bin/bash
docker stop ui-dev-container
docker rm ui-dev-container
docker run --name ui-dev-container \
           --publish=${1:-3000}:3000 \
           -d \
           dev-ui \
           npm start
           