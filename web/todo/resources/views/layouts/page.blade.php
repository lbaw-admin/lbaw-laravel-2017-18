<html>
    <head>
        <title>App Name - @yield('title')</title>
        <link rel="stylesheet" href="{{ url('/css/style.css') }}">
    </head>
    <body>
      <main>
        <header>
          <h1><a href="{{ url('/list') }}">Thingy!</a></h1>
        </header>
        <section id="content">
          @yield('content')
        </section>
      </main>
    </body>
</html>
