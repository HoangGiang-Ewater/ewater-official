"use client";
import { useToolbar } from "@/components/toolbars/toolbar-provider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  Check,
  ChevronDown,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
} from "lucide-react";

const HEADING_STYLES = [
  {
    name: "H1",
    icon: <Heading1Icon />,
    level: 1,
    className: "text-2xl font-bold",
  },
  {
    name: "H2",
    icon: <Heading2Icon />,
    level: 2,
    className: "text-xl font-bold",
  },
  {
    name: "H3",
    icon: <Heading3Icon />,
    level: 3,
    className: "text-lg font-bold",
  },
  {
    name: "H4",
    icon: <Heading4Icon />,
    level: 4,
    className: "text-base font-bold",
  },
  {
    name: "H5",
    icon: <Heading5Icon />,
    level: 5,
    className: "text-sm font-bold",
  },
  {
    name: "H6",
    icon: <Heading6Icon />,
    level: 6,
    className: "text-xs font-bold",
  },
];

const HeadingButton = ({ name, level, icon, className }) => {
  const { editor } = useToolbar();

  if (!editor) {
    return null;
  }

  const isActive = editor.isActive("heading", { level });

  return (
    <button
      onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
      className="flex w-full items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-gray-3"
      type="button"
      disabled={isActive}
    >
      <div className="flex items-center space-x-2">
        <div className={`rounded-sm border px-1 py-px font-medium`}>
          <span>{icon}</span>
        </div>
        <span className={`${className}`}>Heading {level}</span>
      </div>
      {editor.isActive("heading", { level }) && <Check className="h-4 w-4" />}
    </button>
  );
};

export const HeadingToolbar = () => {
  const { editor } = useToolbar();

  if (!editor) {
    return null;
  }

  return (
    <Popover>
      <div className="relative h-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 w-14 p-0 font-normal")}
              >
                <span className="text-md">H</span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Heading</TooltipContent>
        </Tooltip>

        <PopoverContent align="start" className="w-56 p-1 dark:bg-gray-2">
          <ScrollArea className="max-h-80 overflow-y-auto pr-2">
            <div className="mb-2.5 mt-2 px-2 text-xs text-gray-11">Heading</div>
            {HEADING_STYLES.map(({ name, level, icon, className }) => (
              <HeadingButton
                key={name}
                icon={icon}
                level={level}
                className={className}
              />
            ))}

            <Separator className="my-3" />
          </ScrollArea>
        </PopoverContent>
      </div>
    </Popover>
  );
};
