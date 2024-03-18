<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\Employee;
use App\Models\Position;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function register(Request $request)
    {
        // firstname,lastname,position,department,employee_id,username,email,position_id
        // $request->validate([
        //     'first_name' => 'required|string',
        //     'last_name' => 'required|string',
        //     'employee_id' => 'required|string',
        //     'position_id' => 'required|integer|exists:tblemp_positions,id,',
        //     'email' => 'required|email|string|unique:accounts,email',
        // ]);

        $position = Position::find($request->position_id);

        $user = Employee::create([
            'employee_id' => $request->employee_id,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'position_id' => $request->position_id,
            'position' => json_encode([$position->position, $position->id]),
            'username' => $request->username ?? $request->employee_id,
            'type' => 'User',
            'status' => 'Pending',
            'department' => $position->department,
            'phone_no' => $request->phone_no,
            'incremented' => 0,
            'active_status' => 'Offline',
        ]);

        $token = $user->createToken('employee')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        //$user = $request->user();
        //$user->currentAccessToken()->delete();

        $request->user()->currentAccessToken()->delete();
        //return response('', 204);

        //$user = request()->user();
        //$user->tokens()->where('id', $user->currentAccessToken()->id)->delete();

        //dd(Auth::user());
        return response()->json(['message' => 'Logout Success!'], 200);
    }

    public function forceLogout($id)
    {
        $employee = Employee::find($id);
        $employee->incremented = 0;
        $employee->active_status = 'Offline';
        $employee->save();

        return response()->json([
            'message' => 'Logout Success!'
        ], 200);
    }
}
