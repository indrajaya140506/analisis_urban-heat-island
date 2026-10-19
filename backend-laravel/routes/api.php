<?php

use Illuminate\Support\Facades\Route; 
use App\Http\Controllers\UhiController;


Route::post('/uhi/analyze', [UhiController::class, 'analyze']);


Route::get('/uhi', [UhiController::class, 'index']);


Route::get('/uhi/history', [UhiController::class, 'history']);


Route::get('/uhi/{analysis_id}', [UhiController::class, 'show']);


Route::delete('/uhi/{analysis_id}', [UhiController::class, 'destroy']);

