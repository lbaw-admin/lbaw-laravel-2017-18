<li>
  <label>
    <input type="checkbox" value="{{$item->id}}"{{ $item->done?'checked':''}}>
    <span>{{ $item->description }}</span>
    <a href="#" class="delete">&#10761;</a>
  </label>
</li>
