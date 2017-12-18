<?php

/*
  |--------------------------------------------------------------------------
  | Application Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register all of the routes for an application.
  | It is a breeze. Simply tell Lumen the URIs it should respond to
  | and give it the Closure to call when that URI is requested.
  |
 */

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api'], function($router) {
    $router->get('/', 'HomeController@index');
    // show all
    $router->get('users', 'UsersController@index');
    // show by id
    $router->get('users/{id}', 'UsersController@show');
    // create
    $router->post('users', 'UsersController@store');
    // update
    $router->put('users/{id}', 'UsersController@update');
    // delete
    $router->delete('users/{id}', 'UsersController@destroy');
});
