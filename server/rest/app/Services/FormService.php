<?php
namespace App\Services;

use App\Models\Applicant;
use App\Models\Document;
use App\Models\Project;
use App\Models\Reference;
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
    // print_r($page2);
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

public function handlePage3($page3, $applicantId) {
    $pancard_copy_url = $this->handleFile($page3['pancard_copy'], 'public/pancards');
    $adhaar_copy_url = $this->handleFile($page3['adhaar_copy'], 'public/adhaars');
    $bank_statement_url = $this->handleFile($page3['bank_statement'], 'public/bank_statements');
    $title_document_url = $this->handleFile($page3['title_document'], 'public/title_documents');
    $upload_selfie_url = $this->handleFile($page3['upload_selfie'], 'public/selfies');

    $document = Document::create([
        'pancard_copy' => $pancard_copy_url,
        'adhaar_copy' => $adhaar_copy_url,
        'bank_statement' => $bank_statement_url,
        'title_document' => $title_document_url,
        'selfie' => $upload_selfie_url,
        'applicant_id' => $applicantId,
    ]);

    return $document;
}

private function handleFile($file, $directory) {
    if ($file instanceof \Illuminate\Http\UploadedFile) {
        $path = $file->store($directory);
        return Storage::url($path);
    }
    return null;
}

public function handlePage4($page4, $applicantId){
    $reference1 = Reference::create([
        "name" => $page4["name"],
        "phone" => $page4["phone"],
        "address" => $page4["address"],
        "pincode" => $page4["pincode"],
        "applicant_id" => $applicantId
    ]);
    return $reference1;
}
public function handlePage5($page5, $applicantId){
    $reference2 = Reference::create([
        "name" => $page5["name"],
        "phone" => $page5["phone"],
        "address" => $page5["address"],
        "pincode" => $page5["pincode"],
        "applicant_id" => $applicantId
    ]);
    return $reference2;
}
}