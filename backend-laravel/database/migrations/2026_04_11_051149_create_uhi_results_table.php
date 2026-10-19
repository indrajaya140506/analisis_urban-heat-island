<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('uhi_results', function (Blueprint $table) {
            $table->id();

            // grouping analisis
            $table->string('analysis_id');

            // input user
            $table->integer('start_year');
            $table->integer('end_year');

            // data hasil
            $table->integer('year');
            $table->float('lst');

            // region default
            $table->string('region')->default('bali');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('uhi_results');
    }
};