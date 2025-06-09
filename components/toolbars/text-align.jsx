"use client";

import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToolbar } from "./toolbar-provider";

const alignments = [
  {
    value: "left",
    label: "Align Left",
    icon: AlignLeft,
  },
  {
    value: "center",
    label: "Align Center",
    icon: AlignCenter,
  },
  {
    value: "right",
    label: "Align Right",
    icon: AlignRight,
  },
  {
    value: "justify",
    label: "Justify",
    icon: AlignJustify,
  },
];

export function TextAlignToolbar({ className, ...props }) {
  const { editor } = useToolbar();

  if (!editor) return <div>loading....</div>;

  return (
    <div className="flex items-center gap-1" {...props}>
      {alignments.map(({ value, label, icon: Icon }) => (
        <Tooltip key={value}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="icon"
              variant={
                editor.isActive({ textAlign: value }) ? "default" : "ghost"
              }
              className={className}
              onClick={() => editor.chain().focus().setTextAlign(value).run()}
              disabled={!editor.can().chain().focus().setTextAlign(value).run()}
              aria-label={label}
            >
              <Icon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>{label}</span>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

TextAlignToolbar.displayName = "TextAlignToolbar";
export default TextAlignToolbar;
