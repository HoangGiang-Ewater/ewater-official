"use client";

import { ImageExtension } from "@/components/extensions/image";
import { ImagePlaceholder } from "@/components/extensions/image-placeholder";
import SearchAndReplace from "@/components/extensions/search-and-replace";

import { useToast } from "@/hooks/use-toast";
import { getDrafts } from "@/lib/utils";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import SavedDrafts from "./SavedDrafts";
import TableOfContent from "./TableOfContent";
import TextEditorBottomBar from "./TextEditorBottomBar";
import TextEditorMain from "./TextEditorMain";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    code: {
      HTMLAttributes: {
        class: "bg-accent rounded-md p-1",
      },
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "my-2",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "bg-primary text-primary-foreground p-2 text-sm rounded-md p-1",
      },
    },
  }),
  TextStyle,
  Color,
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Highlight.configure({
    multicolor: true,
  }),
  Heading,
];

const StarterKitExample = ({ content, onChange, title }) => {
  const { toast } = useToast();

  const editor = useEditor({
    extensions: extensions,
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      localStorage.setItem("tiptap-autosave", JSON.stringify(editor.getJSON()));
    },
  });
  const [drafts, setDrafts] = React.useState(() => getDrafts());

  // Load on mount
  React.useEffect(() => {
    if (editor) {
      const autosave = localStorage.getItem("tiptap-autosave");
      if (autosave) {
        editor.commands.setContent(JSON.parse(autosave));
      }
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const saveCurrentPost = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const content = editor.getJSON();

    localStorage.setItem("postContent", JSON.stringify(content));

    toast({
      title: "Post saved",
      description: "Your post has been saved successfully.",
      variant: "default",
      duration: 2000,
    });
  };

  return (
    <div
      className="gap-4 w-full mx-auto p-4"
      style={{
        gridTemplateColumns: "1fr 3fr 1fr",
        display: "grid",
      }}
    >
      <SavedDrafts editor={editor} drafts={drafts} setDrafts={setDrafts} />
      <TextEditorMain
        editor={editor}
        content={content}
        setDrafts={setDrafts}
        saveCurrentPost={saveCurrentPost}
      />
      <TableOfContent content={content} />
    </div>
  );
};

export default StarterKitExample;
