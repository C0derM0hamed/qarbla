import React from "react";
import Link from "next/link";
import { DataTable } from "@/components/admin/DataTable";
// import { getAdminNights } from "@/lib/queries";

export const metadata = {
  title: "إدارة الليالي | لوحة التحكم",
};

export default async function AdminNightsPage() {
  // Mock data until DB is fully seeded / queries are built
  const nights = [
    { id: "1", number: 1, title: "الليلة الأولى", status: "published" as const, created_at: new Date().toISOString() },
    { id: "2", number: 2, title: "الليلة الثانية", status: "draft" as const, created_at: new Date().toISOString() },
  ];

  return (
    <div className="font-kufi space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 font-scheherazade">إدارة الليالي</h1>
        <Link 
          href="/admin/nights/new" 
          className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-karbala-gold hover:bg-karbala-gold-dark transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          إضافة ليلة جديدة
        </Link>
      </div>

      <DataTable
        data={nights}
        keyExtractor={(row) => row.id}
        columns={[
          { header: "رقم الليلة", accessor: "number" },
          { header: "العنوان", accessor: "title" },
          { 
            header: "الحالة", 
            accessor: (row) => (
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                row.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {row.status === 'published' ? 'منشور' : 'مسودة'}
              </span>
            )
          },
          { 
            header: "تاريخ الإضافة", 
            accessor: (row) => new Date(row.created_at).toLocaleDateString("ar-SA")
          },
          {
            header: "إجراءات",
            accessor: (row) => (
              <div className="flex items-center gap-3">
                <Link href={`/admin/nights/${row.id}`} className="text-karbala-gold hover:text-karbala-gold-dark font-medium">
                  تعديل
                </Link>
                <form action={async () => {
                  "use server";
                  // Add delete logic later
                }}>
                  <button type="submit" className="text-red-600 hover:text-red-800 font-medium">
                    حذف
                  </button>
                </form>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}
