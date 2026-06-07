import React from "react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { createAuthenticatedServerClient } from "@/lib/supabase/server";
import { DataTable } from "@/components/admin/DataTable";
import { deleteQuizAction } from "@/lib/actions/quiz";

export const metadata = { title: "الاختبارات | لوحة التحكم" };

export default async function AdminQuizzesPage() {
  const supabase = await createAuthenticatedServerClient();

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*, nights(number, title)")
    .order("created_at", { ascending: false });

  return (
    <div className="font-kufi space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 font-scheherazade text-karbala-gold">
          إدارة الاختبارات
        </h1>
        <Link
          href="/admin/quizzes/new"
          className="px-4 py-2 bg-karbala-gold text-white rounded-md hover:bg-karbala-gold-dark transition-colors text-sm"
        >
          + إنشاء اختبار
        </Link>
      </div>

      <DataTable
        data={quizzes ?? []}
        keyExtractor={(row) => row.id}
        columns={[
          {
            header: "الليلة",
            accessor: (row) =>
              row.nights ? `الليلة ${row.nights.number}: ${row.nights.title}` : "—",
          },
          { header: "العنوان", accessor: (row) => row.title || "—" },
          {
            header: "الحالة",
            accessor: (row) => (
              <span className={`px-2 py-1 rounded-full text-xs ${row.is_enabled ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {row.is_enabled ? "مفعّل" : "معطّل"}
              </span>
            ),
          },
          {
            header: "يفتح في",
            accessor: (row) =>
              row.opens_at ? new Date(row.opens_at).toLocaleString("ar") : "فوراً",
          },
          {
            header: "إجراءات",
            accessor: (row) => (
              <div className="flex items-center gap-3">
                <Link href={`/admin/quizzes/${row.id}`} className="text-karbala-gold hover:underline text-sm">
                  تعديل
                </Link>
                <form action={async () => {
                  "use server";
                  await deleteQuizAction(row.id);
                  revalidatePath("/admin/quizzes");
                }}>
                  <button type="submit" className="text-red-600 hover:text-red-800 text-sm">
                    حذف
                  </button>
                </form>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
