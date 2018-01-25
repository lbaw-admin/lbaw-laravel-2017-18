<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('cards');
});

// Lists
Route::get('cards', 'CardController@list');
Route::get('cards/{id}', 'CardController@show');

// API
Route::put('api/card/{card_id}/', 'ItemController@create');
Route::post('api/item/{id}', 'ItemController@update');

// Authentication

Auth::routes();
Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');
