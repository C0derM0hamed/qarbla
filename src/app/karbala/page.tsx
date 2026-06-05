import React from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HeroSection } from "@/components/sections/HeroSection";
import { NightsCarousel } from "@/components/sections/NightsCarousel";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { QuoteCard, ReflectionCard } from "@/components/cards/ContentCards";

// Mock data for initial development - will be replaced by DB queries in Phase 6
const MOCK_NIGHTS = Array.from({ length: 13 }, (_, i) => ({
  id: `night-${i + 1}`,
  number: i + 1,
  title: `عنوان الليلة ${i + 1}`,
  slug: `night-${i + 1}`,
  isLocked: i > 2, // First 3 are unlocked for demo
}));

const MOCK_CARDS = [
  {
    id: "card-1",
    type: "quote" as const,
    title: "مقولة",
    content: "إن الحسين مصباح الهدى وسفينة النجاة",
    slug: "quote-1",
    seo_description: "النبي محمد (ص)",
    status: "published" as const,
    downloadable: false,
    featured: true,
    sort_order: 1,
    night_id: null,
    image: null,
    seo_title: null,
    created_at: "",
    updated_at: "",
  },
  {
    id: "card-2",
    type: "reflection" as const,
    title: "تأمل",
    content: "كيف يمكننا تجسيد مبادئ عاشوراء في حياتنا اليومية؟",
    slug: "reflection-1",
    status: "published" as const,
    downloadable: false,
    featured: true,
    sort_order: 2,
    night_id: null,
    image: null,
    seo_title: null,
    seo_description: null,
    created_at: "",
    updated_at: "",
  },
];

export default function KarbalaPage() {
  return (
    <div>
      <HeroSection 
        heroImage="/hero.png" 
        logoImage="/icon.png"
      />

      {/* Nights Section */}
      <section id="nights" className="section-spacing overflow-hidden">
        <div className="section-container">
          <SectionDivider title="ليالي الموسم" />
          <div className="mt-4xl relative">
            {/* The carousel container extends outside slightly, so we wrap it nicely */}
            <NightsCarousel nights={MOCK_NIGHTS} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing bg-[rgba(13,11,9,0.5)] border-y border-gold-subtle relative">
        <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-[0.03] pointer-events-none" />
        <div className="section-container relative z-10">
          <SectionDivider title="محتوى المنصة" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-xl mt-4xl">
            <FeatureCard 
              title="محاضرات عميقة" 
              description="طرح فكري وتأصيلي لقضايا عاشوراء" 
              iconType="microphone" 
            />
            <FeatureCard 
              title="مواد مساندة" 
              description="نصوص، وثائق، وكتب تدعم البحث" 
              iconType="document" 
            />
            <FeatureCard 
              title="مكتبة مرئية" 
              description="توثيق بصري وحلقات مسجلة" 
              iconType="film" 
            />
            <FeatureCard 
              title="تأملات حية" 
              description="أسئلة وخطوات عملية للتطبيق" 
              iconType="bell" 
            />
          </div>
        </div>
      </section>

      {/* Featured Content / Cards Section */}
      <section className="section-spacing">
        <div className="section-container">
          <SectionDivider title="مقتطفات" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl mt-4xl">
            {MOCK_CARDS.map(card => (
              card.type === 'quote' ? (
                <QuoteCard key={card.id} card={card} />
              ) : card.type === 'reflection' ? (
                <ReflectionCard key={card.id} card={card} />
              ) : null
            ))}
            {/* Duplicate quote for layout balancing */}
            <QuoteCard key="card-3" card={MOCK_CARDS[0]} />
          </div>
          
          <div className="mt-4xl text-center">
            <a href="/karbala/cards" className="inline-flex items-center text-karbala-gold hover:text-karbala-gold-light transition-colors group">
              <span className="font-kufi ml-2">تصفح جميع البطاقات</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                 <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
