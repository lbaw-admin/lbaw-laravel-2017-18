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
      // Only a card owner can see it
      return $user->id == $card->user_id;
    }

    public function list(User $user)
    {
      // Any user can list its own cards
      return Auth::check();
    }

    public function create(User $user)
    {
      // Any user can create a new card
      return Auth::check();
    }

    public function delete(User $user, Card $card)
    {
      // Only a card owner can delete it
      return $user->id == $card->user_id;
    }
}
