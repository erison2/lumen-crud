<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller {

    public function index() {
        $users = User::all();
        return $users;
    }

    public function show($id) {
        $user = User::findOrFail($id);
        return $user;
    }

    public function store(Request $request) {
        $user = User::create($request->all());
        return $user;
    }

    public function update(Request $request, $id) {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return $user;
    }
    
    public function destroy($id) {
        $user = User::findOrFail($id);
        $user->delete();
        return $user;
    }

}
