"use client";

import { ToolbarProvider } from "@/components/toolbars/toolbar-provider";
import { BlockquoteToolbar } from "@/components/toolbars/blockquote";
import { BoldToolbar } from "@/components/toolbars/bold";
import { BulletListToolbar } from "@/components/toolbars/bullet-list";
import { CodeToolbar } from "@/components/toolbars/code";
import { CodeBlockToolbar } from "@/components/toolbars/code-block";
import { ColorHighlightToolbar } from "@/components/toolbars/color-and-highlight";
import { HardBreakToolbar } from "@/components/toolbars/hard-break";
import { HeadingToolbar } from "@/components/toolbars/heading";
import { HorizontalRuleToolbar } from "@/components/toolbars/horizontal-rule";
import { ImagePlaceholderToolbar } from "@/components/toolbars/image-placeholder-toolbar";
import { ItalicToolbar } from "@/components/toolbars/italic";
import { OrderedListToolbar } from "@/components/toolbars/ordered-list";
import { RedoToolbar } from "@/components/toolbars/redo";
import { SaveBtn } from "@/components/toolbars/save-btn";
import { SearchAndReplaceToolbar } from "@/components/toolbars/search-and-replace-toolbar";
import { StrikeThroughToolbar } from "@/components/toolbars/strikethrough";
import { UndoToolbar } from "@/components/toolbars/undo";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import TextEditorBottomBar from "./TextEditorBottomBar";
import { EditorContent } from "@tiptap/react";
import React from "react";
import { TextAlignToolbar } from "@/components/toolbars/text-align";
import ParagraphToolbar from "@/components/toolbars/paragraph";

function TextEditorMain({
  editor,
  setDrafts,
  saveCurrentPost,
  onSubmit,
  defaultValue,
  invalidateQuery,
}) {
  React.useEffect(() => {
    if (!editor || !defaultValue) return;
    editor.commands.setContent(defaultValue);
  }, []);

  return (
    <div className="">
      <div className="w-full relative pb-3">
        <motion.div
          className="flex w-full items-center py-2 px-2 justify-between border-b sticky top-0 left-0 bg-background z-20 shadow-sm"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <ToolbarProvider editor={editor}>
            <div className="flex items-center gap-2 *:shrink-0">
              <UndoToolbar />
              <RedoToolbar />
              <Separator orientation="vertical" className="h-7" />
              <ParagraphToolbar />
              <HeadingToolbar />
              <BoldToolbar />
              <ItalicToolbar />
              <StrikeThroughToolbar />
              <TextAlignToolbar editor={editor} />
              <BulletListToolbar />
              <OrderedListToolbar />
              <CodeToolbar />
              <CodeBlockToolbar />
              <HorizontalRuleToolbar />
              <BlockquoteToolbar />
              <HardBreakToolbar />
              <ImagePlaceholderToolbar />
              <ColorHighlightToolbar />
              <SearchAndReplaceToolbar />
              <SaveBtn onClick={saveCurrentPost} />
            </div>
          </ToolbarProvider>
        </motion.div>
        <div
          onClick={() => {
            editor?.chain().focus().run();
          }}
          className="cursor-text min-h-[80vh] bg-background"
        >
          <EditorContent className="outline-none" editor={editor} />
        </div>
      </div>
      <TextEditorBottomBar
        editor={editor}
        setDrafts={setDrafts}
        onSubmit={onSubmit}
        invalidateQuery={invalidateQuery}
      />
    </div>
  );
}

export default TextEditorMain;
