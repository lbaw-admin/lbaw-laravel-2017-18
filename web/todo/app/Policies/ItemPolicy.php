<?php

namespace App\Policies;

use App\User;
use App\Card;
use App\Item;

use Illuminate\Auth\Access\HandlesAuthorization;

class ItemPolicy
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

    public function create(User $user, Item $item)
    {
      return $user->id == $item->card->user_id;
    }

    public function update(User $user, Item $item)
    {
      return $user->id == $item->card->user_id;
    }
}
