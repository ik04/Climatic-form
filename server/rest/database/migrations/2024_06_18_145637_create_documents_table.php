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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string("adhaar_copy");
            $table->string("pancard_copy");
            $table->string("bank_statement");
            $table->string("title_document");
            $table->string("selfie");
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
        Schema::dropIfExists('documents');
    }
};
