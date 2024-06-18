import React, { FormEvent, useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
import { page1, page2, page3, page4, page5 } from "../validation/Pages";

interface FormDataState {
  [key: number]: { [key: string]: any };
}

export const FormBuilder: React.FC<FormBuilderProps> = ({
  page,
  setPage,
  count,
}) => {
  const [formData, setFormData] = useState<FormDataState>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Initialize formData for the current page if not already initialized
    if (!formData[count]) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [count]: {},
      }));
    }
  }, [count, formData]);

  const convertFormData = (formData: FormData) => {
    const formObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      const field = page.fields.find((field) => field.field === key);
      if (field?.type === "number") {
        formObject[key] = Number(value);
      } else {
        formObject[key] = value;
      }
    });
    return formObject;
  };

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

  const nextPage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject = convertFormData(formData);
    console.log(formObject);

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

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputFormData = new FormData(event.currentTarget);
    const formObject = convertFormData(inputFormData);

    const validation = validatePage(formObject);
    if (validation.success) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [count]: formObject,
      }));
      console.log(formData);
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

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [count]: {
        ...prevFormData[count],
        [name]: value,
      },
    }));
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
              value={value}
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
              value={value}
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
    >
      <h1 className="text-3xl font-jost text-inputGrey">{page.title}</h1>
      <div className="flex flex-col">
        {page.fields.map((field) => inputConstructor(field))}
      </div>
      <div className="flex space-x-10">
        {/* {count !== 1 && (
          <button className="flex items-center space-x-1" onClick={backPage}>
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
          <button
            type="submit"
            className="uppercase text-3xl font-jost text-black bg-accentGreen p-2"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
};
