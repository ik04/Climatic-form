"use client";
import React from "react";
import Image from "next/image";

export const FormBuilder: React.FC<FormBuilderProps> = ({
  page,
  title,
  setPage,
}) => {
  const updateCount = () => {
    setPage((prev) => prev + 1);
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
                  placeholder = option.replace("_", " ");
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
    <div>
      <h1>{title}</h1>
      {page.fields.map((field) => inputConstructer(field))}
      {!page.is_last ? (
        <button onClick={() => updateCount()} className="flex items-center">
          <p className="uppercase">Next</p>
          <Image
            src={"/assets/right-arrow.png"}
            alt=""
            width={10}
            height={10}
          />
        </button>
      ) : (
        <button>Submit</button>
      )}
    </div>
  );
};
