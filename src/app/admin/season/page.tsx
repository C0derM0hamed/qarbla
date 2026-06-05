"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

type SeasonData = {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  hero_image: string | null;
  logo_image: string | null;
  is_active: boolean;
};

export default function SeasonAdminPage() {
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<SeasonData>({
    id: "",
    title: "الموسم الأول — ١٣ ليلة معرفية",
    subtitle: "رحلة معرفية في الوعي الحسيني",
    intro: "موسم معرفي يهدف إلى إثراء الوعي الحسيني من خلال محاضرات ومحتوى تعليمي متميز",
    hero_image: null,
    logo_image: null,
    is_active: true,
  });

  const heroInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Load season data on mount
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("seasons")
        .select("*")
        .eq("is_active", true)
        .single();
      if (data) setFormData(data as SeasonData);
    }
    load();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const uploadFile = async (
    file: File,
    path: string,
    setUploading: (v: boolean) => void,
    field: "hero_image" | "logo_image"
  ) => {
    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const filename = `${path}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filename, file, { upsert: true });

    if (uploadError) {
      setError(`فشل رفع الصورة: ${uploadError.message}`);
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage
      .from("media")
      .getPublicUrl(filename);

    setFormData(prev => ({ ...prev, [field]: urlData.publicUrl }));
    setUploading(false);
  };

  const handleHeroUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file, "season/hero", setUploadingHero, "hero_image");
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file, "season/logo", setUploadingLogo, "logo_image");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload = {
      title: formData.title,
      subtitle: formData.subtitle,
      intro: formData.intro,
      hero_image: formData.hero_image,
      logo_image: formData.logo_image,
      is_active: formData.is_active,
      updated_at: new Date().toISOString(),
    };

    let saveError;
    if (formData.id) {
      const { error } = await supabase
        .from("seasons")
        .update(payload)
        .eq("id", formData.id);
      saveError = error;
    } else {
      const { error } = await supabase
        .from("seasons")
        .insert(payload);
      saveError = error;
    }

    setSaving(false);

    if (saveError) {
      setError(`فشل الحفظ: ${saveError.message}`);
    } else {
      setSuccess("تم حفظ بيانات الموسم بنجاح!");
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  return (
    <div className="font-kufi max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-scheherazade">إدارة الموسم</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Toggle Status */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-medium text-gray-900">حالة الموسم</h3>
            <p className="text-sm text-gray-500">تفعيل أو تعطيل عرض هذا الموسم للجمهور.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              className="sr-only peer"
              checked={formData.is_active}
              onChange={handleChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-karbala-gold/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-karbala-gold ltr:peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
            <span className="mr-3 text-sm font-medium text-gray-900">
              {formData.is_active ? "نشط" : "غير نشط"}
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

        {/* Media Upload */}
        <div className="pt-6 border-t border-gray-100 space-y-6">
          <h3 className="text-lg font-medium text-gray-900">الوسائط</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hero Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف (Hero)</label>
              {formData.hero_image ? (
                <div className="relative rounded-md overflow-hidden border border-gray-200 mb-2 h-32">
                  <Image src={formData.hero_image} alt="Hero" fill className="object-cover" />
                </div>
              ) : null}
              <div
                onClick={() => heroInputRef.current?.click()}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-karbala-gold transition-colors cursor-pointer bg-gray-50"
              >
                <div className="space-y-1 text-center">
                  {uploadingHero ? (
                    <p className="text-sm text-karbala-gold">جاري الرفع...</p>
                  ) : (
                    <>
                      <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-sm text-karbala-gold font-medium">انقر للرفع</p>
                      <p className="text-xs text-gray-500">PNG, JPG, WEBP حتى 5MB</p>
                    </>
                  )}
                </div>
              </div>
              <input
                ref={heroInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleHeroUpload}
              />
            </div>

            {/* Logo Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الشعار (Logo)</label>
              {formData.logo_image ? (
                <div className="relative rounded-md overflow-hidden border border-gray-200 mb-2 h-32 bg-gray-100 flex items-center justify-center">
                  <Image src={formData.logo_image} alt="Logo" fill className="object-contain p-2" />
                </div>
              ) : null}
              <div
                onClick={() => logoInputRef.current?.click()}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-karbala-gold transition-colors cursor-pointer bg-gray-50"
              >
                <div className="space-y-1 text-center">
                  {uploadingLogo ? (
                    <p className="text-sm text-karbala-gold">جاري الرفع...</p>
                  ) : (
                    <>
                      <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-sm text-karbala-gold font-medium">انقر للرفع</p>
                      <p className="text-xs text-gray-500">PNG, SVG, WEBP حتى 2MB</p>
                    </>
                  )}
                </div>
              </div>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/svg+xml,image/webp"
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={saving || uploadingHero || uploadingLogo}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-karbala-gold hover:bg-karbala-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-karbala-gold transition-colors disabled:opacity-70"
          >
            {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
