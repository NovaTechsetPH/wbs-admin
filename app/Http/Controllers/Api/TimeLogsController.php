<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\TimeLogs;
use App\Models\RunningApps;

use App\Http\Resources\TimeLogResource;
use App\Http\Requests\StoreTimeLogsRequest;
use App\Http\Requests\UpdateTimeLogsRequest;
use App\Models\TrackRecords;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class TimeLogsController extends Controller
{
    private $seconds_interval = 3600; // 1hr

    private $start = 0;

    private $end = 0;

    public function __construct()
    {
        date_default_timezone_set(config('app.timezone'));
    }

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

    public function redisGraphData($empid, $date = null)
    {
        $date = Carbon::parse($date) ?? Carbon::now();
        $redis_apps = Redis::hget('graph:'.$empid, $date->toDateString());

        if($redis_apps != null) {
            return response()->json([
                'redis' => 'hit',
                'data' => json_decode($redis_apps)
            ]);
        } else {
        $apps = RunningApps::with('category')
            ->where('date', $date->toDateString())
            ->where('userid', $empid)
            ->where('status', 'Closed')
            ->whereNot('end_time', null)
            ->select([
                '*',
                DB::raw("TIMESTAMPDIFF(SECOND, time, end_time) as duration"),
                DB::raw("hour(time) as hour")
            ])
            ->get();

            Redis::hset('graph:'.$empid, $date->toDateString(), $apps);
        }

        return response()->json([
            'redis' => 'miss',
            'data' => $apps,
        ]);
    }

    public function graphData($empid, $date = null)
    {
        $needles = [];

        $date = Carbon::parse($date) ?? Carbon::now();
        $is_past = Carbon::now()->startOfDay()->gt($date);

        // string
        $redis_apps = Redis::get('graph:'.$empid.':'.$date->toDateString());

        // hash
        // $redis_apps = Redis::hget('graph:'.$empid, $date->toDateString());

        if($redis_apps != "[]" && $redis_apps != null) {
            return response()->json([
                'redis' => 'hit',
                'data' => json_decode($redis_apps),
            ]);
        }

        $apps = RunningApps::with('category')
            ->where('date', $date->toDateString())
            ->where('userid', $empid)
            ->where('status', 'Closed')
            ->whereNot('end_time', null)
            ->select([
                '*',
                DB::raw("TIMESTAMPDIFF(SECOND, time, end_time) as duration"),
                DB::raw("hour(time) as hour")
            ])
            ->get();

        $data_tmp = $apps->groupBy('category.is_productive');
        $type_keys = $data_tmp->keys();

        $types_ = [
            '0' => 'unproductive',
            '1' => 'productive',
            '2' => 'neutral',
        ];

        $types = [];
        foreach ($type_keys as $t) {
            $types[$t] = $types_[$t];
        }

        foreach ($types as $int => $type) {
            $hours = [];
            $seconds = [];
            foreach ($data_tmp[(string)$int] as $item) {
                $hour_ = Carbon::parse("{$item->hour}:00:00")->format('H:i');
                if (in_array($hour_, $hours)) {
                    $seconds[$hour_] += $item->duration;
                } else {
                    $hours[] = $hour_;
                    $seconds[$hour_] = $item->duration;
                }
            }
            $needles[$type] = [
                'label' => $hours,
                'value' => array_values($seconds),
            ];
        }

        // $exp = $is_past ? -1 : 600;

        // String
        // Redis::set('graph:'.$empid.':'.$date->toDateString(), json_encode($needles), 'EX', 600);
        if($is_past) {
            // Hash
            // Redis::hset('graph:'.$empid, $date->toDateString(), json_encode($needles));
        }
        else {
            Redis::set('graph:'.$empid.':'.$date->toDateString(), json_encode($needles), 'EX', 600);
        }

        return response()->json([
            'redis' => 'miss',
            'data' => count($needles) ? $needles : [
                'productive' => [
                    'label' => [],
                    'value' => []
                ],
                'neutral' => [
                    'label' => [],
                    'value' => []
                ],
                'unproductive' => [
                    'label' => [],
                    'value' => []
                ],
            ],
        ]);
    }
}
