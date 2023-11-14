<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RunningApps extends Model
{
    use HasFactory;

    protected $table = 'running_apps';

    protected $fillable = [
        'id',
        'task_name',
        'category_id',
        'taskid',
        'userid',
        'time',
        'date',
    ];


    // public function bet()
    // {
    //     return $this->hasMany(Bet::class, 'fight_id');
    // }

    // public function bet_legit_meron()
    // {
    //     return $this->hasMany(Bet::class, 'fight_id')
    //         ->whereNotIn('user_id', [9])
    //         ->where('side', 'M');
    // }

    // public function bet_legit_wala()
    // {
    //     return $this->hasMany(Bet::class, 'fight_id')
    //         ->whereNotIn('user_id', [9])
    //         ->where('side', 'W');
    // }

    // public function event()
    // {
    //     return $this->belongsTo(DerbyEvent::class, 'event_id');
    // }
}
