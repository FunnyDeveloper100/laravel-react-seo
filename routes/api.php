<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('Api')->name('api.')->group(function () {
    Route::get('posts', 'Test@getPosts');
    Route::get('post/{id}', 'Test@getPost');
    Route::post('post/{id}', 'Test@getPost');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
