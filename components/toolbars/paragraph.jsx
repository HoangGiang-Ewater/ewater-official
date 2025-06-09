import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToolbar } from "./toolbar-provider";
import { Pilcrow, TextIcon } from "lucide-react";

function ParagraphToolbar({ className }) {
  const { editor } = useToolbar();

  if (!editor) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon"
          variant={editor.isActive("paragraph") ? "default" : "ghost"}
          className={className}
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-label="Paragraph"
        >
          <Pilcrow className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Paragraph</span>
      </TooltipContent>
    </Tooltip>
  );
}

export default ParagraphToolbar;
