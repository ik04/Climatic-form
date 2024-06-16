"use client";
import React, { useState } from "react";
import { FormBuilder } from "./components/formBuilder";
import { Forms } from "./data/forms";
import Image from "next/image";

const page = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="h-[80vh]">
      <div className="title flex items-center justify-center my-8 text-white font-jost uppercase font-medium text-[50px]">
        <Image alt="" src={"/assets/logo.png"} width={400} height={400} />
        <h2 className="bg-accentGreen p-2">Apply Solar Loan</h2>
      </div>
      <FormBuilder count={page} setPage={setPage} page={Forms[page]} />
    </div>
  );
};

export default page;
