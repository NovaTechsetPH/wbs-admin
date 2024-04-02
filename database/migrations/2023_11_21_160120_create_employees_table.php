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
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id');
            $table->string('name')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('position_id');
            $table->string('department');
            $table->binary('user_image')->nullable();
            $table->enum('type', ['user', 'admin'])->default('user');
            $table->string('status', ['approved', 'pending', 'denied', 'resigned'])->default('pending');
            $table->integer('incremented');
            $table->string('active_status')->default('offline');
            $table->enum('site', ['dumaguete', 'chennai'])->default('dumaguete');
            $table->rememberToken();
            $table->timestamps();

            $table->unique('employee_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
