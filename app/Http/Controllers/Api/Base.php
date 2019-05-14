<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class Base extends Controller
{
    protected $global = [];

    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            return $next($request);
        });
    }

}