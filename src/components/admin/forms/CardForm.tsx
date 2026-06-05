"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createCardAction } from "@/lib/actions/card";
import { MediaUploader } from "@/components/admin/MediaUploader";

export function CardForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardType, setCardType] = useState<"quote" | "reflection" | "visual">("quote");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("featured", (e.currentTarget.elements.namedItem("featured") as HTMLInputElement).checked.toString());
    formData.append("downloadable", (e.currentTarget.elements.namedItem("downloadable") as HTMLInputElement).checked.toString());

    const result = await createCardAction(formData);

    if (result.success) {
      router.push("/admin/cards");
      router.refresh();
    } else {
      setError(result.error || "حدث خطأ أثناء الحفظ");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-kufi bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نوع البطاقة</label>
          <select 
            name="type" 
            value={cardType} 
            onChange={(e) => setCardType(e.target.value as any)} 
            className="w-full px-3 py-2 border rounded-md focus:ring-karbala-gold focus:border-karbala-gold"
          >
            <option value="quote">مقولة / اقتباس</option>
            <option value="reflection">تأمل / خطوة عملية</option>
            <option value="visual">بطاقة مرئية (صورة)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">حالة النشر</label>
          <select name="status" className="w-full px-3 py-2 border rounded-md focus:ring-karbala-gold focus:border-karbala-gold">
            <option value="published">منشور</option>
            <option value="draft">مسودة</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">العنوان الرئيسي للبطاقة</label>
          <input type="text" name="title" required className="w-full px-3 py-2 border rounded-md" placeholder={cardType === "quote" ? "مقولة" : "تأمل"} />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            محتوى البطاقة (النص الأساسي)
          </label>
          <textarea name="content" required rows={4} className="w-full px-3 py-2 border rounded-md" />
        </div>

        {cardType === "quote" && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">القائل (المصدر)</label>
            <input type="text" name="seo_description" className="w-full px-3 py-2 border rounded-md" placeholder="مثل: النبي محمد (ص)" />
          </div>
        )}

        {cardType === "visual" && (
          <div className="md:col-span-2">
            <MediaUploader name="image" label="صورة البطاقة" accept="image/*" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">مرتبطة بليلة (اختياري)</label>
          <input type="number" name="night_id" min="1" placeholder="رقم الليلة (ID)" className="w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="md:col-span-2 flex items-center gap-6 pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" defaultChecked className="w-4 h-4 text-karbala-gold focus:ring-karbala-gold" />
            <span className="text-sm text-gray-700">تمييز البطاقة (عرضها في الرئيسية)</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="downloadable" defaultChecked className="w-4 h-4 text-karbala-gold focus:ring-karbala-gold" />
            <span className="text-sm text-gray-700">السماح بتحميل البطاقة</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100 mt-6">
        <button
          type="submit"
          disabled={loading}
          className="py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-karbala-gold hover:bg-karbala-gold-dark transition-colors disabled:opacity-70"
        >
          {loading ? "جاري الحفظ..." : "حفظ البطاقة"}
        </button>
      </div>
    </form>
  );
}
