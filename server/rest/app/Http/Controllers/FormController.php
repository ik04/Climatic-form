<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubmitFormDataRequest;
use App\Services\FormService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FormController extends Controller
{
    public function __construct(protected FormService $service)
    {
        
    }
    public function submit(SubmitFormDataRequest $request){
        $validated = $request->validated();
        $pageData = $this->service->separateFormData($validated);
        $applicant = $this->service->handlePage1($pageData[1]);
        $project = $this->service->handlePage2($pageData[2],$applicant->id);
        $document = $this->service->handlePage3($pageData[3],$applicant->id);
        $reference1 = $this->service->handlePage4($pageData[4],$applicant->id);
        $reference2 = $this->service->handlePage4($pageData[5],$applicant->id);
        return response()->json(["message" => "Form Submitted!","data" => $validated]);
    }
}
