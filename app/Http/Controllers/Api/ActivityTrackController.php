<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ActivityTrackController extends Controller
{
    public function getEmployeesByTeam($team_id)
    {
        return response()->json([
            'data' => [],
            'message' => 'Employees not found',
        ], 200);
    }
}
