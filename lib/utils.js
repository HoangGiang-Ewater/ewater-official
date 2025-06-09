import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabaseClient";
import slugify from "slugify";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Save with timestamp and optional title
export const saveDraft = (editor, title = "Untitled", callback) => {
  const drafts = JSON.parse(localStorage.getItem("tiptap-drafts") || "[]");
  const newDraft = {
    id: Date.now(),
    title,
    content: editor.getJSON(),
    lastSaved: new Date().toISOString(),
  };

  localStorage.setItem("tiptap-drafts", JSON.stringify([...drafts, newDraft]));

  callback && callback(newDraft);

  return newDraft;
};

// Get all saved drafts
export const getDrafts = () => {
  return JSON.parse(localStorage.getItem("tiptap-drafts") || "[]");
};

// Load specific draft
export const loadDraft = (editor, draftId) => {
  const drafts = getDrafts();
  const draft = drafts.find((d) => d.id === draftId);
  if (draft) {
    editor.commands.setContent(draft.content);
  }
};

// Delete a draft
export const deleteDraft = (draftId, setter) => {
  const drafts = getDrafts();
  const updated = drafts.filter((d) => d.id !== draftId);
  setter(updated);
  localStorage.setItem("tiptap-drafts", JSON.stringify(updated));
};

export const NODE_HANDLES_SELECTED_STYLE_CLASSNAME =
  "node-handles-selected-style";

export function isValidUrl(url) {
  return /^https?:\/\/\S+$/.test(url);
}

export const duplicateContent = (editor) => {
  const { view } = editor;
  const { state } = view;
  const { selection } = state;

  editor
    .chain()
    .insertContentAt(
      selection.to,
      selection.content().content.firstChild?.toJSON(),
      {
        updateSelection: true,
      }
    )
    .focus(selection.to)
    .run();
};

export function getUrlFromString(str) {
  if (isValidUrl(str)) {
    return str;
  }
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch {
    return null;
  }
}

export function absoluteUrl(path) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export async function uploadImageToSupabase(file) {
  const filePath = `tiptap/${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("project-media")
    .upload(filePath, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("project-media")
    .getPublicUrl(filePath);

  // console.log("urlData: ", urlData);

  return urlData.publicUrl;
}

/**
 * Creates a URL-friendly slug from a Vietnamese string.
 * @param {string} text - The Vietnamese string to slugify.
 * @returns {string} - The slugified string.
 */
export function slugifyVietnamese(text) {
  if (!text) return "";

  return slugify(text, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
}
