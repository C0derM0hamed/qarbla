import React from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import { MediaUploader } from "@/components/admin/MediaUploader";

export const metadata = { title: "إضافة مرفق جديد | لوحة التحكم" };

export default async function NewAttachmentPage() {
  const supabase = createServerClient();
  const { data: nights } = await supabase.from("nights").select("id, title").order("number", { ascending: true });

  async function createAttachment(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const type = formData.get("type") as string;
    const night_id = formData.get("night_id") as string || null;
    const file = formData.get("file") as File;

    if (!file || file.size === 0) {
      // Need a file! (In a real app, handle error more gracefully)
      throw new Error("File is required");
    }

    const adminSupabase = createAdminClient();
    
    // Upload file
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const filename = `attachments/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await adminSupabase.storage
      .from("media")
      .upload(filename, buffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { data: urlData } = adminSupabase.storage.from("media").getPublicUrl(filename);
    const file_url = urlData.publicUrl;

    await adminSupabase.from("attachments").insert({
      title,
      file_url,
      type,
      night_id,
    });

    revalidatePath("/admin/attachments");
    redirect("/admin/attachments");
  }

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-gray-100 font-kufi">
      <h1 className="text-2xl font-bold mb-6 font-scheherazade text-karbala-gold">إضافة مرفق جديد</h1>
      <form action={createAttachment} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الليلة التابع لها (اختياري)</label>
          <select name="night_id" className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold">
            <option value="">-- عام (لا يتبع ليلة محددة) --</option>
            {nights?.map(n => (
              <option key={n.id} value={n.id}>{n.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المرفق</label>
          <input type="text" name="title" required className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نوع المرفق</label>
          <select name="type" required className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold mb-4">
            <option value="pdf">ملف PDF</option>
            <option value="audio">صوتي</option>
            <option value="image">صورة</option>
          </select>
        </div>
        <div>
          <MediaUploader 
            name="file" 
            label="ملف المرفق" 
            accept="*/*" 
            description="الرجاء اختيار الملف المناسب"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <a href="/admin/attachments" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">إلغاء</a>
          <button type="submit" className="px-4 py-2 bg-karbala-gold text-white rounded-md hover:bg-karbala-gold-dark transition-colors shadow-sm">حفظ المرفق</button>
        </div>
      </form>
    </div>
  );
}
