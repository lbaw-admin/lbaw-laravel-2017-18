<?php

namespace App\Http\Controllers;

use App\Item;
use App\TodoList;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
  /**
   * Creates a new item.
   *
   * @param  int  $list_id
   * @return Response
   */
  public function create(Request $request, $list_id)
  {
    if (!Auth::check()) return redirect('/login');

    $list = TodoList::find($list_id);
    if (Auth::user()->id != $list->user_id) return "error";

    $item = new Item();
    $item->todo_list_id = $list_id;
    $item->description = $request->input('description');
    $item->save();

    return $item;
  }

    /**
     * Updates the done state of an individual item.
     *
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
      if (!Auth::check()) return redirect('/login');

      $item = Item::find($id);
      if (Auth::user()->id != $item->list->user_id) return "error";

      $item->done = $request->input('done');
      $item->save();

      return $item;
    }

    /**
     * Shows all lists.
     *
     * @return Response
     */
    public function list()
    {
      if (!Auth::check()) return redirect('/login');

      $lists = Auth::user()->lists()->get();

      return view('pages.lists', ['lists' => $lists]);
    }
}
