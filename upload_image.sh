#!/bin/bash

DOCKER_USERNAME=tiagoboldt # Replace by your docker hub username
IMAGE_NAME=lbaw-t1-g01

docker build -t $DOCKER_USERNAME/$IMAGE_NAME .
docker push $DOCKER_USERNAME/$IMAGE_NAME
