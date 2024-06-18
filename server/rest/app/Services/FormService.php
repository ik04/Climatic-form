<?php
namespace App\Services;

use App\Models\Applicant;
use App\Models\Project;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FormService{
   public function separateFormData($validatedData) {
    $pageData = [];
    $fileFields = [];

    $pattern = '/^(\d+)_/';

    foreach ($validatedData as $key => $value) {
        // Check if the key matches the pattern
        if (preg_match($pattern, $key, $matches)) {
            $page = $matches[1];
            $field = preg_replace($pattern, '', $key);

            // Ensure the page exists in the array
            if (!isset($pageData[$page])) {
                $pageData[$page] = [];
            }

            // Add the field to the respective page array
            if (is_array($value) && isset($value['name'], $value['type'], $value['tmp_name'], $value['error'], $value['size'])) {
                // It's a file field
                if (!isset($fileFields[$page])) {
                    $fileFields[$page] = [];
                }
                $fileFields[$page][$field] = $value;
            } else {
                // It's a normal field
                $pageData[$page][$field] = $value;
            }
        }
    }

    // Merge file fields with page data
    foreach ($fileFields as $page => $fields) {
        if (!isset($pageData[$page])) {
            $pageData[$page] = [];
        }
        $pageData[$page] = array_merge($pageData[$page], $fields);
    }
    // print_r($pageData);
    return $pageData;
}
    
public function handlePage1($page1){
    $applicant = Applicant::create([
        "name" => $page1["name"],
        "phone" => $page1["phone"],
        "email" => $page1["email"],
        "address" => $page1["address"],
        "pincode" => $page1["pincode"],
        "pan_number" => $page1["pancard_number"],
        "adhaar_number" => $page1["adhaar_number"]
    ]);
    return $applicant;
}
public function handlePage2($page2, $applicantId){
    $project = Project::create([
        "type" => $page2["project_type"],
        "capacity" => $page2["project_capacity"],
        "site_address" => $page2["project_site_address"],
        "value" => $page2["project_value"],
        "loan_amount" => $page2["loan_amount"],
        "tenure" => $page2["tenure"],
        "site_title" => $page2["project_site_title"],
        "title_document_option" => $page2["title_document_option"],
        "applicant_id" => $applicantId
    ]);
    return $project;
}

 function handleFile($file,$name,$path){
    $file = $file->file($name);
    $file_name =  time().'.'.$file->getClientOriginalExtension();
    Storage::disk($path)->put($file_name,file_get_contents($file));
    $url = Storage::url($file_name);
    return $url;
}

public function handlePage3($page3, $applicantId) {
    $pancard_copy_url =$this->handleFile($page3["pancard_copy"],"pancard_copy","public/pancards");
    $adhaar_copy_url = $this->handleFile($page3["adhaar_copy"],"adhaar_copy","public/adhaars");
    $bank_statement_url = $this->handleFile($page3["bank_statement"],"bank_statement","public/bank_statements");
    $title_document_url = $this->handleFile($page3["title_document"],"title_document","public/title_documents");
    $upload_selfie_url = $this->handleFile($page3["upload_selfie"],"upload_selfie","public/selfies");
}
}