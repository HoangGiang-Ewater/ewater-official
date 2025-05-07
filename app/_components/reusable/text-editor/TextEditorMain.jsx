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

import TextEditorBottomBar from "./TextEditorBottomBar";
import { EditorContent } from "@tiptap/react";

function TextEditorMain({ editor, content, setDrafts, saveCurrentPost }) {
  return (
    <div className="">
      <div className="border-l border-r w-full relative overflow-hidden pb-3">
        <div className="flex w-full items-center py-2 px-2 justify-between border-b sticky top-0 left-0 bg-background z-20">
          <ToolbarProvider editor={editor}>
            <div className="flex items-center gap-2 *:shrink-0">
              <UndoToolbar />
              <RedoToolbar />
              <Separator orientation="vertical" className="h-7" />
              <HeadingToolbar />
              <BoldToolbar />
              <ItalicToolbar />
              <StrikeThroughToolbar />
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
        </div>
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
        content={content}
        setDrafts={setDrafts}
      />
    </div>
  );
}

export default TextEditorMain;
