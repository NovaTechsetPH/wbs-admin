<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackRecords extends Model
{
    use HasFactory;

    protected $table = 'track_records';

    protected $fillable = [
        'id',
        'empid',
        'timein',
        'timeout',
        'date',
        'dateout',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'empid', 'id');
    }

    public function tasks()
    {
        return $this->hasMany(RunningApps::class, 'trackid', 'id');
    }

    public function running_apps()
    {
        return $this->hasMany(RunningApps::class, 'trackid', 'id');
    }
}
