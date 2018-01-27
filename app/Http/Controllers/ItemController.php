<?php

namespace App\Http\Controllers;

use App\Item;
use App\Card;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
  /**
   * Creates a new item.
   *
   * @param  int  $card_id
   * @param  Request request containing the description
   * @return Response
   */
  public function create(Request $request, $card_id)
  {
    $item = new Item();
    $item->card_id = $card_id;

    $this->authorize('create', $item);

    $item->done = false;
    $item->description = $request->input('description');
    $item->save();

    return $item;
  }

    /**
     * Updates the state of an individual item.
     *
     * @param  int  $id
     * @param  Request request containing the new state
     * @return Response
     */
    public function update(Request $request, $id)
    {
      $item = Item::find($id);

      $this->authorize('update', $item);

      $item->done = $request->input('done');
      $item->save();

      return $item;
    }

    /**
     * Deletes an individual item.
     *
     * @param  int  $id
     * @return Response
     */
    public function delete(Request $request, $id)
    {
      $item = Item::find($id);

      $this->authorize('delete', $item);
      $item->delete();

      return $item;
    }

}
