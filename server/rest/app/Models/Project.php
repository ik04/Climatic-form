<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $fillable = [
        "type",
        "capacity",
        "site_address",
        "value",
        "tenure",
        "site_title",
        "title_document_option"
    ];
}
