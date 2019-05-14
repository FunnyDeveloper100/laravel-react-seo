<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Test extends Controller
{
    public function getPosts()
    {
        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'posts' => [
                ['id' => 1, 'title' => 'Test 1'],
                ['id' => 2, 'title' => 'Test 2'],
                ['id' => 3, 'title' => 'Test 3'],
                ['id' => 4, 'title' => 'Test 4'],
                ['id' => 5, 'title' => 'Test 5']
            ]
        ]);
    }

    public function getPost(Request $request, $id)
    {
        if ($request->isMethod('post')) {
            return response()->json([
                'status' => 200,
                'message' => 'Success'
            ]);
        }

        $data = [
            1 => ['id' => 1, 'title' => 'Test 1'],
            2 => ['id' => 2, 'title' => 'Test 2'],
            3 => ['id' => 3, 'title' => 'Test 3'],
            4 => ['id' => 4, 'title' => 'Test 4'],
            5 => ['id' => 5, 'title' => 'Test 5']
        ];

        $info = !empty($data[$id]) ? $data[$id] : '';

        return response()->json([
            'status' => 200,
            'message' => 'Success',
            'info' => $info
        ]);
    }
}