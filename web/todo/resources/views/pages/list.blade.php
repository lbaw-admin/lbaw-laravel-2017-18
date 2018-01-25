@extends('layouts.app')

@section('title', $list->name)

@section('content')
  <article class="list">
  <header>
    <h2>{{ $list->name }}</h2>
  </header>
  <ul>
    @each('partials.item', $list->items()->get(), 'item')
  </ul>
  </article>
@endsection
