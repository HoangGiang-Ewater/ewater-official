"use client";

import { Button } from "@/components/ui/button";
import { deleteDraft, getDrafts, loadDraft } from "@/lib/utils";
import { FileTextIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

export default function SavedDrafts({ editor, drafts, setDrafts }) {
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(() =>
    drafts ? drafts.length > 0 : false
  );

  // open drafts list and hide float button
  const handleOpen = () => {
    setOpen(true);
  };

  // close drafts list
  const handleClose = () => {
    setOpen(false);
  };

  // drafts list float button only visible when there are drafts and drafts list is closed

  React.useEffect(() => {
    if (drafts && drafts.length > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [drafts]);

  React.useEffect(() => {
    const handleStorageChange = () => {
      const updatedDrafts = getDrafts();
      setDrafts(updatedDrafts);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage.getItem("tiptap-drafts")]);

  React.useEffect(() => {
    const updatedDrafts = getDrafts();
    setDrafts(updatedDrafts);
  }, []);

  return (
    <div className="relative">
      {drafts && drafts.length > 0 && open && (
        <motion.div className="p-4 bg-white shadow-md rounded-md mt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-500">Saved Drafts</h3>
            </div>
            <Button
              variant={"ghost"}
              size={"icon"}
              className={"!p-1 rounded-full"}
              onClick={handleClose}
            >
              <XIcon className="w-4 h-4" />
            </Button>
          </div>
          {drafts.map((draft) => (
            <div
              onClick={() => loadDraft(editor, draft.id)}
              key={draft.id}
              className="flex items-center gap-2 bg-slate-100 p-2 my-2 rounded-md hover:bg-slate-200 cursor-pointer"
            >
              <div className="flex flex-col flex-1">
                <p className="block text-base text-slate-800">{draft.title}</p>
                <p className="block text-sm text-slate-500">
                  {new Date(draft.lastSaved).toLocaleString()}
                </p>
              </div>
              <Button
                variant={"ghost"}
                size={"icon"}
                className={"!p-1 rounded-full"}
                onClick={() => deleteDraft(draft.id, setDrafts)}
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </motion.div>
      )}

      {visible && !open && (
        <Button
          variant={"outline"}
          size={"icon"}
          className={`absolute top-0 right-0 mt-4 mr-4 rounded-full shadow-md transition-all duration-300`}
          onClick={handleOpen}
        >
          <FileTextIcon className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}
