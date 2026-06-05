import React from "react";
import { CardForm } from "@/components/admin/forms/CardForm";
import Link from "next/link";

export const metadata = {
  title: "إضافة بطاقة جديدة | لوحة التحكم",
};

export default function NewCardPage() {
  return (
    <div className="max-w-3xl mx-auto font-kufi">
      <div className="mb-8">
        <Link href="/admin/cards" className="text-sm text-gray-500 hover:text-karbala-gold mb-4 inline-block">
          &rarr; العودة إلى قائمة البطاقات
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 font-scheherazade">إضافة بطاقة جديدة</h1>
      </div>

      <CardForm />
    </div>
  );
}
