<li>
  <label>
    <input type="checkbox" value="{{$item->id}}"{{ $item->done?'checked':''}}>
    <span>{{ $item->description }}</span>
  </label>
</li>
