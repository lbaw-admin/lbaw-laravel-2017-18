## Install

    git clone git@github.com:arestivo/lbaw-laravel.git
    cd lbaw-laravel/
    sudo chown -R www-data:www-data web/todo/storage/
    cd web/todo
    composer install
    cd ../..
    docker-compose up

Navigate to

    http://localhost:8080/list
