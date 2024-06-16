"use client";
import React, { useState } from "react";
import { FormBuilder } from "./components/formBuilder";
import { Forms } from "./data/forms";

const page = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="h-screen">
      <FormBuilder count={page} setPage={setPage} page={Forms[page]} />
    </div>
  );
};

export default page;
