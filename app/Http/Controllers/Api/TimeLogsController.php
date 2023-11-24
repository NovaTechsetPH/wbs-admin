<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TimeLogs;
use App\Http\Resources\TimeLogResource;
use App\Http\Requests\StoreTimeLogsRequest;
use App\Http\Requests\UpdateTimeLogsRequest;

class TimeLogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TimeLogResource::collection(TimeLogs::query()->orderBy('id', 'desc')->paginate(10));
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
    public function store(StoreTimeLogsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TimeLogs $timeLogs)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TimeLogs $timeLogs)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTimeLogsRequest $request, TimeLogs $timeLogs)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeLogs $timeLogs)
    {
        //
    }
}
