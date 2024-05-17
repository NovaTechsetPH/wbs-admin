<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestApproval extends Model
{

    public $timestamps = false;

    use HasFactory;

    protected $table = 'request_approval';

    protected $fillable = [
        'id',
        'userid',
        'managerid',
        'description',
        'status',
        'start_time',
        'end_time',
        'date',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'userid', 'id');
    }

    public function manager_teams()
    {
        return $this->hasMany(ManagerTeam::class, 'managerid', 'manager_id');
    }
}
