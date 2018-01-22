@extends('layouts.page')

@section('title', 'Lists')

@section('content')

@foreach ($lists as $list)
  <article class="list">
  <header>
    <h2><a href="list/{{ $list->id }}">{{ $list->name }}</a></h2>
  </header>
  <ul>
    @each('partials.item', $list->items, 'item')
  </ul>
  </article>
  @endforeach

@endsection
