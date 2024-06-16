"use client";
import React, { useState } from "react";
import { FormBuilder } from "./components/formBuilder";
import { Forms } from "./data/forms";

const page = () => {
  const [page, setPage] = useState(1);
  return (
    <div>
      <FormBuilder title="test" setPage={setPage} page={Forms[page]} />
    </div>
  );
};

export default page;
