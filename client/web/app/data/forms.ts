export const Forms: FormsType = {
  1: {
    title: "Applicants Details",
    fields: [
      {
        field: "name",
        type: "text",
      },
      {
        field: "phone",
        type: "text",
      },
      {
        field: "email",
        type: "email",
      },
      {
        field: "address",
        type: "text",
      },
      {
        field: "pincode",
        type: "number",
      },
      {
        field: "pancard_number",
        type: "number",
      },
      {
        field: "adhaar_number",
        type: "number",
      },
    ],
    is_last: false,
  },
  2: {
    title: "Project Details",
    fields: [
      {
        field: "project_type",
        type: "select",
        options: ["Residential", "C&I"],
      },
      {
        field: "project_capacity",
        type: "number",
      },
      {
        field: "project_site_address",
        type: "text",
      },
      {
        field: "project_value",
        type: "number",
      },
      {
        field: "loan_amount",
        type: "number",
      },
      {
        field: "tenure",
        type: "select",
        options: [1, 2, 3, 4, 5],
      },
      {
        field: "project_site_title",
        type: "select",
        options: ["owned", "rented"],
      },
      {
        field: "title_document_option",
        type: "select",
        options: ["ownership_documents_owned", "rent_agreement_rented"],
      },
    ],
    is_last: false,
  },
  3: {
    title: "Documents Upload",
    fields: [
      {
        field: "pancard_copy",
        type: "file",
      },
      {
        field: "adhaar_copy",
        type: "file",
      },
      {
        field: "bank_statement",
        type: "file",
      },
      {
        field: "title_document",
        type: "file",
      },
      {
        field: "upload_selfie",
        type: "camera",
      },
    ],
    is_last: false,
  },

  4: {
    title: "Reference Details",
    fields: [
      {
        field: "reference_1",
        type: "title",
      },
      {
        field: "name",
        type: "text",
      },
      {
        field: "phone",
        type: "number",
      },
      {
        field: "address",
        type: "text",
      },
      {
        field: "pincode",
        type: "number",
      },
    ],
    is_last: false,
  },
  5: {
    title: "Reference Details",

    fields: [
      {
        field: "reference_2",
        type: "title",
      },
      {
        field: "name",
        type: "text",
      },
      {
        field: "phone",
        type: "number",
      },
      {
        field: "address",
        type: "text",
      },
      {
        field: "pincode",
        type: "number",
      },
    ],
    is_last: true,
  },
};
