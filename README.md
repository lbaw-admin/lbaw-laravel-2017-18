## Install

    git clone git@github.com:arestivo/lbaw-laravel.git
    cd lbaw-laravel/project
    composer install

## Start

From project root (lbaw-laravel):

    docker-compose up # Starts postgresql and pgadmin 4
    cd project
    php artisan db:seed # Seed database. Needed on first run
                        # and everytime the database script changes.
    php artisan serve # Start development server

## Usage

To access the application navigate to:

    http://localhost:8000

To manage the database using PgAdmin 4 navigate to:

    # username: postgres
    # password: pg!fcp
    http://localhost:5050

## Publishing your image

First thing you need to do is create a docker hub account ang get a username from it. Once you have
a username, configure the `upload_image.sh` script with it.

Afterwards, you can build the local image by executing the script. From
the project root by executing:

    ./upload_image.sh

You can also test your image locally by running:

    docker run -it -p 8000:80 <DOCKER_USERNAME>/<IMAGE NAME>

Note that there should be only one image per group. One team member should create the image
initially and add his team to the repository at docker hub. You should provide your image link to
your teacher.
