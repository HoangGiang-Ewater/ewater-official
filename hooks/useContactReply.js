import { supabase } from "@/lib/supabaseClient";
import { useQuery } from "@tanstack/react-query";

// Fetch reply for contact
function useContactReply(contactId) {
  return useQuery({
    queryKey: ["contact-reply", contactId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_replied")
        .select("*")
        .eq("contact_id", contactId)
        .single();
      if (error && error.code !== "PGRST116") throw error; // ignore "no rows" error
      return data;
    },
    enabled: !!contactId,
  });
}

export default useContactReply;
