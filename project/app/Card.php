<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
  public $timestamps  = false;

  public function user() {
    return $this->belongsTo('App\User');
  }

  public function items() {
    return $this->hasMany('App\Item');
  }
}
