@extends('layouts.app')

@section('title', $card->name)

@section('content')
  <article class="card">
  <header>
    <h2>{{ $card->name }}</h2>
  </header>
  <ul>
    @each('partials.item', $card->items()->orderBy('id')->get(), 'item')
  </ul>
  <form class="new_item">
    <input type="hidden" name="card_id" value="{{ $card->id }}">
    <input type="text" name="description">
  </form>
  </article>
@endsection
