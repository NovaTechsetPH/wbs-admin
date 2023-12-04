<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\AppCategoriesResource;
use App\Http\Resources\EmployeeResource;
use App\Models\AppCategories;
use App\Models\RunningApps;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EmployeeResource::collection(Employee::query()->orderBy('id', 'desc')->paginate(10));
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
        $date = $request->date ? Carbon::parse($request->date) : Carbon::now();

        $employees = Employee::whereHas('runningapps', function ($query) {
            $query->where('date', '>=', $date->startOfDay())
                ->where('date', '<=', $date);
        })->orderBy('id', 'desc')->get();

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
        $date = Carbon::parse($request->date) ?? Carbon::now();

        $productivity = [0, 0];
        $categories_data = AppCategories::all();
        $appCategories = [];
        foreach ($categories_data as $category) {
            $appCategories[$category->id] = $category;
        }
        $start_time = DB::table('tbltaskrunning')
            ->select(DB::raw('HOUR(time) AS start_time'))
            ->where('date', '>=', $date->startOfDay())
            ->where('date', '<=', $date)
            ->orderBy('time')
            ->limit(1)
            ->get();

        if (count($start_time) > 0) {
            foreach ($start_time as $start) {
                $productivity[0] = $start->start_time;
                $productivity[1] = $start->start_time + 9;
            }
        } else {
            $start = date('H');
            $productivity[0] = $start;
            $productivity[1] = $start + 9;
        }

        for ($i = $productivity[0]; $i <= $productivity[1]; $i++) {
            $categories[$i]['unproductive'] = 0;
            $categories[$i]['productive'] = 0;
            $categories[$i]['neutral'] = 0;
            //DB::connection()->enableQueryLog();
            $runningapps = DB::table('tbltaskrunning')
                ->select(
                    'userid',
                    'category_id',
                    DB::raw('SUM(HOUR(SUBTIME(IF(ISNULL(end_time), CURRENT_TIME, end_time), `time`))) / COUNT(userid) AS usage_time')
                )
                ->where('time', '>=', $i . ':00:00')
                ->where('time', '<=', $i . ':59:59')
                ->where('date', '>=', $date->startOfDay())
                ->where('date', '<=', $date)
                ->groupBy('userid', 'category_id')
                ->get();
            //$queries = DB::getQueryLog();
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
}
