<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RunningApps extends Model
{
    use HasFactory;

    protected $table = 'tbltaskrunning';

    protected $fillable = [
        'id',
        'userid',
        'taskid',
        'description',
        'date',
        'time',
        'status',
        'category_id',
        'end_time',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    // Define your relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'userid');
    }

    public function category()
    {
        return $this->belongsTo(AppCategories::class, 'category_id', 'id');
    }
}
