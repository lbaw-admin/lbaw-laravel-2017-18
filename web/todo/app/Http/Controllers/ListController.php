<?php

namespace App\Http\Controllers;

use App\User;

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
      $list = app('db')->select("SELECT * FROM list WHERE id = :id", ['id' => $id])[0];
      $items = app('db')->select("SELECT * FROM item WHERE list_id = :id", ['id' => $id]);
      return view('pages.list', ['list' => $list, 'items' => $items]);
    }

    /**
     * Shows all lists.
     *
     * @return Response
     */
    public function list()
    {
      $lists = app('db')->select("SELECT * FROM list");
      foreach ($lists as $key => $list) {
        $items = app('db')->select("SELECT * FROM item WHERE list_id = :id", ['id' => $list->id]);
        $lists[$key]->items = $items;
      }
      return view('pages.lists', ['lists' => $lists]);
    }
}
