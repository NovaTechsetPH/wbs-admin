<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('temp_running_apps', function (Blueprint $table) {
            $table->id();
            $table->integer('userid');
            $table->string('description');
            $table->integer('category_id');
            $table->integer('trackid');
            $table->dateTime('start');
            $table->dateTime('end');
            $table->string('status')->default('closed');
            $table->string('platform');
            $table->string('type');
            $table->timestamps();

            $table->index(['trackid', 'userid', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temp_running_apps');
    }
};
