<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DateTimeInterface;

class AppCategories extends Model
{
    use HasFactory;

    protected $table = 'app_categories';

    protected $fillable = [
        'id',
        'name',
        'description',
        'is_productive',
        'header_name',
        'icon',
        'abbreviation',
        'priority_id',
        'sync',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'sync',
        'created_at',
        'updated_at',
    ];

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->timezone('Asia/Singapore')->format('Y-m-d H:i:s');
    }

    // Define your relationships
    public function runningapps()
    {
        return $this->hasMany(RunningApps::class, 'category_id');
    }
}
