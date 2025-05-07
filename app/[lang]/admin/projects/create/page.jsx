"use client";
import TextEditor from "@/app/_components/reusable/text-editor/TextEditor";
import React from "react";

export default function CreatePost() {
  const [content, setContent] = React.useState(``);

  return (
    <TextEditor
      content={content}
      onChange={(html) => setContent(html)}
      title={"Create new project post"}
    />
  );
}
