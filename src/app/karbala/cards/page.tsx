import React from "react";
import { CardsGrid } from "@/components/cards/CardsGrid";
// import { getPublishedCards } from "@/lib/queries";
import type { Card } from "@/types/database";

export const metadata = {
  title: "البطاقات والمقتطفات",
  description: "بطاقات، مقتطفات، وتأملات من ليالي وعي يمر من كربلاء",
};

export default async function CardsPage() {
  // const cards = await getPublishedCards();
  
  // Mock data for Phase 4 before DB is seeded
  const mockCards: Card[] = [
    {
      id: "1",
      slug: "quote-1",
      type: "quote",
      title: "مقولة",
      content: "إن الحسين مصباح الهدى وسفينة النجاة",
      seo_description: "النبي محمد (ص)",
      status: "published",
      downloadable: true,
      featured: true,
      sort_order: 1,
      night_id: null,
      image: null,
      seo_title: null,
      created_at: "",
      updated_at: "",
    },
    {
      id: "2",
      slug: "reflection-1",
      type: "reflection",
      title: "تأمل",
      content: "كيف يمكننا تجسيد مبادئ عاشوراء في حياتنا اليومية؟",
      status: "published",
      downloadable: false,
      featured: true,
      sort_order: 2,
      night_id: null,
      image: null,
      seo_title: null,
      seo_description: null,
      created_at: "",
      updated_at: "",
    }
  ];

  return (
    <div className="pt-32 min-h-screen">
      <div className="section-container text-center mb-6xl">
        <h1 className="font-scheherazade text-display-h1 text-karbala-gold mb-4 leading-tight">
          البطاقات
        </h1>
        <p className="font-kufi text-body-lg text-karbala-secondary">
          مقتطفات، تأملات، وبطاقات مرئية للإلهام والمشاركة
        </p>
      </div>

      <CardsGrid initialCards={mockCards} />
    </div>
  );
}
