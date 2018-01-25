<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
  public $timestamps  = false;

  public function list() {
    return $this->belongsTo('App\TodoList', 'todo_list_id');
  }
}
