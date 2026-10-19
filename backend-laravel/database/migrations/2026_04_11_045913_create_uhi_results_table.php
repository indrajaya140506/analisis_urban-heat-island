<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('uhi_results', function (Blueprint $table) {
            $table->id();

            // tahun analisis
            $table->integer('year');

            // nilai suhu LST
            $table->float('lst');

            // wilayah (opsional, misalnya Bali)
            $table->string('region')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('uhi_results');
    }
};