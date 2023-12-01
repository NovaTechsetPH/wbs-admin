<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'accounts';

    protected $fillable = [
        'id',
        'user_image',
        'first_name',
        'last_name',
        'position',
        'department',
        'username',
        'email',
        'type',
        'status',
    ];

    protected $hidden = [
        'user_image',
        'password',
    ];

    public function timeLogs()
    {
        return $this->hasMany(TimeLogs::class, 'emp_id');
    }

    public function anomalies()
    {
        return $this->hasMany(TrackRecords::class, 'userid');
    }

    public function runningapps()
    {
        return $this->hasMany(RunningApps::class, 'userid')
            ->where('date', '>=', Carbon::now()->startOfDay())
            ->where('date', '<=', Carbon::now());
    }

    /*
    public function categories()
    {
        return $this->hasMany(AppCategories::class, 'id');
    }
    */
}
