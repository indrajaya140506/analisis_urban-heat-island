<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UhiResult extends Model
{
    protected $table = 'uhi_results';

    protected $fillable = [
        'analysis_id',
        'start_year',
        'end_year',
        'year',
        'lst',
        'region',
        'region_name',
        'polygon',
    ];

    protected $casts = [
        'polygon' => 'array',
    ];
}