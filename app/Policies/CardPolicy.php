<?php

namespace App\Policies;

use App\User;
use App\Card;

use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class CardPolicy
{
    use HandlesAuthorization;

    public function show(User $user, Card $card)
    {
      return $user->id == $card->user_id;
    }

    public function list(User $user)
    {
      return Auth::check();
    }

    public function create(User $user)
    {
      return Auth::check();
    }
}
