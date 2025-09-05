<?php

use App\Http\Controllers\AuhController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuhController::class, 'register']);
Route::post('/login', [AuhController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/products', [ProductController::class, 'index']);

    Route::middleware('admin')->group(function () {
        Route::post('/products', [ProductController::class, 'store']);
    });

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
});

