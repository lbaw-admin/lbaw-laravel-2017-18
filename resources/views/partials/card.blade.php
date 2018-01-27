<article class="card">
<header>
  <h2><a href="/cards/{{ $card->id }}">{{ $card->name }}</a></h2>
</header>
<ul>
  @each('partials.item', $card->items()->orderBy('id')->get(), 'item')
</ul>
<form class="new_item">
  <input type="hidden" name="card_id" value="{{ $card->id }}">
  <input type="text" name="description" placeholder="new item">
</form>
</article>
