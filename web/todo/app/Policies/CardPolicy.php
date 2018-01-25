<?php

namespace App\Policies;

use App\User;
use App\Card;

use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Auth;

class CardPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function show(User $user, Card $card)
    {
      return $user->id == $card->user_id;
    }

    public function list(User $user)
    {
      return Auth::check();
    }
}
