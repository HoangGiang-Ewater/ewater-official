"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTextEditorContext } from "@/contexts/TextEditorContext";
import { deleteDraft, getDrafts, loadDraft } from "@/lib/utils";
import { FileTextIcon, XIcon } from "lucide-react";
import React from "react";

export default function SavedDrafts() {
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = useTextEditorContext();
  const { drafts, editor } = state;

  // Keep drafts in sync with localStorage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      const updatedDrafts = getDrafts();
      dispatch({ type: "SET_DRAFTS", drafts: updatedDrafts });
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  React.useEffect(() => {
    const updatedDrafts = getDrafts();
    dispatch({ type: "SET_DRAFTS", drafts: updatedDrafts });
  }, [dispatch]);

  // Only render the button if there are drafts
  if (!drafts || drafts.length === 0) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute -top-1 right-full mt-4 mr-4 rounded-full shadow-md z-50"
        >
          <FileTextIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-4 w-80" align="end">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileTextIcon className="w-4 h-4 text-slate-500" />
            <h3 className="font-bold text-base text-slate-500">Saved Drafts</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="!p-1 rounded-full"
            onClick={() => setOpen(false)}
          >
            <XIcon className="w-2 h-2" />
          </Button>
        </div>
        {drafts.map((draft, index) => (
          <Draft
            draft={draft}
            key={draft.id + draft.title + index}
            editor={editor}
            dispatch={dispatch}
            setOpen={setOpen}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
}

function Draft({ draft, editor, dispatch, setOpen }) {
  return (
    <div
      onClick={() => {
        loadDraft(editor, draft.id);
        setOpen(false);
      }}
      className="flex items-center gap-2 bg-muted/50 p-2 my-2 rounded-md hover:bg-muted/60 cursor-pointer"
    >
      <div className="flex flex-col flex-1">
        <p className="block text-base">{draft.title}</p>
        <p className="block text-sm text-slate-500">
          {new Date(draft.lastSaved).toLocaleString()}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="!p-1 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          deleteDraft(draft.id, (newDrafts) =>
            dispatch({ type: "SET_DRAFTS", drafts: newDrafts })
          );
        }}
      >
        <XIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
