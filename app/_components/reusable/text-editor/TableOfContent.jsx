"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { AlignLeftIcon, XIcon } from "lucide-react";
import React from "react";

const getTableOfContents = (content) => {
  const headings = content.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/g) || [];
  const toc = headings.map((heading) => {
    const level = heading.match(/<h([1-6])/)[1];
    const text = heading.replace(/<[^>]+>/g, "");
    return { level, text };
  });
  return toc;
};

function TableOfContent({ content }) {
  const [open, setOpen] = React.useState(false);
  const [tableOfContents, setTableOfContents] = React.useState([]);

  React.useEffect(() => {
    setTableOfContents(getTableOfContents(content));
  }, [content]);

  if (tableOfContents.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-0 left-0 mt-4 ml-4 rounded-full shadow-md"
        >
          <AlignLeftIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-72" align="start">
        <div className="flex items-center justify-between mb-4 rounded-md">
          <div className="flex items-center gap-2">
            <AlignLeftIcon className="w-4 h-4 text-slate-500" />
            <h3 className="font-bold text-slate-500">Table of contents</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="!p-1 rounded-full"
            onClick={() => setOpen(false)}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        </div>
        <div>
          {tableOfContents.map((item, index) => {
            let margin = "ml-0";
            if (item.level === "1") margin = "ml-0";
            else if (item.level === "2") margin = "ml-4";
            else if (item.level === "3") margin = "ml-8";
            else if (item.level === "4") margin = "ml-12";
            else if (item.level === "5") margin = "ml-16";
            else if (item.level === "6") margin = "ml-20";

            return (
              <div
                key={index}
                className={`${margin} text-slate-700 hover:text-slate-900 transition-colors duration-200 font-bold text-md capitalize cursor-pointer hover:underline`}
              >
                {index + 1}. {item.text}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default TableOfContent;
