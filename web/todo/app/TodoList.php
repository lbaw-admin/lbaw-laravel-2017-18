<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Item;

class TodoList extends Model
{
  public function user() {
    return $this->belongsTo('App\User');
  }

  public function items() {
    return $this->hasMany('App\Item');
  }
}
