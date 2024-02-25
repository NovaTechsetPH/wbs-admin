<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RunningApps;
use App\Models\Employee;
use App\Models\Bug;
use Carbon\Carbon;
use Illuminate\Http\Request;


class ReportController extends Controller
{
    public function getBugReports()
    {
        $reports = Bug::limit(10)
            ->orderBy('id', 'desc')
            ->get();


        return response()->json(['data' => $reports], 200);
    }

    public function insertBugReports(Request $request)
    {
        $request->validate([
            'description' => 'required',
            'date_report' => 'required',
            'time_report' => 'required',
            'userid' => 'required',
        ]);

        $bug = Bug::create([
            'description' => $request->description,
            'date_report' => $request->date_report,
            'time_report' => $request->time_report,
            'userid' => $request->userid,
            'status' => $request->status ?? 'Pending',
        ]);

        return response()->json([
            'data' => $bug,
            'message' => 'Success',
        ], 201);
    }
}
