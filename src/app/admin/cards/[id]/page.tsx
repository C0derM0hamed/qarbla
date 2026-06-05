import React from "react";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const metadata = { title: "تعديل بطاقة | لوحة التحكم" };

export default async function EditCardPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  
  // Fetch card and nights
  const [{ data: card }, { data: nights }] = await Promise.all([
    supabase.from("cards").select("*").eq("id", params.id).single(),
    supabase.from("nights").select("id, title, number").order("number", { ascending: true })
  ]);

  if (!card) notFound();

  async function updateCard(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const type = formData.get("type") as string;
    const status = formData.get("status") as string;
    const night_id = formData.get("night_id") as string || null;
    const featured = formData.get("featured") === "on";
    const downloadable = formData.get("downloadable") === "on";
    const seo_description = formData.get("seo_description") as string;

    const adminSupabase = createAdminClient();
    await adminSupabase.from("cards").update({
      title,
      content,
      type,
      status,
      night_id: night_id || null,
      featured,
      downloadable,
      seo_description,
      updated_at: new Date().toISOString()
    }).eq("id", params.id);

    revalidatePath("/admin/cards");
    revalidatePath("/karbala/cards");
    revalidatePath(`/karbala/cards/${card.slug}`);
    redirect("/admin/cards");
  }

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-sm border border-gray-100 font-kufi">
      <h1 className="text-2xl font-bold mb-6 font-scheherazade text-karbala-gold">تعديل بطاقة: {card.title}</h1>
      <form action={updateCard} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
          <select name="type" defaultValue={card.type} required className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold">
            <option value="quote">مقولة</option>
            <option value="reflection">تأمل</option>
            <option value="visual">مرئية</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
          <input type="text" name="title" defaultValue={card.title} required className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">المحتوى</label>
          <textarea name="content" rows={4} defaultValue={card.content || ""} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الوصف (المصدر أو التوضيح)</label>
          <input type="text" name="seo_description" defaultValue={card.seo_description || ""} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الليلة التابعة لها (اختياري)</label>
          <select name="night_id" defaultValue={card.night_id || ""} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold">
            <option value="">-- بدون ليلة --</option>
            {nights?.map(n => (
              <option key={n.id} value={n.id}>الليلة {n.number}: {n.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
          <select name="status" defaultValue={card.status} required className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:border-karbala-gold focus:ring-karbala-gold">
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
          </select>
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="featured" defaultChecked={card.featured} className="rounded border-gray-300 text-karbala-gold focus:ring-karbala-gold" />
            بطاقة مميزة
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" name="downloadable" defaultChecked={card.downloadable} className="rounded border-gray-300 text-karbala-gold focus:ring-karbala-gold" />
            قابلة للتحميل
          </label>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <a href="/admin/cards" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">إلغاء</a>
          <button type="submit" className="px-4 py-2 bg-karbala-gold text-white rounded-md hover:bg-karbala-gold-dark transition-colors shadow-sm">حفظ التعديلات</button>
        </div>
      </form>
    </div>
  );
}
