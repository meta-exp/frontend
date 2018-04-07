# 32de-UI
UI component of graph exploration tool with meta-paths

[![Build Status](https://travis-ci.org/KDD-OpenSource/32de-UI.svg?branch=master)](https://travis-ci.org/KDD-OpenSource/32de-UI)
[![Heroku](https://heroku-badge.herokuapp.com/?app=metaexp)](http://metaexp.herokuapp.com/)

# Deployment
To deploy our system including neo4j, the neo4j graph algorithm component, the UI and our server install docker on your system and run `deployment/docker-complete-deployment.sh`.
This will install a clean version from the alpha-dev and the master branches and doesn't include your local code changes.

# Development
To build your own local code use `deployment/build-ui.sh /path/to/code` (e.g. `deployment/build-ui.sh .`) and to run a single container `deployment/run-ui.sh [API_ENDPOINT] [PORT]` (e.g. ./deployment/run-dev-ui.sh http://localhost:8000/).

Tutorials for installing Docker: [Mac](https://docs.docker.com/docker-for-mac/install/), [Windows](https://docs.docker.com/docker-for-windows/install/) and [Ubuntu](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/).
