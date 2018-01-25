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
  <form class="new_item">
    <input type="hidden" name="list_id" value="{{ $list->id }}">
    <input type="text" name="description">
  </form>
  </article>
@endsection
