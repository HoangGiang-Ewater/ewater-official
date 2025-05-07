import { getDrafts } from "@/lib/utils";
import React from "react";

function TextEditorContext() {
  const [drafts, setDrafts] = React.useState(() => getDrafts());
  const [content, setContent] = React.useState(``);

  return {
    drafts,
    setDrafts,
    content,
    setContent,
  };
}

export default TextEditorContext;
