<?php

use App\Http\Controllers\Api\ActivityTrackController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AppCategoriesController;
use App\Http\Controllers\Api\EmployeeController;
use App\Http\Controllers\Api\RunningAppsController;
use App\Http\Controllers\Api\TimeLogsController;
use App\Models\RunningApps;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/appcategories', AppCategoriesController::class);
    Route::apiResource('/runningapps', RunningAppsController::class);
    Route::apiResource('/employees', EmployeeController::class);
    Route::apiResource('/timelogs', TimeLogsController::class);

    Route::get('/employee/{id}', [EmployeeController::class, 'getEmployeeById']);

    // Dashboard
    Route::post('/dashboard/apps', [EmployeeController::class, 'getAllDailyOpenedApps']);
    Route::get('/dashboard/workhrs/{date?}', [EmployeeController::class, 'getWorkHrs']);

    // Employees
    Route::get('/employees/absent', [EmployeeController::class, 'absent']);
    Route::get('/employees/anomaly', [EmployeeController::class, 'anomaly']);
    Route::get('/employees/runningapps', [EmployeeController::class, 'runningapps']);
    Route::post('/employees/apps', [EmployeeController::class, 'getEmployeeApps']);
    Route::post('/employees/productivity', [EmployeeController::class, 'getProductivity']);

    // Activity Tracking
    Route::get('/activity/employee/{userid}/{date?}', [ActivityTrackController::class, 'getEmployeeActivity']);
    Route::get('/activity/time-log/{userid}/{date?}', [EmployeeController::class, 'getTimeLogByEmployee']);

    // Reports & Analytics
    Route::get('/reports/attendance/{from}/{to?}', [EmployeeController::class, 'getAttendanceReport']);
    Route::get('/reports/tracking/{from}/{to?}', [EmployeeController::class, 'getTrackingReport']);
    Route::get('/reports/applications/{from}/{to?}', [EmployeeController::class, 'getApplicationReport']);

    // UserApproval
    Route::get('/userapproval', [EmployeeController::class, 'getUserForApproval']);

    // Attendance
    Route::get('/attendance/weekly/{date?}', [EmployeeController::class, 'getWeeklyAttendance']);

    Route::get('/latest', function () {
        $latest = DB::table('tblappversion')->orderBy('id', 'desc')->first();
        return response()->json([
            'data' => $latest,
            'message' => 'Success'
        ], 200);
    });

    Route::put('/record', [RunningApps::class, 'recordLog'])->name('record');
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
