<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UhiResult;
use Illuminate\Support\Facades\Http;

class UhiController extends Controller
{
    
    public function index()
    {
        return response()->json(UhiResult::latest()->get());
    }

   
    public function history()
    {
        return response()->json(
            UhiResult::select(
                'analysis_id',
                'start_year',
                'end_year',
                'region_name',
                'created_at'
            )
            ->groupBy(
                'analysis_id',
                'start_year',
                'end_year',
                'region_name',
                'created_at'
            )
            ->orderBy('created_at', 'desc')
            ->get()
        );
    }

  
    public function show($analysis_id)
    {
        return response()->json(
            UhiResult::where('analysis_id', $analysis_id)
                ->orderBy('year', 'asc')
                ->get()
        );
    }

  
    public function analyze(Request $request)
    {
        $request->validate([
            'start_year' => 'required|integer',
            'end_year' => 'required|integer',
            'coordinates' => 'nullable|array',
        ]);

        $analysisId = 'UHI_' . time();

       
        $response = Http::timeout(120)->post(
            'http://127.0.0.1:5000/api/uhi',
            [
                'start_year' => $request->start_year,
                'end_year' => $request->end_year,
                'coordinates' => $request->coordinates,
            ]
        );

        $data = $response->json();

        if (!$response->successful()) {
            return response()->json([
                "error" => "FLASK ERROR",
                "body" => $response->body()
            ], 500);
        }

        if (!isset($data['chart']) || !isset($data['tile'])) {
            return response()->json([
                "error" => "RESPONSE FLASK TIDAK LENGKAP",
                "data" => $data
            ], 500);
        }

   
        foreach ($data['chart'] as $item) {
            UhiResult::create([
                'analysis_id' => $analysisId,
                'start_year' => $request->start_year,
                'end_year' => $request->end_year,
                'year' => $item['year'],
                'lst' => $item['lst'],
                'region' => 'bali',
                'region_name' => $data['region'] ?? 'Unknown Region',
                'polygon' => $request->coordinates ?? null,
            ]);
        }

        return response()->json([
            'analysis_id' => $analysisId,
            'region_name' => $data['region'] ?? 'Bali',
            'chart' => $data['chart'],
            'tile' => $data['tile']
        ]);
    }
    public function destroy($analysis_id)
    {
        UhiResult::where('analysis_id', $analysis_id)->delete();

        return response()->json([
            'message' => 'Deleted successfully',
            'analysis_id' => $analysis_id
        ]);
    }
}