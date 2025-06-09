// app/_components/admin/AdminLayout.jsx
"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import AdminAuth from "./AdminAuth";

export default function AdminLayout({ children }) {
  const { lang } = useParams();

  return (
    <AdminAuth lang={lang}>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AdminAuth>
  );
}
