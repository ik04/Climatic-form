<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubmitFormDataRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request_
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            '1_name' => ['required', 'string', 'min:1'],
            '1_phone' => ['required', 'string', 'min:1'],
            '1_email' => ['required', 'email'],
            '1_address' => ['required', 'string', 'min:1'],
            '1_pincode' => ['required', 'numeric', 'min:1'],
            '1_pancard_number' => ['required', 'numeric', 'min:1'],
            '1_adhaar_number' => ['required', 'numeric', 'min:1'],

            '2_project_type' => ['required', 'string', 'in:Residential,C&I'],
            '2_project_capacity' => ['required', 'numeric', 'min:1'],
            '2_project_site_address' => ['required', 'string', 'min:1'],
            '2_project_value' => ['required', 'numeric', 'min:1'],
            '2_loan_amount' => ['required', 'numeric', 'min:1'],
            '2_tenure' => ['required', 'string', 'in:1,2,3,4,5'],
            '2_project_site_title' => ['required', 'string', 'in:owned,rented'],
            '2_title_document_option' => ['required', 'string', 'in:ownership_documents_owned,rent_agreement_rented'],

            '3_pancard_copy' => ['required', 'file'],
            '3_adhaar_copy' => ['required', 'file'],
            '3_bank_statement' => ['required', 'file'],
            '3_title_document' => ['required', 'file'],
            '3_upload_selfie' => ['required', 'file'],

            '4_name' => ['required', 'string', 'min:1'],
            '4_phone' => ['required', 'numeric', 'min:1'],
            '4_address' => ['required', 'string', 'min:1'],
            '4_pincode' => ['required', 'numeric', 'min:1'],

            '5_name' => ['required', 'string', 'min:1'],
            '5_phone' => ['required', 'numeric', 'min:1'],
            '5_address' => ['required', 'string', 'min:1'],
            '5_pincode' => ['required', 'numeric', 'min:1'],
        ];
    }
}
