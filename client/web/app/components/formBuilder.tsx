"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";

export const FormBuilder: React.FC<FormBuilderProps> = ({
  page,
  setPage,
  count,
}) => {
  const [data, setData] = useState<any>([]);
  const updateCount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    setData((prevData: any) => {
      const newData = [...prevData];
      newData[count] = formObject;
      return newData;
    });
    console.log(data);

    setPage((prev) => prev + 1);
  };
  const decrementCount = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (count !== 1) {
      setPage((prev) => prev - 1);
    }
  };
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    setData((prevData: any) => {
      const newData = [...prevData];
      newData[count] = formObject;
      return newData;
    });

    console.log(data);
    // Add form submission logic here
  };
  const inputConstructer = (field: FormField) => {
    switch (field.type) {
      case "title":
        let title;
        title =
          typeof field.field === "string"
            ? field.field.replace(/_/g, " ")
            : field.field;
        return <h1 className="text-2xl uppercase text-inputGrey">{title}</h1>;

      case "text":
        let text;
        text =
          typeof field.field === "string"
            ? field.field.replace(/_/g, " ")
            : field.field;
        return (
          <div className="flex flex-col items-start">
            <label
              className="text-2xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {text}
            </label>
            <input type="text" name={field.field} id={field.field} />
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col items-start">
            <label
              className="text-2xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {field.field}
            </label>
            <input type="email" name={field.field} id={field.field} />
          </div>
        );
      case "number":
        let number;
        number =
          typeof field.field === "string"
            ? field.field.replace(/_/g, " ")
            : field.field;
        return (
          <div className="flex flex-col items-start">
            <label
              className="text-2xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {number}
            </label>
            <input type="number" name={field.field} id={field.field} />
          </div>
        );
      case "select":
        let placeholder, selectLabel;
        selectLabel =
          typeof field.field === "string"
            ? field.field.replace(/_/g, " ")
            : field.field;
        return (
          <div className="flex flex-col items-start">
            <label
              className="text-2xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {selectLabel}
            </label>
            <select name={field.field} id={field.field}>
              {field.options?.map((option, index) => {
                if (typeof option === "string") {
                  placeholder =
                    typeof option === "string"
                      ? option.replace(/_/g, " ")
                      : option;
                  return (
                    <option key={index} className="" value={option}>
                      {placeholder}
                    </option>
                  );
                } else if (typeof option === "number" && option !== null) {
                  return (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  );
                }
              })}
            </select>
          </div>
        );
      case "file":
        let file;
        file =
          typeof field.field === "string"
            ? field.field.replace(/_/g, " ")
            : field.field;
        return (
          <div className="flex flex-col items-start">
            <label
              className="text-2xl uppercase text-inputGrey"
              htmlFor={field.field}
            >
              {file}
            </label>
            <input
              type="file"
              className="border-none rounded-none"
              name={field.field}
              id={field.field}
            />
          </div>
        );
      case "camera":
        return (
          <>
            <label>{field.field}</label>
            <h1>camera</h1>
          </>
        );
      default:
        break;
    }
  };

  return (
    <form
      onSubmit={!page.is_last ? updateCount : submitForm}
      className="flex flex-col items-center space-y-3"
    >
      <h1 className="md:text-[40px] font-jost text-inputGrey">{page.title}</h1>
      <div className="flex flex-col">
        {page.fields.map((field) => inputConstructer(field))}
      </div>
      <div className="flex space-x-10">
        {!(count == 1) && (
          <button
            className="flex items-center space-x-1"
            onClick={decrementCount}
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
        )}
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
