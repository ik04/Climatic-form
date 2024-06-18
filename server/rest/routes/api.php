<?php

use App\Http\Controllers\FormController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/healthcheck",function(){
    return response()->json(["message" => "Hi from climatic server."],200);
});
Route::post("/test",function(Request $request){
    return response()->json(["test" => $request->all()],200);
});
Route::post("/upload",[FormController::class,"upload"]);