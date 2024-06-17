"use client";
import React, { useState } from "react";
import { FormBuilder } from "./components/formBuilder";
import { Forms } from "./data/forms";
import Image from "next/image";

const page = () => {
  const [page, setPage] = useState(1);
  return (
    <div className="h-screen">
      <div className="title flex items-center justify-center my-8">
        <Image alt="" src={"/assets/logo.png"} width={300} height={300} />
      </div>
      <FormBuilder count={page} setPage={setPage} page={Forms[page]} />
    </div>
  );
};

export default page;
