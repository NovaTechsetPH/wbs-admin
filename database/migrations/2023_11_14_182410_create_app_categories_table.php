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
        Schema::create('app_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('header_name');
            $table->enum('is_productive', ['0', '1', '2'])->default('1');
            $table->string('icon')->nullable();
            $table->string('abbreviation')->nullable();
            $table->integer('priority_id')->default(2);
            $table->boolean('sync')->default(false);
            $table->timestamps();

            $table->index('is_productive');
            $table->unique(['name', 'abbreviation']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_categories');
    }
};
