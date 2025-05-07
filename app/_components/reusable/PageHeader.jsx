"use client";

import { cn } from "@/lib/utils";
import HeaderTag from "./HeaderTag";
import React from "react";

function PageHeader({
  title,
  description,
  headerTagText,
  classNames = {
    title: "",
    description: "",
    headerTagText: "",
  },
}) {
  return (
    <div className="relative p-5 lg:p-0">
      <h1
        className={`text-stroke-1-gray text-transparent text-[80px] lg:text-[170px] uppercase font-bold tracking-[22px] ${classNames.title}`}
      >
        {title || "Project"}
      </h1>
      <div className="absolute top-1/2">
        <h2
          className={`text-2xl lg:text-2xl font-semibold ${classNames.description}`}
        >
          {description || "Dự án của chúng tôi"}
        </h2>
        <HeaderTag className={cn("mt-5", classNames.headerTagText)}>
          {headerTagText || "EWATER - DỰ ÁN"}
        </HeaderTag>
      </div>
    </div>
  );
}

export default PageHeader;
