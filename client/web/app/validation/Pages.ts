import { z } from "zod";

// Schema for Page 1: Applicants Details
export const page1 = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .refine((value) => value.trim() !== "", "Name is required"),
  phone: z
    .string()
    .nonempty("Phone number is required")
    .refine((value) => value.trim() !== "", "Phone number is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  address: z
    .string()
    .nonempty("Address is required")
    .refine((value) => value.trim() !== "", "Address is required"),
  pincode: z
    .number()
    .positive("Pincode is required")
    .refine((value) => value !== 0, "Pincode is required"),
  pancard_number: z
    .number()
    .positive("Pancard number is required")
    .refine((value) => value !== 0, "Pancard number is required"),
  adhaar_number: z
    .number()
    .positive("Adhaar number is required")
    .refine((value) => value !== 0, "Adhaar number is required"),
});

// Schema for Page 2: Project Details
export const page2 = z.object({
  project_type: z.enum(["Residential", "C&I"]),
  project_capacity: z
    .number()
    .positive("Project Capacity is required")
    .refine((value) => value !== 0, "Project Capacity is required"),
  project_site_address: z
    .string()
    .nonempty("Project site address is required")
    .refine((value) => value.trim() !== "", "Project site address is required"),
  project_value: z
    .number()
    .positive("Project value is required")
    .refine((value) => value !== 0, "Project value is required"),
  loan_amount: z
    .number()
    .positive("Loan amount is required")
    .refine((value) => value !== 0, "Loan amount is required"),
  tenure: z.enum(["1", "2", "3", "4", "5"]),
  project_site_title: z.enum(["owned", "rented"]),
  title_document_option: z.enum([
    "ownership_documents_owned",
    "rent_agreement_rented",
  ]),
});

// Schema for Page 3: Documents Upload

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
const allowedDocumentTypes = ["application/pdf", ...allowedImageTypes];

export const page3 = z.object({
  pancard_copy: z
    .any()
    .refine((file) => file && file.name.length > 0, "Pancard copy is required")
    .refine(
      (file) => allowedDocumentTypes.includes(file.type),
      "Pancard copy must be a PDF or image"
    ),
  adhaar_copy: z
    .any()
    .refine((file) => file && file.name.length > 0, "Adhaar copy is required")
    .refine(
      (file) => allowedDocumentTypes.includes(file.type),
      "Adhaar copy must be a PDF or image"
    ),
  bank_statement: z
    .any()
    .refine(
      (file) => file && file.name.length > 0,
      "Bank statement is required"
    )
    .refine(
      (file) => allowedDocumentTypes.includes(file.type),
      "Bank statement must be a PDF or image"
    ),
  title_document: z
    .any()
    .refine(
      (file) => file && file.name.length > 0,
      "Title document is required"
    )
    .refine(
      (file) => allowedDocumentTypes.includes(file.type),
      "Title document must be a PDF or image"
    ),
  upload_selfie: z
    .any()
    .refine((file) => file && file.name.length > 0, "Selfie upload is required")
    .refine(
      (file) => allowedImageTypes.includes(file.type),
      "Selfie must be an image (JPEG, PNG, GIF)"
    ),
});

// Schema for Page 4: Reference Details (Reference 1)
export const page4 = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .refine((value) => value.trim() !== "", "Name is required"),
  phone: z
    .number()
    .positive("Phone number is required")
    .refine((value) => value !== 0, "Phone number is required"),
  address: z
    .string()
    .nonempty("Address is required")
    .refine((value) => value.trim() !== "", "Address is required"),
  pincode: z
    .number()
    .positive("Pincode is required")
    .refine((value) => value !== 0, "Pincode is required"),
});

// Schema for Page 5: Reference Details (Reference 2)
export const page5 = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .refine((value) => value.trim() !== "", "Name is required"),
  phone: z
    .number()
    .positive("Phone number is required")
    .refine((value) => value !== 0, "Phone number is required"),
  address: z
    .string()
    .nonempty("Address is required")
    .refine((value) => value.trim() !== "", "Address is required"),
  pincode: z
    .number()
    .positive("Pincode is required")
    .refine((value) => value !== 0, "Pincode is required"),
});
