<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $fillable = [
        "adhaar_copy",
        "pancard_copy",
        "bank_statement",
        "title_document",
        "selfie",
        "applicant_id"
    ];
}
