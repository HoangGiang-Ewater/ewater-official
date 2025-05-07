// components/AdminAuth.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminAuth({ children, lang = "en" }) {
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.push(`/${lang}/admin/login`);
        return;
      }

      // More resilient profile check
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("is_super_admin")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Profile lookup error:", profileError);
        router.push(`/${lang}/admin/login`);
        return;
      }

      if (!profile?.is_super_admin) {
        router.push(`/${lang}`);
      }
    };

    checkAdmin();
  }, [lang, router]);

  return <>{children}</>;
}
