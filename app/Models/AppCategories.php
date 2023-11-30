<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppCategories extends Model
{
    use HasFactory;

    protected $table = 'tblapp_categories';

    protected $fillable = [
        'id',
        'name',
        'description',
        'is_productive',
    ];

    // Define your relationships
    public function runningapps()
    {
        return $this->hasMany(RunningApps::class, 'category_id');
    }
}
