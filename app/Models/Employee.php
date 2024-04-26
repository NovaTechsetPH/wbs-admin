<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use Carbon\Carbon;

class Employee extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'employees';

    protected $fillable = [
        'id',
        'employee_id',
        'name',
        'email',
        'password',
        'position_id',
        'department',
        'type',
        'status',
        'incremented',
        'active_status',
        'site',
        'auth_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'user_image',
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function anomalies()
    {
        return $this->hasMany(TrackRecords::class, 'empid');
    }

    public function runningapps()
    {
        return $this->hasMany(RunningApps::class, 'empid');
    }

    public function getFullNameAttribute()
    {
        // return $this->first_name . ' ' . $this->last_name;
        return $this->name;
    }

    public function position()
    {
        return $this->belongsTo(Position::class, 'position_id');
    }
}
