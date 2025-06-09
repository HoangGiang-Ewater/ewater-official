import React from "react";
import { SaveIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const SaveBtn = React.forwardRef(({ onClick }, ref) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button type="button" size={"icon"} onClick={onClick} ref={ref}>
          <span className="sr-only">Save</span>
          <SaveIcon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Save</TooltipContent>
    </Tooltip>
  );
});

SaveBtn.displayName = "SaveBtn";

export { SaveBtn };
