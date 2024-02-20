<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\RunningAppsResource;

use App\Models\RunningApps;
use App\Models\Settings;

use Illuminate\Http\Request;

class RunningAppsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RunningAppsResource::collection(RunningApps::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function recordLog(Request $request)
    {
        try {
            $log = RunningApps::create([
                'userid' => $request->userid,
                'taskid' => $request->taskid,
                'description' => $request->description,
                'date' => $request->date,
                'time' => $request->time,
                'status' => $request->status,
                'category_id' => $request->category_id,
                'end_time' => $request->end_time ?? null,
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Log recorded', 'id' => $log->id], 201);
    }

    public function updateLog(Request $request)
    {
        try {
            $log = RunningApps::find($request->taskid);
            $log->end_time = $request->end_time;
            $log->status = 'Closed';
            $log->save();
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }

        // return response()->json(['message' => 'Log recorded', 'id' => $log->id], 201);
        return response()->json(['message' => 'Log updated'], 204);
    }

    public function getMinSpeed()
    {
        $up = Settings::where('type', 'UPSPEED')->first();
        $down = Settings::where('type', 'DOWNSPEED')->first();

        return response()->json([
            'data' => [
                'up' => $up->value,
                'down' => $down->value,
            ]
        ]);
    }
}
