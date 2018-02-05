## Prepare your development environment

To prepare you computer for development you need to install some software, namely _docker_, _php_ and
the php package manager _composer_.

We recommend using an _ubuntu_ distribution that ships _php 7.1_. You can install the required software with:

    sudo apt-get install git php composer docker-compose

At this time, you are ready to start working on your project. You should have created a fork from
this repository and shared it with your friends and teacher. When you're ready to start, do the
following:

    git clone git@github.com:<YOUR GITHUB>/lbaw-laravel.git
    cd lbaw-laravel
    composer install

Notice that you need to substitute \<YOUR GITHUB\> with the username of the team member that forked the
repository. At this point you should have the project skeleton in your local machine and be ready to start.

## Working with PostgreSQL

You will be using _PostgreSQL_ to implement this project. We've created a _docker-compose_ file that
sets up _PostgreSQL_ and _pgadmin 4_ locally. From the project root issue the following command:

    docker-compose up

This will start the database and _pgadmin_. The database's username is `postgres` and the password
`pg!fcp`. You can access http://localhost:5050 to access _pgadmin 4_ and manage your database. On the
first usage you will need to add the connection to the database using the following attributes:

    hostname: postgres
    username: postgres
    password: pg!fcp

Hostname is _postgres_ instead of _localhost_ since _docker composer_ creates an internal _DNS_ entry to
facilitate connection between linked containers.

## Developing the project

You're all set up to start developing the project. In the provided skeleton you will already find
a basic todo list app, which you will modify to start implementing your own.

To start the development server, from the project's root run:

    # Seed database from the seed.sql file. Needed on first run and everytime the database script changes.
    php artisan db:seed
    # Start the development server
    php artisan serve

Access http://localhost:8000 to see the app running. If you made changes to the credentials be sure
to update the `.env` file accordingly.

## Code Structure

A typical web request involves the following steps and files:

### 1) Routes

The webpage is processed by *Laravel*'s [routing](https://laravel.com/docs/5.5/routing) mechanism.
By default, routes are defined inside *routes/web.php*. A typical *route* looks like this:

    Route::get('cards/{id}', 'CardController@show');

This route receives a parameter *id* that is passed on to the *show* method of a controller
called *CardController*.

### 2) Controllers

[Controllers](https://laravel.com/docs/5.5/controllers) group related request handling logic into
a single class. Controllers are normally defined in the *app/Http/Controllers* folder.

    class CardController extends Controller
    {
        public function show($id)
        {
          $card = Card::find($id);

          $this->authorize('show', $card);

          return view('pages.card', ['card' => $card]);
        }
    }

This particular controller contains a *show* method that receives an *id* from a route. The method
searches for a card in the database, checks if the user as permission to view the card, and then
returns a view.

### 3) Database



### 4) Policies

### 5) Views

### 6) CSS

### 7) Javascript

## Publishing your image

You should keep your git's master branch always functional and frequently build and deploy your
code. To do so, you will create a _docker_ image for your project and publish it at
[docker hub](https://hub.docker.com/). LBAW's teachers will frequently pull all these images and
make them available at **TODO**.

First thing you need to do is create a [docker hub](https://hub.docker.com/) account and get your
username from it. Once you have a username, let your docker know who you are by executing:

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

Note that there should be only one image per group. One team member should create the image initially
and add his team to the repository at docker hub.
