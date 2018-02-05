#!/bin/bash

while true; do 
  php vendor/bin/lessc -w resources/assets/less/app.less public/css/app.css
done
