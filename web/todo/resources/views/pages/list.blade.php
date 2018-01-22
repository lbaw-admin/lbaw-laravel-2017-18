@extends('layouts.page')

@section('title', $list->name)

@section('content')
  <article class="list">
  <header>
    <h2>{{ $list->name }}</h2>
  </header>
  <ul>
    @each('partials.item', $items, 'item')
  </ul>
  </article>
@endsection
