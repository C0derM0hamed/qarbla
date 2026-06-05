import React from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const metadata = { title: "تعديل مرفق | لوحة التحكم" };

export default async function EditAttachmentPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  
  // Fetch attachment and nights
  const [{ data: attachment }, { data: nights }] = await Promise.all([
    supabase.from("attachments").select("*").eq("id", params.id).single(),
    supabase.from("nights").select("id, title").order("number", { ascending: true })
  ]);

  if (!attachment) notFound();

  async function updateAttachment(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const file_url = formData.get("file_url") as string;
    const type = formData.get("type") as string;
    const night_id = formData.get("night_id") as string || null;

    const adminSupabase = createAdminClient();
    await adminSupabase.from("attachments").update({
      title,
      file_url,
      type,
      night_id,
      updated_at: new Date().toISOString()
    }).eq("id", params.id);

    revalidatePath("/admin/attachments");
    redirect("/admin/attachments");
  }

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-gray-100 font-kufi">
      <h1 className="text-2xl font-bold mb-6 font-scheherazade text-karbala-gold">تعديل مرفق</h1>
      <form action={updateAttachment} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الليلة التابع لها (اختياري)</label>
          <select name="night_id" defaultValue={attachment.night_id || ""} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold">
            <option value="">-- عام (لا يتبع ليلة محددة) --</option>
            {nights?.map(n => (
              <option key={n.id} value={n.id}>{n.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المرفق</label>
          <input type="text" name="title" defaultValue={attachment.title} required className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">رابط الملف</label>
          <input type="url" name="file_url" defaultValue={attachment.file_url} required dir="ltr" className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold text-left" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نوع المرفق</label>
          <select name="type" defaultValue={attachment.type} required className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold">
            <option value="pdf">ملف PDF</option>
            <option value="audio">صوتي</option>
            <option value="image">صورة</option>
          </select>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <a href="/admin/attachments" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">إلغاء</a>
          <button type="submit" className="px-4 py-2 bg-karbala-gold text-white rounded-md hover:bg-karbala-gold-dark transition-colors shadow-sm">حفظ التعديلات</button>
        </div>
      </form>
    </div>
  );
}
