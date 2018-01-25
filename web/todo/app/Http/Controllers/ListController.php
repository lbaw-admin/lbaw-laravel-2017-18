<?php

namespace App\Http\Controllers;

use App\User;
use App\Item;
use App\TodoList;

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
      if (!Auth::check()) return redirect('/login');

      $list = TodoList::find($id);

      if (Auth::user()->id != $list->user_id) return redirect('/list');

      return view('pages.list', ['list' => $list]);
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
