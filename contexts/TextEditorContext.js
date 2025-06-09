import React, { createContext, useReducer, useContext, useEffect } from "react";
import { useEditor } from "@tiptap/react";
import { getDrafts } from "@/lib/utils";

const initialState = {
  drafts: [],
  editor: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DRAFTS":
      return { ...state, drafts: action.drafts };
    case "SET_EDITOR":
      return { ...state, editor: action.editor };
    default:
      return state;
  }
}

const TextEditorContext = createContext();

export function TextEditorProvider({
  children,
  extensions,
  content,
  onChange,
  defaultValue,
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Editor instance
  const editor = useEditor({
    extensions,
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
      localStorage.setItem("tiptap-autosave", JSON.stringify(editor.getJSON()));
    },
  });

  // Set editor in context
  useEffect(() => {
    if (editor) dispatch({ type: "SET_EDITOR", editor });
  }, [editor]);

  // Load autosave on mount
  useEffect(() => {
    if (editor) {
      const autosave = localStorage.getItem("tiptap-autosave");
      if (autosave) {
        Promise.resolve().then(() =>
          editor.commands.setContent(JSON.parse(autosave))
        );
      }
    }
  }, [editor]);

  // Set default value if empty
  useEffect(() => {
    if (editor && defaultValue !== undefined) {
      if (editor.getHTML() === "" || editor.getHTML() === `<p></p>`) {
        Promise.resolve().then(() => editor.commands.setContent(defaultValue));
      }
    }
  }, [editor, defaultValue]);

  // Keep drafts in context up to date
  useEffect(() => {
    queueMicrotask(() => {
      dispatch({ type: "SET_DRAFTS", drafts: getDrafts() });
    });
  }, []);

  // Sync drafts with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      queueMicrotask(() => {
        dispatch({ type: "SET_DRAFTS", drafts: getDrafts() });
      });
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <TextEditorContext.Provider value={{ state, dispatch }}>
      {children}
    </TextEditorContext.Provider>
  );
}

export function useTextEditorContext() {
  const context = useContext(TextEditorContext);
  if (!context) {
    throw new Error(
      "useTextEditorContext must be used within a TextEditorProvider"
    );
  }
  return context;
}
