<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Card;

class CardController extends Controller
{
    /**
     * Shows the list for the given ID.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
      $card = Card::find($id);

      $this->authorize('show', $card);

      return view('pages.card', ['card' => $card]);
    }

    /**
     * Shows all cards.
     *
     * @return Response
     */
    public function list()
    {
      if (!Auth::check()) return redirect('/login');

      $this->authorize('list', Card::class);

      $cards = Auth::user()->cards()->orderBy('id')->get();

      return view('pages.cards', ['cards' => $cards]);
    }
}
