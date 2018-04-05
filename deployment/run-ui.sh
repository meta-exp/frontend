#!/bin/bash
docker stop ui-container
docker rm ui-container
docker run --name ui-container \
           --publish=${1:-3000}:3000 \
           -d \
           ui
           