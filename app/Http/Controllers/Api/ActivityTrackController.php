<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RunningApps;
use Carbon\Carbon;
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

    public function getEmployeeActivity($userid, $date = null)
    {
        try {
            $date = $date ?? Carbon::now()->toDateString();
            $apps = RunningApps::with('employee', 'category')
                ->where('date', Carbon::parse($date)->toDateString())
                ->where('userid', $userid)
                ->whereNot('end_time', NULL)
                ->orderBy('id', 'asc')
                ->get();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $apps ?? [],
            'message' => count($apps) > 0 ? 'Success' : 'Employee not found',
        ], 200);
    }
}
