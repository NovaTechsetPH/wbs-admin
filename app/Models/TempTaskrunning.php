<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;

class TempTaskrunning extends Model
{
    use HasFactory;

    protected $table = 'temp_running_apps';

    protected $fillable = [
        'id',
        'empid',
        'trackid',
        'description',
        'start',
        'end',
        'status',
        'category_id',
        'platform',
        'type',
        'duration',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->timezone('Asia/Singapore')->format('m-d-y H:i:s');
    }

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
