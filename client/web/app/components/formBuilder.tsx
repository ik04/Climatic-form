"use client";
import React from "react";
import Image from "next/image";

export const FormBuilder: React.FC<FormBuilderProps> = ({
  page,
  setPage,
  count,
}) => {
  const updateCount = () => {
    setPage((prev) => prev + 1);
  };
  const decrementCount = () => {
    if (count != 1) {
      setPage((prev) => prev - 1);
    }
  };

  const inputConstructer = (field: FormField) => {
    switch (field.type) {
      case "title":
        return <h1>{field.field}</h1>;
      case "text":
        return (
          <>
            <label htmlFor={field.field}>{field.field}</label>
            <input type="text" name={field.field} id={field.field} />
          </>
        );
      case "email":
        return (
          <>
            <label htmlFor={field.field}>{field.field}</label>
            <input type="email" name={field.field} id={field.field} />
          </>
        );
      case "number":
        return (
          <>
            <label htmlFor={field.field}>{field.field}</label>
            <input type="number" name={field.field} id={field.field} />
          </>
        );
      case "select":
        let placeholder;
        return (
          <>
            <label htmlFor={field.field}>{field.field}</label>
            <select name={field.field} id={field.field}>
              {field.options?.map((option, index) => {
                if (typeof option === "string") {
                  placeholder =
                    typeof option === "string"
                      ? option.replace(/_/g, " ")
                      : option;
                  return (
                    <option key={index} className="uppercase" value={option}>
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
          </>
        );
      case "file":
        return (
          <>
            <label htmlFor={field.field}>{field.field}</label>
            <input type="file" name={field.field} id={field.field} />
          </>
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
    <div className="flex flex-col items-center justify-center bg-red-200 h-full">
      <h1>{page.title}</h1>
      {page.fields.map((field) => inputConstructer(field))}
      <div className="flex space-x-3">
        {!(count == 1) && (
          <button
            className="flex items-center"
            onClick={() => decrementCount()}
          >
            <Image
              src={"/assets/right-arrow.png"}
              alt=""
              className="-scale-x-100"
              width={40}
              height={40}
            />
            <p className="uppercase">Back</p>
          </button>
        )}
        {!page.is_last ? (
          <button onClick={() => updateCount()} className="flex items-center">
            <p className="uppercase">Next</p>
            <Image
              src={"/assets/right-arrow.png"}
              alt=""
              width={40}
              height={40}
            />
          </button>
        ) : (
          <button className="uppercase">Submit</button>
        )}
      </div>
    </div>
  );
};
