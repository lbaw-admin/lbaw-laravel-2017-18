<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ListController extends Controller
{
    /**
     * Shows the list for the given ID.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
      if (!Auth::check())
        return redirect('/login');

      $list = DB::connection()->select("SELECT * FROM list WHERE id = :id", ['id' => $id])[0];

      if (Auth::user()->id != $list->user_id)
        return redirect('/list');

      $items = DB::connection()->select("SELECT * FROM item WHERE list_id = :id", ['id' => $id]);
      return view('pages.list', ['list' => $list, 'items' => $items]);
    }

    /**
     * Shows all lists.
     *
     * @return Response
     */
    public function list()
    {
      if (!Auth::check())
        return redirect('/login');

      $lists = DB::connection()->select("SELECT *
                                         FROM list
                                         WHERE user_id = :user_id",
                                         ['user_id' => Auth::user()->id]);
      foreach ($lists as $key => $list) {
        $items = DB::connection()->select("SELECT *
                                           FROM item
                                           WHERE list_id = :id",
                                           ['id' => $list->id]);
        $lists[$key]->items = $items;
      }
      return view('pages.lists', ['lists' => $lists]);
    }
}
