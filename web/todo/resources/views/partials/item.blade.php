<li>
  <label>
    <input type="checkbox" value="{{$item->id}}"{{ $item->done?'checked':''}}>
    {{ $item->description }}
  </label>
</li>
