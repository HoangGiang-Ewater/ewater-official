// app/[lang]/admin/dashboard/page.jsx
import AdminLayout from "@/app/_components/admin/AdminLayout";
import AdminAuth from "@/app/_components/admin/AdminAuth";

export default function AdminDashboardPage({ params: { lang } }) {
  return (
    <AdminAuth lang={lang}>
      <AdminLayout>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Admin Dashboard
          </h2>
          <p className="text-gray-600">Welcome to your admin panel.</p>
        </div>
      </AdminLayout>
    </AdminAuth>
  );
}
