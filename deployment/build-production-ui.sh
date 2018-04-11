#!/bin/bash
# Call this script with the path of the context (your code) which should be included in the docker container
# $1 is the first command line argument
docker build --build-arg API_HOST=$REACT_APP_API_HOST -t production-ui -f Dockerfile.production $1