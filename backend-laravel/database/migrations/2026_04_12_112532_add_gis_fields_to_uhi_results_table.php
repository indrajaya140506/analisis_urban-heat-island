<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
{
    Schema::table('uhi_results', function (Blueprint $table) {

        $table->string('region_name')->nullable()->after('region');
        $table->json('polygon')->nullable()->after('region_name');
        $table->double('centroid_lat')->nullable()->after('polygon');
        $table->double('centroid_lon')->nullable()->after('centroid_lat');
        $table->string('analysis_label')->nullable()->after('centroid_lon');
    });
}
    public function down(): void
    {
        Schema::connection('uhi_web')->table('uhi_results', function (Blueprint $table) {

            $table->dropColumn([
                'region_name',
                'polygon',
                'centroid_lat',
                'centroid_lon',
                'analysis_label'
            ]);
        });
    }
};