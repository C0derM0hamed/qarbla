/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import React from "react";
// import { getCardBySlug, getAllCardSlugs } from "@/lib/queries";
import { notFound } from "next/navigation";
import Link from "next/link";
import { QuoteCard, ReflectionCard } from "@/components/cards/ContentCards";
import { ShareButton } from "@/components/ui/ShareButton";
import { Button } from "@/components/ui/Button";

export async function generateStaticParams() {
  // const slugs = await getAllCardSlugs();
  // return slugs.map((slug) => ({ slug }));
  return [{ slug: 'quote-1' }, { slug: 'reflection-1' }];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  // const card = await getCardBySlug(params.slug);
  // if (!card) return {};
  
  return {
    title: `بطاقة - ${params.slug}`,
    description: "محتوى البطاقة",
  };
}

export default async function CardDetailPage({ params }: { params: { slug: string } }) {
  // const card = await getCardBySlug(params.slug);
  // if (!card) notFound();

  // Mock data
  const card: any = {
    id: "1",
    slug: params.slug,
    type: params.slug.includes("quote") ? "quote" : "reflection",
    title: params.slug.includes("quote") ? "مقولة" : "تأمل",
    content: params.slug.includes("quote") ? "إن الحسين مصباح الهدى وسفينة النجاة" : "كيف يمكننا تجسيد مبادئ عاشوراء في حياتنا اليومية؟",
    seo_description: params.slug.includes("quote") ? "النبي محمد (ص)" : null,
    downloadable: true,
    image: null,
  };

  return (
    <div className="pb-8xl min-h-screen">
      {/* Breadcrumb */}
      <div className="section-container pt-32 pb-4 flex items-center justify-between border-b border-[rgba(212,185,138,0.12)]">
        <nav className="flex items-center gap-2 font-kufi text-body-sm text-karbala-secondary">
          <Link href="/karbala" className="hover:text-karbala-gold transition-colors">
            الرئيسية
          </Link>
          <span className="text-karbala-gray">/</span>
          <Link href="/karbala/cards" className="hover:text-karbala-gold transition-colors">
            البطاقات
          </Link>
          <span className="text-karbala-gray">/</span>
          <span className="text-karbala-gold">{card.title}</span>
        </nav>
      </div>

      <div className="section-container mt-4xl flex flex-col items-center">
        {/* Card Display */}
        <div className="w-full max-w-[500px]">
          {card.type === "quote" ? (
            <QuoteCard card={card} />
          ) : card.type === "reflection" ? (
             <ReflectionCard card={card} />
          ) : card.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={card.image} alt={card.title} className="w-full rounded-lg border border-gold-card" />
          ) : (
            <div className="card-base p-6 text-center">لا يوجد محتوى للبطاقة</div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-2xl flex flex-wrap gap-4 justify-center">
          <ShareButton title={card.title} />
          
          {card.downloadable && (
            <Button variant="primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              تحميل البطاقة
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
