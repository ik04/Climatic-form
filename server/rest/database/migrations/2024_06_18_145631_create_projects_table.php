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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string("type");
            $table->bigInteger("capacity");
            $table->string("site_address");
            $table->bigInteger("value");
            $table->integer("tenure");
            $table->string("site_title");
            $table->string("title_document_option");
            $table->unsignedBigInteger("applicant_id");
            $table->foreign("applicant_id")->references("id")->on("applicants")->onDelete("cascade");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
