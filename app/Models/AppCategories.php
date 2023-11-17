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
        'task_name',
        'category_id',
        'taskid',
        'userid',
        'time',
        'date',
    ];
}
