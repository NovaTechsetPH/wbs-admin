<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Http\Resources\AppCategoriesResource;
use App\Http\Resources\EmployeeResource;
use App\Models\AppCategories;
use App\Models\ManagerTeam;
use App\Models\Position;
use App\Models\RunningApps;
use App\Models\Team;
use App\Models\TrackRecords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($teamid = null)
    {
        // return EmployeeResource::collection(Employee::query()->orderBy('id', 'desc')->paginate(10));

        // $employees = Employee::where('status', 'Approved')
        //     ->whereIn('id', function ($query) {
        //         $query->select('userid')
        //             ->from('tbltaskrunning')
        //             ->distinct()
        //             ->get();
        //     })->get();

        $employees = Auth::user()->positions()->with('employees')->get()->pluck('employees')->flatten();

        $data = [];
        foreach ($employees as $key => $emp) {
            $last_activity = RunningApps::where('userid', $emp->id)
                ->orderBy('id', 'desc')
                ->first();
            $emp->last_activity = $last_activity;
            $data[] = $emp;
        }

        return response()->json([
            'data' => $data,
            'message' => 'Successfully retrieved all employees',
        ], 200);
    }

    public function getEmployeesStatus($teamid = null)
    {
        $positions = Position::where('team_id', $teamid)->get();
        $data = [];
        foreach ($positions as $position) {
            for ($i = 0; $i < count($position->employees); $i++) {
                array_push($data, $position->employees[$i]);
            }
        }

        return response()->json([
            'data' => $data,
            'message' => 'Successfully retrieved all employees',
        ], 200);
    }

    public function getImageById($id)
    {
        $employee = Employee::find($id);
        return response()->make($employee->user_image)
            ->header('Content-Type', 'image/jpeg')
            ->header('Cache-Control', 'max-age=31536000');
    }

    public function getEmployeeById($id)
    {
        $employee = Employee::find($id);
        return response()->json([
            'data' => $employee,
            'message' => 'Success'
        ], 200);
    }

    public function getTeams()
    {
        $manager_teams = ManagerTeam::where('manager_id', Auth::user()->id)->get();
        $teams = [];
        foreach ($manager_teams as $team) {
            $teams[] = Team::find($team->team_id);
        }

        return response()->json([
            'data' => $teams,
            'message' => 'Success'
        ], 200);
    }

    public function getEmployeesByTeam($id)
    {
        $positions = Position::where('team_id', $id)->get();
        $employees = [];
        foreach ($positions as $postion) {
            foreach ($postion->employees as $emps) {
                $last_activity = RunningApps::where('userid', $emps->id)
                    ->orderBy('id', 'desc')
                    ->first();

                $emps->last_activity = $last_activity;
                array_push($employees, $emps);
            }
        }
        return response()->json([
            'data' => $employees,
            'message' => 'Success'
        ], 200);
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
        $input = $request->all();

        /*
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        */

        $employee = Employee::create($input);

        return $this->sendResponse(new EmployeeResource($employee), 'Employee Created Successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return new EmployeeResource(Employee::findOrFail($id));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
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

    /**
     * Display a listing of the employee resource absent.
     */
    public function absent()
    {
        // Get employees who are absent based on the absence of time logs
        $absentEmployees = Employee::whereDoesntHave('timeLogs', function ($query) {
            $query->where('created_at', '>=', now()->startOfDay())
                ->where('created_at', '<=', now()->endOfDay());
        })->orderBy('id', 'desc')->paginate(10);

        return EmployeeResource::collection($absentEmployees);
    }

    /**
     * Display a listing of the employee resource anomaly.
     */
    /*public function anomaly()
    {
        // Get employees who are absent based on the absence of time logs
        $anomalyEmployees = Employee::whereHas('anomalies', function ($query) {
            $query->where('action', 'IN')
                ->whereNotExists(function ($subQuery) {
                    $subQuery->select('id')
                        ->from('tbltime_logs as tl2')
                        ->whereRaw('tl2.emp_id = tbltime_logs.emp_id')
                        ->where('tl2.action', 'OUT')
                        ->whereRaw('DATE(tl2.created_at) = DATE(tbltime_logs.created_at)');
                })
                ->where('created_at', '>=', Carbon::now()->startOfMonth())
                ->where('created_at', '<=', Carbon::now()->subDays(1));
        })->orderBy('id', 'desc')->paginate(10);

        return EmployeeResource::collection($anomalyEmployees);
    }*/

    public function anomaly()
    {
        // Get employees who are anomaly based on the dateout of null time logs
        $anomalyEmployees = Employee::whereHas('anomalies', function ($query) {
            $query->whereNull('dateout')
                ->where('datein', '>=', Carbon::now()->startOfMonth())
                ->where('datein', '<=', Carbon::now()->subDays(1));
        })->orderBy('id', 'desc')->paginate(10);

        return EmployeeResource::collection($anomalyEmployees);
    }

    public function runningapps()
    {
        // Get employees productivity based on average
        $runningapps = Employee::whereHas('runningapps', function ($query) {
            $query->where('date', '>=', Carbon::now()->startOfDay())
                ->where('date', '<=', Carbon::now());
        })->orderBy('id', 'desc')->paginate(10);

        return EmployeeResource::collection($runningapps);
    }

    public function categories()
    {
        $categories = AppCategories::all();
        return AppCategoriesResource::collection($categories);
    }

    public function getEmployeeApps(Request $request)
    {
        $userid = '';
        $date = Carbon::now()->format('Y-m-d');
        if ($request->has('userid')) {
            $userid = $request->input('userid');
        }
        if ($request->has('date')) {
            $date = Carbon::createFromFormat('Y-m-d', $request->input('date'))->format('Y-m-d');
        }

        $employees = Employee::whereHas('runningapps', function ($query) use ($date) {
            $query->where('date', '=', $date);
        });
        if ($userid != '') {
            $employees->where('id', $userid);
        }
        $employees = $employees->orderBy('id', 'desc')->get();
        $categories_data = AppCategories::all();
        $appCategories = [];
        foreach ($categories_data as $category) {
            $appCategories[$category->id] = $category;
        }

        foreach ($employees as $key => $emp) {
            $categories['unproductive'] = [];
            $categories['productive'] = [];
            $categories['neutral'] = [];
            foreach ($emp->runningapps as $app) {
                $app['epoch'] = Carbon::createFromFormat('Y-m-d H:i:s', $app->date . ' ' . $app->time)->timestamp;
                //$app['original'] = Carbon::createFromTimestamp($app['epoch'])->toDateTimeString();
                if (array_key_exists($app->category_id, $appCategories)) {
                    $category = $appCategories[$app->category_id];
                    $app['category'] = $category;
                    if ($category->is_productive == 0) {
                        $categories['unproductive'][] = $app;
                    } else if ($category->is_productive == 1) {
                        $categories['productive'][] = $app;
                    } else {
                        $categories['neutral'][] = $app;
                    }
                } else {
                    $categories['unproductive'][] = $app;
                }
            }
            $employees[$key]->offsetUnset('runningapps');
            $employees[$key]['runningapps'] = $categories;
        }

        return response()->json([
            'data' => $employees,
            'message' => 'Success'
        ], 200);
    }

    public function getProductivity(Request $request)
    {
        $userid = '';
        $date = Carbon::now()->format('Y-m-d');
        if ($request->has('userid')) {
            $userid = $request->input('userid');
        }
        if ($request->has('date')) {
            // $date = Carbon::createFromFormat('Y-m-d', $request->date)->format('Y-m-d');
            $date = Carbon::parse($request->date)->format('Y-m-d');
        }

        $productivity = [0, 0];
        $categories_data = AppCategories::all();
        $appCategories = [];
        foreach ($categories_data as $category) {
            $appCategories[$category->id] = $category;
        }
        //DB::connection()->enableQueryLog();
        $queries = DB::table('tbltaskrunning');
        $queries->select(DB::raw('HOUR(time) AS start_time'));
        if ($userid != '') {
            $queries->where('userid', $userid);
        }
        $queries->where('date', '=', $date)
            ->orderBy('time')
            ->limit(1);
        $start_time = $queries->get();
        //$queries = DB::getQueryLog();
        //print_r($queries);

        if (count($start_time) > 0) {
            foreach ($start_time as $start) {
                $productivity[0] = $start->start_time;
                $end = $start->start_time + 9;
                if ($end > 24) {
                    $end = $end - 24;
                }
                $current = date('H');
                if ($current > $end) {
                    $end = $current;
                }
                $productivity[1] = $end;
            }
        } else {
            $start = date('H');
            $productivity[0] = $start;
            $end  = $start + 9;
            if ($end > 24) {
                $end = $end - 24;
            }
            $productivity[1] = $start + 9;
        }

        for ($i = $productivity[0]; $i <= $productivity[1]; $i++) {
            $categories[$i]['unproductive'] = 0;
            $categories[$i]['productive'] = 0;
            $categories[$i]['neutral'] = 0;
            DB::connection()->enableQueryLog();
            $runningapps = DB::table('tbltaskrunning');
            $runningapps->select(
                'userid',
                'category_id',
                DB::raw('SUM(HOUR(SUBTIME(IF(ISNULL(end_time), CURRENT_TIME, end_time), `time`))) / COUNT(userid) AS usage_time')
            );
            if ($userid != '') {
                $runningapps->where('userid', $userid);
            }
            $runningapps = $runningapps->where('time', '>=', $i . ':00:00')
                ->where('time', '<=', $i . ':59:59')
                ->where('date', '=', $date)
                ->groupBy('userid', 'category_id')
                ->get();
            $queries = DB::getQueryLog();
            //print_r($queries);

            foreach ($runningapps as $key => $app) {

                if (array_key_exists($app->category_id, $appCategories)) {
                    $category = $appCategories[$app->category_id];
                    if ($category->is_productive == 0) {
                        $categories[$i]['unproductive'] += $app->usage_time;
                    } else if ($category->is_productive == 1) {
                        $categories[$i]['productive'] += $app->usage_time;
                    } else {
                        $categories[$i]['neutral'] += $app->usage_time;
                    }
                } else {
                    $categories[$i]['unproductive'] += $app->usage_time;
                }
            }
        }

        return response()->json([
            'data' => $categories,
            'message' => 'Success'
        ], 200);
    }

    public function getAllDailyOpenedApps(Request $request)
    {
        $date = $request->date ?? Carbon::now()->toDateString();
        // $emps_under = Auth::user()->positions()->with('employees')->get()
        //     ->pluck('employees')->flatten()->pluck('id')->toArray();

        $positions = Position::where('team_id', $request->teamId)->get();
        $emps_under = [];
        foreach ($positions as $position) {
            foreach ($position->employees as $emps) {
                array_push($emps_under, $emps->id);
            }
        }

        $apps = RunningApps::with('employee', 'category')
            ->where('date', Carbon::parse($date)->toDateString())
            ->whereColumn('time', '<', 'end_time')
            ->whereIn('userid', $emps_under)
            ->orderBy('id', 'asc')
            ->get();

        return response()->json([
            'date' => $date,
            'data' => $apps ?? [],
            'message' => 'Success'
        ], 200);
    }

    public function getUserForApproval()
    {
        try {
            $emps_under = Auth::user()->positions()->with('employees')->get()
                ->pluck('employees')->flatten()->pluck('id')->toArray();
            $users = Employee::whereIn('id', $emps_under)
                ->whereIn('status', ['Pending', 'Rejected'])
                ->orderBy('id', 'desc')->get();
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], 500);
        }
        return response()->json([
            'data' => $users ?? [],
            'message' => 'Success'
        ], 200);
    }

    public function getWorkHrs($date = null, $teamid = null)
    {
        try {
            // $emps_under = Auth::user()->positions()->with('employees')->get()
            //     ->pluck('employees')->flatten()->pluck('id')->toArray();

            $positions = Position::where('team_id', $teamid)->get();
            $emps_under = [];
            foreach ($positions as $position) {
                foreach ($position->employees as $emps) {
                    array_push($emps_under, $emps->id);
                }
            }

            $date = $date ?? Carbon::now()->toDateString();
            $work_hrs = TrackRecords::with('employee')
                ->whereIn('userid', $emps_under)
                ->where('datein', Carbon::parse($date)->toDateString())
                ->get();

            $data = [];
            $endest = '23:59:59';
            foreach ($work_hrs as $track) {
                if ($track->timeout != null && ($track->timein > $track->timeout)) {
                    $track->timeout = $endest;

                    $tmp = TrackRecords::find($track->id);
                    $tmp->timeout = $endest;
                    $tmp->dateout = Carbon::parse($date)->toDateString();
                    $tmp->save();
                }

                $data[] = $track;
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $work_hrs ?? [],
            'message' => count($work_hrs) > 0 ? 'Success' : 'Employee not found',
            'total' => count($emps_under),
            'emps' => $emps_under
        ], 200);
    }

    public function getTimeLogByEmployee($id, $date = null)
    {
        try {
            $date = $date ?? Carbon::now()->toDateString();
            $track_records = TrackRecords::with('employee')
                ->where('userid', $id)
                ->where('datein', Carbon::parse($date)->toDateString())
                ->get();

            $work_hrs = $track_records->first();
            if (count($track_records) > 1) {
                $work_hrs->timeout = $track_records->last()->timeout;
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $work_hrs ?? [],
            'message' => $work_hrs ? 'Success' : 'Employee not found',
        ]);
    }

    public function getAttendanceReport($from, $to = null)
    {
        try {
            $from = $from ?? Carbon::now()->toDateString();
            $to = $to ?? Carbon::now()->toDateString();
            $work_hrs = TrackRecords::with('employee')
                ->whereIn('userid', request('employees'))
                ->whereBetween('datein', [$from, $to])
                ->get();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $work_hrs ?? [],
            'message' => count($work_hrs) > 0 ? 'Success' : 'Records not found',
        ]);
    }

    public function getTrackingReport($from, $to = null)
    {
        try {
            $from = Carbon::parse($from)->toDateString();
            $to = $to ?? Carbon::now()->toDateString();
            $track_data = TrackRecords::with([
                'employee',
                'tasks' => function ($query) {
                    $query->select([
                        '*', DB::raw("TIMESTAMPDIFF(SECOND, time, end_time) as duration"),
                    ]);
                },
                'tasks.category',
            ])
                ->whereIn('userid', request('employees'))
                ->whereBetween('datein', [$from, $to])
                ->get();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $track_data ?? [],
            'message' => count($track_data) > 0 ? 'Success' : 'Records not found',
            'count' => $track_data->count(),
        ]);
    }

    public function getApplicationReport($from, $to = null)
    {
        try {
            $from = Carbon::parse($from)->toDateString();
            $to = $to ?? Carbon::now()->toDateString();
            $work_hrs = RunningApps::with('category', 'employee')
                ->whereBetween('date', [$from, $to])
                ->whereIn('userid', request('employees'))
                ->where('status', 'Closed')
                ->select(['*', DB::raw("TIMESTAMPDIFF(SECOND, time, end_time) as duration")])
                ->get();

            $data = $work_hrs->groupBy('userid');
            $items = [];
            foreach (request('employees') as $emps) {
                if (!isset($data[$emps])) continue;
                $items[] = [
                    'userid' => $emps,
                    'info' => $data[$emps]->groupBy('category.header_name')
                ];
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $items ?? [],
            // 'data' => $work_hrs ?? [],
            // 'message' => count($work_hrs) > 0 ? 'Success' : 'Records not found',
        ]);
    }

    public function getWeeklyAttendance($date = null, $teamid = null)
    {
        try {
            $date = Carbon::parse($date) ?? Carbon::now();
            $day_of_week = Carbon::parse($date)->dayOfWeek;
            $date_from = Carbon::parse($date)->subDays($day_of_week);
            $date_to = Carbon::parse($date)->addDays(6 - $day_of_week);
            $positions = Position::where('team_id', $teamid)->get();
            $employees = [];
            $ids = [];
            foreach ($positions as $position) {
                foreach ($position->employees as $emps) {
                    array_push($employees, $emps);
                    array_push($ids, $emps->id);
                }
            }

            // Get employees weekly attendance
            $attendance = TrackRecords::with('employee')
                ->whereIn('userid', $ids)
                ->whereBetween('datein', [$date_from->toDateString(), $date_to->toDateString()])
                ->get();
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $attendance ?? [],
            'message' => count($attendance) > 0 ? 'Success' : 'Records not found',
            'range' => [
                'from' => $date_from->toDateString(),
                'to' => $date_to->toDateString()
            ],
            'employees' => $employees,
        ]);
    }

    public function getInfoByEmployeeId($empid)
    {
        try {
            $employee = Employee::where('employee_id', $empid)->first();
            if (!$employee)
                return response()->json([
                    'message' => 'Employee not found',
                ], 404);

            if($employee->id === 0 )
                throw new \Exception('Employee not found');

        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ], 500);
        }

        return response()->json([
            'data' => $employee ?? null,
            'message' => $employee ? 'Success' : 'Records not found',
        ], 200);
    }

    public function getEmployeeLog($empid, $date = null, $category_id = [])
    {
        try {
            $date = Carbon::parse($date) ?? Carbon::now();

            // $employee = Employee::find($empid);
            if (!$empid)
                throw new \Exception('Employee not found 1');

            $employee = Employee::where('employee_id', $empid)->first();
            if (!$employee)
                throw new \Exception('Employee ID ' . $empid . ' not found');

            $log = RunningApps::where('userid', $employee->id)
                ->where('date', $date->toDateString());

            if (count($category_id) > 0)
                $log = $log->whereIn('category_id', $category_id);

            $start = $log->first();

            $end = $log->whereNot('end_time', null)
                ->orderBy('id', 'desc')
                ->first();
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ];
        }

        return !$start && !$end ? [] : [
            'start' => $start,
            'end' => $end,
            'date' => $date->toDateString(),
        ];
    }

    public function getEmployeeActivity($empid, $date = null)
    {
        try {
            $categories = AppCategories::all();
            $all = $this->getEmployeeLog($empid, $date);
            $productive = $this->getEmployeeLog($empid, $date, $categories->where('is_productive', 1)->pluck('id')->toArray());
            $unproductive = $this->getEmployeeLog($empid, $date, $categories->where('is_productive', 0)->pluck('id')->toArray());
            $neutral = $this->getEmployeeLog($empid, $date, [6]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Internal Server Error!',
            ]);
        }

        return response()->json([
            'data' => [
                'all' => $all,
                'productive' => $productive,
                'unproductive' => $unproductive,
                'neutral' => $neutral
            ]
        ]);
    }
}
