import { supabase } from "@/lib/supabaseClient";

export async function getContactReply(contactId) {
  const { data, error } = await supabase
    .from("contact_replied")
    .select("*")
    .eq("contact_id", contactId);
  // .single();

  if (error && error.code !== "PGRST116") {
    throw error; // ignore "no rows" error
  }

  return data;
}

export async function replyContact(id, { subject, message }) {
  return await supabase
    .from("contact_replied")
    .insert({ contact_id: id, subject, message })
    .select("*")
    .single();
}

export async function deleteContactReply(contactId) {
  const { error: deleteError } = await supabase
    .from("contact_replied")
    .delete()
    .eq("contact_id", contactId);

  if (deleteError) {
    return {
      success: false,
      message: `Error deleting reply: ${deleteError.message}`,
      error: deleteError,
    };
  }

  return {
    success: true,
    message: "Reply deleted successfully",
  };
}
