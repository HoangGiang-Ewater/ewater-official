// app/[lang]/(admin)/layout.jsx
"use client";
import AdminLayout from "@/app/_components/admin/AdminLayout";
import { Toaster } from "sonner";
import TableContextProvider from "@/contexts/TableContext";
import { supabase } from "@/lib/supabaseClient";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { redirect, useParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const params = useParams();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      // Allow access to login page without auth
      if (window.location.pathname.includes("/login")) return;

      if (!user || error) {
        redirect(`/${params.lang}/admin/login`);
      } else {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_super_admin")
          .eq("id", user.id)
          .single();

        if (!profile?.is_super_admin) {
          redirect(`/${params.lang}`);
        }
      }
    };
    checkAuth();
  }, [params.lang]);

  return (
    <ReactQueryProvider>
      <div className="admin-container">
        <TableContextProvider>
          <AdminLayout>{children}</AdminLayout>
        </TableContextProvider>
        <Toaster richColors />
      </div>
    </ReactQueryProvider>
  );
}
