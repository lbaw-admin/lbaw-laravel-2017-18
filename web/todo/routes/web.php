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
    return redirect('list');
});

Route::get('list', 'ListController@list');
Route::get('list/{id}', 'ListController@show');

Auth::routes();

Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');
