@extends('layouts.app')

@section('title', 'Lists')

@section('content')

<section id="lists">
  @foreach ($lists as $list)
    <article class="list">
    <header>
      <h2><a href="list/{{ $list->id }}">{{ $list->name }}</a></h2>
    </header>
    <ul>
      @each('partials.item', $list->items()->orderBy('id')->get(), 'item')
    </ul>
    <form class="new_item">
      <input type="hidden" name="list_id" value="{{ $list->id }}">
      <input type="text" name="description">
    </form>
    </article>
  @endforeach
</section>

@endsection
