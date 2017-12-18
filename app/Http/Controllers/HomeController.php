<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class HomeController extends Controller {

    public function index() {
        $name = 'Bem Vindo Erison!!!';
        return view('home', ['n'=> $name ]);
    }

}
