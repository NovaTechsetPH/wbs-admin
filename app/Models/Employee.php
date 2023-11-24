<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function timeLogs()
    {
        return $this->hasMany(TimeLogs::class, 'emp_id');
    }

    public function anomalies()
    {
        return $this->hasMany(TrackRecord::class, 'userid');
    }
}
