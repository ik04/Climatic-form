import React, { FormEvent, useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { page1, page2, page3, page4, page5 } from "../validation/Pages";
import axios from "axios";
import { ClockLoader, HashLoader, SquareLoader } from "react-spinners";
import { RedirectType, redirect } from "next/navigation";

interface FormDataState {
  [key: number]: { [key: string]: string | File };
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  page,
  setPage,
  count,
}) => {
  const [formData, setFormData] = useState<FormDataState>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Initialize formData for the current page if not already initialized
    if (!formData[count]) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [count]: {},
      }));
    }
  }, [count, formData]);

  const validatePage = (formObject: { [key: string]: any }) => {
    switch (count) {
      case 1:
        return page1.safeParse(formObject);
      case 2:
        return page2.safeParse(formObject);
      case 3:
        return page3.safeParse(formObject);
      case 4:
        return page4.safeParse(formObject);
      case 5:
        return page5.safeParse(formObject);
      default:
        return { success: true, error: null };
    }
  };

  const convertFormData = (formData: FormData) => {
    const formObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      const field = page.fields.find((field) => field.field === key);
      if (field?.type === "number") {
        formObject[key] = Number(value);
      } else if (field?.type === "file") {
        formObject[key] = value instanceof FileList ? value[0] : value; // Store the first file if multiple files are selected
      } else {
        formObject[key] = value;
      }
    });
    return formObject;
  };

  const nextPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formDataObject = new FormData(form);

    // Convert FormData object to plain JS object
    const formObject: { [key: string]: any } = convertFormData(formDataObject);
    const validation = validatePage(formObject);
    if (validation.success) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [count]: formObject,
      }));
      setPage((prev) => prev + 1);
      setErrors({});
    } else {
      const validationErrors: { [key: string]: string } = {};
      if (validation.error) {
        validation.error.issues.forEach((issue) => {
          validationErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const backPage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (count !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const convertNestedFormDataToFormData = (nestedFormData: FormDataState) => {
    const formData = new FormData();
    Object.keys(nestedFormData).forEach((pageKey) => {
      const pageData = nestedFormData[Number(pageKey)];
      Object.keys(pageData).forEach((key) => {
        formData.append(`${pageKey}_${key}`, pageData[key]);
      });
    });
    return formData;
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.currentTarget;
    const formDataObject = new FormData(form);

    const formObject: { [key: string]: any } = convertFormData(formDataObject);

    const validation = validatePage(formObject);
    if (validation.success) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [count]: formObject,
      }));
      setErrors({});

      try {
        const finalFormData = convertNestedFormDataToFormData(formData);
        console.log(finalFormData);
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/submit`,
          finalFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        redirect("/success");
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error
      }
    } else {
      const validationErrors: { [key: string]: string } = {};
      if (validation.error) {
        validation.error.issues.forEach((issue) => {
          validationErrors[issue.path[0] as string] = issue.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = event.target as HTMLInputElement; // Explicitly cast event.target to HTMLInputElement

    if (name) {
      if (files) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [count]: {
            ...prevFormData[count],
            [name]: files[0], // Store the file object
          },
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [count]: {
            ...prevFormData[count],
            [name]: value,
          },
        }));
      }
    }
  };
  const inputConstructor = (field: FormField) => {
    const error = errors[field.field];
    const value = formData[count]?.[field.field] || "";

    switch (field.type) {
      case "title":
        return (
          <h1 key={field.field} className="text-2xl uppercase text-inputGrey">
            {field.field.replace(/_/g, " ")}
          </h1>
        );
      case "file":
        return (
          <div key={field.field} className="flex flex-col items-start">
            <label
              className="text-xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {field.field.replace(/_/g, " ")}
            </label>
            <input
              type="file"
              name={field.field}
              id={field.field}
              className="border-none rounded-none"
              onChange={handleInputChange}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );
      case "camera":
        return (
          <div key={field.field} className="flex flex-col items-start">
            <label
              className="text-xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {field.field.replace(/_/g, " ")}
            </label>
            <input
              type="file"
              name={field.field}
              id={field.field}
              className="border-none rounded-none"
              capture="user"
              onChange={handleInputChange}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );
      case "select":
        return (
          <div key={field.field} className="flex flex-col items-start">
            <label
              className="text-xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {field.field.replace(/_/g, " ")}
            </label>
            <select
              name={field.field}
              id={field.field}
              value={value as string}
              onChange={handleInputChange}
              className={error ? "border-red-500" : ""}
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );
      default:
        return (
          <div key={field.field} className="flex flex-col items-start">
            <label
              className="text-xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {field.field.replace(/_/g, " ")}
            </label>
            <input
              type={field.type}
              name={field.field}
              id={field.field}
              value={value as string}
              onChange={handleInputChange}
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        );
    }
  };

  return (
    <form
      onSubmit={!page.is_last ? nextPage : submitForm}
      className="flex flex-col items-center space-y-5 h-full"
      encType="multipart/form-data"
    >
      <h1 className="text-3xl font-jost text-inputGrey">{page.title}</h1>
      <div className="flex flex-col">
        {page.fields.map((field) => inputConstructor(field))}
      </div>
      <div className="flex space-x-10">
        {/* Back button */}
        {/* {!page.is_last && count !== 1 && (
          <button
            className="flex items-center space-x-1"
            onClick={backPage}
            type="button"
          >
            <Image
              src={"/assets/right-arrow.png"}
              alt=""
              className="-scale-x-100"
              width={40}
              height={40}
            />
            <p className="uppercase text-3xl font-jost text-accentGreen">
              Back
            </p>
          </button>
        )} */}
        {/* Next/Submit button */}
        {!page.is_last ? (
          <button
            type="submit"
            className="flex items-center justify-center space-x-1"
          >
            <p className="uppercase text-3xl font-jost text-accentGreen">
              Next
            </p>
            <Image
              src={"/assets/right-arrow.png"}
              alt=""
              width={40}
              height={40}
            />
          </button>
        ) : (
          <>
            {!isLoading ? (
              <button
                type="submit"
                className="uppercase text-3xl font-jost text-black bg-accentGreen p-2"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="uppercase text-3xl font-jost text-black bg-accentGreen p-2 flex items-center space-x-2 mr-3"
                disabled
              >
                <p>Submit</p>
                <HashLoader color="black" size={30} />
              </button>
            )}
          </>
        )}
      </div>
    </form>
  );
};
