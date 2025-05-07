// app/_components/admin/AdminLayout.jsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({ children }) {
  const { lang } = useParams();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = `/${lang}/admin/login`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <Link href={`/${lang}/admin/dashboard`}>Dashboard</Link>
              <Link href={`/${lang}/admin/seed-data`}>Seed Data</Link>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
