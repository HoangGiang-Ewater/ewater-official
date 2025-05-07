import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveDraft } from "@/lib/utils";
import { FilePlusIcon, MoveRightIcon } from "lucide-react";

function TextEditorBottomBar({ editor, content, setDrafts }) {
  const { toast } = useToast();

  const handleSubmit = () => {};

  return (
    <div className="flex justify-end mt-4">
      <Button
        className={"mr-2"}
        variant={"outline"}
        onClick={() =>
          saveDraft(editor, "My Draft", (draft) => {
            toast({
              title: "Draft saved",
              description: "Your draft has been saved successfully.",
            });
            setDrafts((drafts) => [...drafts, draft]);
          })
        }
      >
        <FilePlusIcon className="w-4 h-4" />
        Save as Draft
      </Button>
      <Button
        onClick={handleSubmit}
        className="bg-blue-500 text-white hover:bg-blue-600"
      >
        Publish Post <MoveRightIcon className="ml-2" />
      </Button>
    </div>
  );
}

export default TextEditorBottomBar;
