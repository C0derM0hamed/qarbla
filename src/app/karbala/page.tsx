import React from "react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { HeroSection } from "@/components/sections/HeroSection";
import { NightsCarousel } from "@/components/sections/NightsCarousel";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { QuoteCard, ReflectionCard } from "@/components/cards/ContentCards";
import { getPublishedNights, getFeaturedCards, getActiveSeason } from "@/lib/queries";

export default async function KarbalaPage() {
  // Fetch real data from Supabase
  const [nights, featuredCards, season] = await Promise.all([
    getPublishedNights(),
    getFeaturedCards(),
    getActiveSeason(),
  ]);

  // Map nights to the format NightsCarousel expects
  const nightsForCarousel = nights.map((n) => ({
    id: n.id,
    number: n.number,
    title: n.title,
    slug: n.slug,
    isLocked: false,
  }));

  return (
    <div>
      <HeroSection 
        heroImage={season?.hero_image || "/hero.png"} 
        logoImage={season?.logo_image || "/icon.png"}
        title={season?.title || undefined}
        subtitle={season?.subtitle || undefined}
        intro={season?.intro || undefined}
      />

      {/* Nights Section */}
      <section id="nights" className="section-spacing overflow-hidden">
        <div className="section-container">
          <SectionDivider title="ليالي الموسم" />
          <div className="mt-4xl relative">
            <NightsCarousel nights={nightsForCarousel} />
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
            {featuredCards.length > 0 ? (
              featuredCards.map(card => (
                card.type === 'quote' ? (
                  <QuoteCard key={card.id} card={card} />
                ) : card.type === 'reflection' ? (
                  <ReflectionCard key={card.id} card={card} />
                ) : null
              ))
            ) : (
              <p className="text-karbala-secondary font-kufi col-span-full text-center">لا توجد بطاقات مميزة حالياً</p>
            )}
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
