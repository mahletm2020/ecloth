<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Only admin can manage products
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);
});

// Both admin and user can view products
Route::middleware(['auth:sanctum', 'role:admin,user'])->group(function () {
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
});

// Profile route
Route::middleware('auth:sanctum')->get('/auth/profile', function (Request $request) {
    return response()->json($request->user());
});


//     Route::get('/orders', [OrderController::class, 'index']);
//     Route::post('/orders', [OrderController::class, 'store']);
// });

