@extends('layouts.app')

@section('title', 'Cards')

@section('content')

<section id="cards">
  @foreach ($cards as $card)
    <article class="card">
    <header>
      <h2><a href="card/{{ $card->id }}">{{ $card->name }}</a></h2>
    </header>
    <ul>
      @each('partials.item', $card->items()->orderBy('id')->get(), 'item')
    </ul>
    <form class="new_item">
      <input type="hidden" name="card_id" value="{{ $card->id }}">
      <input type="text" name="description">
    </form>
    </article>
  @endforeach
</section>

@endsection
