## Prepare your development environment

To prepare you computer for development you need to install some software, namely docker, php and
the php package manager composer.

We recommend using an ubuntu distribution that ships php7.1. You can install the required software with:

    sudo apt-get install git php composer docker-compose

At this time, you are ready to start working on your project. You should have created a fork from
this repository and shared it with your friends and teacher. When you're ready to start, do the
following:

    git clone git@github.com:<YOUR GITHUB>>/lbaw-laravel.git
    cd lbaw-laravel
    composer install

Notice that you need to substitute <YOUR GITHUB> by the username of the team member that forked the
repository. At this point you have project skeleton in your local machine and are ready to start.

## Working with PostgreSQL

You will be using PostgreSQL to implement this project. We've created a docker-compose file that
sets up PostgreSQL and pgadmin 4 locally. From project root issue the following command:

    docker-compose up # Starts postgresql and pgadmin 4

This will start the database and pgadmin. The database's username is `postgres` and the password
`pg!fcp`. You can access http://localhost:5050 to access pgadmin 4 and manage your database. On the
first usage you will need to add the connection to the database using the following attributes:

    username: postgres
    password: pg!fcp
    hostname: postgres

Hostname is postgres instead of localhost since docker composes creates an internal DNS entry to
facilitate connection between linked containers.

## Developing the project

You're all set up to start developing the project. In the provided skeleton you will already find
a basic todo list app, which you will modify to start implementing your own.

To start the development server, from the project's root run:

    # Seed database from the seed.sql file. Needed on first run and everytime the database script changes.
    php artisan db:seed
    php artisan serve # Start the development server

Access http://localhost:8000 to see the app running. If you made changes to the credentials be sure
to update the `.env` file accordingly.

## Publishing your image

You should keep your git's master branch always functional and frequently build and deploy your
code. To do so, you will create a docker image for your project and publish it at docker hub. LBAW's
teachers will frequently pull all these images and make them available at TODO..

First thing you need to do is create a docker hub account and get your username from it. Once you
have a username, let your docker know who you are by executing:

    docker login

Once your docker is able to communicate with the docker hub using your credentials configure the
`upload_image.sh` script with your username and group's identification as well. Afterwards, you can
build and upload the docker image by executing that script from the project root:

    ./upload_image.sh

After building the image you can also test it locally by running:

    docker run -it -p 8000:80 <DOCKER_USERNAME>/<IMAGE NAME>

Note that during the build process we adopt the production configurations from the `.env_production`
file. You should configure it with your production database credentials, since your local database
will not be available in the production environment.

Note that there should be only one image per group. One team member should create the image
initially and add his team to the repository at docker hub.
