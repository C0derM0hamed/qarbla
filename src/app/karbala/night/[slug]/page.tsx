/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import React from "react";
import { getNightBySlug, getAllNightSlugs } from "@/lib/queries";
import { notFound } from "next/navigation";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { QuoteCard, ReflectionCard } from "@/components/cards/ContentCards";
import { ShareButton } from "@/components/ui/ShareButton";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

// Generate static params for all published nights
export async function generateStaticParams() {
  // Mock data for build until Supabase is connected
  return [{ slug: 'night-1' }, { slug: 'night-2' }];
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Mock data for build until Supabase is connected
  return {
    title: `الليلة - ${params.slug}`,
    description: "وصف الليلة",
  };
}

export default async function NightPage({ params }: { params: { slug: string } }) {
  // We'll use mock data if DB isn't seeded yet for dev purposes
  // const night = await getNightBySlug(params.slug);
  // if (!night) notFound();
  
  // For now, let's use mock data to show the layout since DB is empty
  const night = {
    title: "عنوان الليلة",
    number: 1,
    cover_image: null,
    short_description: "وصف قصير لليلة المعرفية يوضح الفكرة العامة.",
    teaser: "ما الذي يجعل هذه الليلة مهمة في مسار الوعي الحسيني؟",
    central_idea: "الفكرة المركزية تدور حول مفهوم التضحية والوعي.",
    why_important: "أهمية هذه الليلة تكمن في تأسيس قواعد الوعي.",
    audio_file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    pdf_file: "#",
    quote: "إن الحسين مصباح الهدى وسفينة النجاة",
    quote_author: "النبي محمد (ص)",
    reflection_question: "كيف نطبق مبدأ الحرية في حياتنا؟",
    practical_step: "ابحث عن موقف يحتاج لقول كلمة حق وكن شجاعاً.",
    topics: [
      { id: '1', title: "المحور الأول", content: "تفاصيل المحور الأول هنا" },
    ],
    verses: [
      { id: '1', content: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", surah_name: "الطلاق", verse_number: "3" }
    ],
    narrations: [
      { id: '1', content: "من مات ولم يعرف إمام زمانه مات ميتة جاهلية", source: "الكافي" }
    ],
    resources: [
      { id: '1', title: "كتاب الوعي الحسيني", category: "book", url: "#" }
    ],
    cards: [],
    attachments: []
  } as any; // Using any for mock

  return (
    <div className="pb-8xl">
      {/* Breadcrumb & Navigation */}
      <div className="section-container pt-32 pb-4 flex items-center justify-between border-b border-[rgba(212,185,138,0.12)]">
        <nav className="flex items-center gap-2 font-kufi text-body-sm text-karbala-secondary">
          <Link href="/karbala" className="hover:text-karbala-gold transition-colors">
            الرئيسية
          </Link>
          <span className="text-karbala-gray">/</span>
          <Link href="/karbala#nights" className="hover:text-karbala-gold transition-colors">
            الليالي
          </Link>
          <span className="text-karbala-gray">/</span>
          <span className="text-karbala-gold">الليلة {night.number}</span>
        </nav>
        
        <ShareButton title={night.title} />
      </div>

      {/* Hero Section */}
      <section className="section-container mt-4xl mb-6xl text-center max-w-prose">
        <h1 className="font-scheherazade text-display-h1 text-karbala-gold mb-4 leading-tight">
          {night.title}
        </h1>
        {night.short_description && (
          <p className="font-kufi text-body-lg text-karbala-gold-light leading-relaxed">
            {night.short_description}
          </p>
        )}
      </section>

      {/* Audio Player if available */}
      {night.audio_file && (
        <section className="section-container max-w-prose mb-6xl">
          <AudioPlayer src={night.audio_file} title={`تسجيل الليلة ${night.number}`} />
        </section>
      )}

      {/* Central Idea & Importance */}
      <section className="section-container max-w-prose mb-6xl space-y-xl text-karbala-white font-kufi text-body-md leading-relaxed">
        {night.teaser && <p className="text-karbala-gold-light italic text-center text-lg">{night.teaser}</p>}
        {night.central_idea && (
          <div>
            <h3 className="text-karbala-gold mb-2 text-xl font-scheherazade">الفكرة المركزية</h3>
            <p>{night.central_idea}</p>
          </div>
        )}
        {night.why_important && (
          <div>
            <h3 className="text-karbala-gold mb-2 text-xl font-scheherazade">لماذا هذا الموضوع مهم؟</h3>
            <p>{night.why_important}</p>
          </div>
        )}
      </section>

      {/* Main Quote */}
      {night.quote && (
        <section className="section-container max-w-prose mb-6xl">
           <QuoteCard card={{ type: 'quote', title: 'اقتباس الليلة', content: night.quote, seo_description: night.quote_author, id: '', slug: '', status: 'published', downloadable: false, featured: false, sort_order: 0, night_id: null, image: null, seo_title: null, created_at: '', updated_at: '' }} />
        </section>
      )}

      {/* Topics */}
      {night.topics && night.topics.length > 0 && (
        <section className="section-container max-w-prose mb-6xl space-y-4xl">
          <SectionDivider title="محاور الليلة" />
          <div className="space-y-3xl mt-4xl">
            {night.topics.map((topic: any, index: number) => (
              <div key={topic.id || index}>
                <h3 className="font-scheherazade text-display-h3 text-karbala-gold-light mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full border border-[rgba(212,185,138,0.3)] flex items-center justify-center text-sm">
                    {index + 1}
                  </span>
                  {topic.title}
                </h3>
                {topic.content && (
                  <div 
                    className="font-kufi text-body-md text-karbala-white leading-relaxed prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: topic.content }} 
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quran Verses & Narrations */}
      {(night.verses?.length > 0 || night.narrations?.length > 0) && (
        <section className="section-container max-w-prose mb-6xl space-y-4xl">
          <SectionDivider title="شواهد الليلة" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl mt-4xl">
            {/* Verses */}
            {night.verses?.map((verse: any, idx: number) => (
              <div key={idx} className="card-base p-lg text-center relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-6xl opacity-5 font-scheherazade text-karbala-gold">﴾</div>
                <div className="absolute -bottom-4 -left-4 text-6xl opacity-5 font-scheherazade text-karbala-gold">﴿</div>
                <p className="font-scheherazade text-xl text-karbala-gold-light leading-relaxed mb-4 relative z-10">
                  ﴿ {verse.content} ﴾
                </p>
                <Badge variant="muted">{verse.surah_name} - {verse.verse_number}</Badge>
              </div>
            ))}

            {/* Narrations */}
            {night.narrations?.map((narration: any, idx: number) => (
              <div key={idx} className="card-base p-lg text-center">
                <p className="font-kufi text-body-md text-karbala-white leading-relaxed mb-4">
                  "{narration.content}"
                </p>
                {narration.source && <Badge variant="muted">{narration.source}</Badge>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reflection & Action */}
      {(night.reflection_question || night.practical_step) && (
        <section className="section-container max-w-prose mb-6xl">
           <div className="border border-gold-medium bg-[rgba(212,185,138,0.05)] rounded-xl p-2xl">
             <h3 className="font-scheherazade text-display-h3 text-karbala-gold text-center mb-xl">للتأمل والعمل</h3>
             
             <div className="space-y-xl">
               {night.reflection_question && (
                 <div>
                   <h4 className="font-kufi text-sm text-karbala-gold-dark mb-2 uppercase tracking-widest">سؤال للتأمل</h4>
                   <p className="font-kufi text-lg text-karbala-white">{night.reflection_question}</p>
                 </div>
               )}
               
               {night.practical_step && (
                 <div>
                   <h4 className="font-kufi text-sm text-karbala-gold-dark mb-2 uppercase tracking-widest">خطوة عملية</h4>
                   <p className="font-kufi text-lg text-karbala-white">{night.practical_step}</p>
                 </div>
               )}
             </div>
           </div>
        </section>
      )}
      
      {/* Resources & PDF */}
      {(night.resources?.length > 0 || night.pdf_file) && (
        <section className="section-container max-w-prose mb-6xl text-center">
          <SectionDivider title="مواد مساندة" />
          
          <div className="mt-4xl flex flex-wrap justify-center gap-4">
             {night.pdf_file && (
                <a href={night.pdf_file} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-karbala-gold text-karbala-gold rounded-pill hover:bg-[rgba(212,185,138,0.1)] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  تحميل الملخص (PDF)
                </a>
             )}

             {night.resources?.map((res: any) => (
                <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-gold-medium text-karbala-secondary rounded-pill hover:border-karbala-gold hover:text-karbala-gold transition-colors">
                   <span className="text-sm">🔗</span> {res.title}
                </a>
             ))}
          </div>
        </section>
      )}

    </div>
  );
}
