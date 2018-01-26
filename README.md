## Install

    git clone git@github.com:arestivo/lbaw-laravel.git
    cd lbaw-laravel/project
    composer install

## Start

From project root:

    docker-compose up # Starts postgresql and pgadmin 4
    cd project
    php artisan serve # Start development server

## Usage

To access the application navigate to:

    http://localhost:8080/list

To manage the database using PgAdmin 4 navigate to:
    # username: postgres@lbaw.com
    # password: pg!fcp
    http://localhost:8001
