<?php

use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return response()->json([
        'status' => 'UHI Web Backend Running',
        'api' => [
            'analyze' => '/api/uhi/analyze',
            'list' => '/api/uhi',
            'detail' => '/api/uhi/{analysis_id}'
        ]
    ]);
});
