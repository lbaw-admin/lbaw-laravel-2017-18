<li class="item" data-id="{{$item->id}}">
  <label>
    <input type="checkbox" {{ $item->done?'checked':''}}>
    <span>{{ $item->description }}</span>
    <a href="#" class="delete">&#10761;</a>
  </label>
</li>
