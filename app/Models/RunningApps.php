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
    ];

    // Define your relationships
    public function employee()
    {
        return $this->belongsTo(Employee::class, 'id');
    }

    public function category()
    {
        return $this->belongsTo(AppCategories::class, 'category_id', 'id');
    }
}
