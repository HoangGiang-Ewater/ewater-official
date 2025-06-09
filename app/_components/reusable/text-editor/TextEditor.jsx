"use client";

import { ImageExtension } from "@/components/extensions/image";
import { ImagePlaceholder } from "@/components/extensions/image-placeholder";
import SearchAndReplace from "@/components/extensions/search-and-replace";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import SavedDrafts from "./SavedDrafts";
import TableOfContent from "./TableOfContent";
import TextEditorMain from "./TextEditorMain";
import {
  TextEditorProvider,
  useTextEditorContext,
} from "@/contexts/TextEditorContext";
import TextAlign from "@tiptap/extension-text-align";
import { toast } from "sonner";

const extensions = [
  StarterKit.configure({
    orderedList: { HTMLAttributes: { class: "list-decimal" } },
    bulletList: { HTMLAttributes: { class: "list-disc flex flex-col gap-4" } },
    code: { HTMLAttributes: { class: "bg-accent rounded-md p-1" } },
    horizontalRule: { HTMLAttributes: { class: "my-2" } },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: "leading-8",
      },
    },
  }),
  TextStyle,
  Color,
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Highlight.configure({ multicolor: true }),
  Heading,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

function TextEditorInner(props) {
  const { state } = useTextEditorContext();
  const { editor } = state;

  // Add this effect:
  React.useEffect(() => {
    if (editor && props.content) {
      // Only set if different to avoid cursor jump
      if (editor.getHTML() !== props.content) {
        Promise.resolve().then(() => {
          editor.commands.setContent(props.content);
        });
      }
    }
  }, [editor, props.content]);

  if (!editor) return null;

  const saveCurrentPost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const content = editor.getJSON();
    localStorage.setItem("postContent", JSON.stringify(content));
    toast.success("Post saved", {
      description: "Your post has been saved successfully.",
    });
  };

  return (
    <div className="relative ">
      <SavedDrafts />
      <TextEditorMain
        {...props}
        editor={editor}
        saveCurrentPost={saveCurrentPost}
      />
      <TableOfContent content={props.content} />
    </div>
  );
}

const TextEditor = (props) => (
  <TextEditorProvider
    extensions={extensions}
    content={props.content}
    onChange={props.onChange}
    defaultValue={props.defaultValue}
  >
    <TextEditorInner {...props} />
  </TextEditorProvider>
);

export default TextEditor;
