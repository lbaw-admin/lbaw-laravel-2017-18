FROM ubuntu:17.10
RUN apt-get update
RUN apt-get install -y --no-install-recommends php libpq-dev nginx

COPY ./web /var/www/html
COPY ./etc/php/php.ini /usr/local/etc/php/conf.d/php.ini
COPY ./etc/nginx/default.conf /etc/nginx/conf.d/default.conf
