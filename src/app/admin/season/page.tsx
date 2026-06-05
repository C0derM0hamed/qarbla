"use client";

import React, { useState } from "react";

export default function SeasonAdminPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "الموسم الأول — ١٣ ليلة معرفية",
    subtitle: "رحلة معرفية في الوعي الحسيني",
    intro: "موسم معرفي يهدف إلى إثراء الوعي الحسيني من خلال محاضرات ومحتوى تعليمي متميز",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("تم حفظ بيانات الموسم بنجاح!");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="font-kufi max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-scheherazade">إدارة الموسم</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
        
        {/* Toggle Status */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-medium text-gray-900">حالة الموسم</h3>
            <p className="text-sm text-gray-500">تفعيل أو تعطيل عرض هذا الموسم للجمهور.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="isActive"
              className="sr-only peer" 
              checked={formData.isActive}
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-karbala-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-karbala-gold ltr:peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
            <span className="mr-3 text-sm font-medium text-gray-900">
              {formData.isActive ? "نشط" : "غير نشط"}
            </span>
          </label>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الموسم</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-karbala-gold focus:border-karbala-gold"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">العنوان الفرعي</label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-karbala-gold focus:border-karbala-gold"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">مقدمة الموسم</label>
            <textarea
              name="intro"
              rows={3}
              value={formData.intro}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-karbala-gold focus:border-karbala-gold"
            />
          </div>
        </div>

        {/* Media Placeholders (Phase 5 requirement) */}
        <div className="pt-6 border-t border-gray-100 space-y-6">
          <h3 className="text-lg font-medium text-gray-900">الوسائط</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف (Hero)</label>
               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-karbala-gold transition-colors cursor-pointer bg-gray-50">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-karbala-gold hover:text-karbala-gold-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-karbala-gold">
                        انقر للرفع
                      </span>
                      <p className="pr-1">أو اسحب وأفلت الصورة هنا</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP حتى 5MB</p>
                  </div>
               </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">الشعار (Logo)</label>
               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-karbala-gold transition-colors cursor-pointer bg-gray-50">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative cursor-pointer bg-white rounded-md font-medium text-karbala-gold hover:text-karbala-gold-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-karbala-gold">
                        انقر للرفع
                      </span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-karbala-gold hover:bg-karbala-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-karbala-gold transition-colors disabled:opacity-70"
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
