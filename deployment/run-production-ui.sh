#!/bin/bash
docker stop ui-production-container
docker rm ui-production-container
docker run --name ui-production-container \
           --publish=${1:-80}:80 \
           -d \
           production-ui
           