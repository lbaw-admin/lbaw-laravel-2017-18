@extends('layouts.app')

@section('title', $card->name)

@section('content')
  @include('partials.card', ['card' => $card])
@endsection
