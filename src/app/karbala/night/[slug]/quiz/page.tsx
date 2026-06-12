import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQuizByNightSlug } from "@/lib/queries";
import { QuizGate } from "@/components/quiz/QuizGate";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const quiz = await getQuizByNightSlug(params.slug);
  if (!quiz) return { title: "الاختبار غير متاح" };
  return {
    title: `اختبار الليلة ${quiz.night.number} | وعيٌ يمرّ من كربلاء`,
    description: `اختبر معلوماتك في الليلة ${quiz.night.number}: ${quiz.night.title}`,
  };
}

export default async function NightQuizPage({
  params,
}: {
  params: { slug: string };
}) {
  const quizData = await getQuizByNightSlug(params.slug);
  if (!quizData) notFound();

  return (
    <div className="pb-8xl">
      <div className="section-container pt-32 pb-4 border-b border-[rgba(212,185,138,0.12)]">
        <nav className="flex items-center gap-2 font-kufi text-body-sm text-karbala-secondary">
          <Link href="/karbala" className="hover:text-karbala-gold transition-colors">
            الرئيسية
          </Link>
          <span className="text-karbala-gray">/</span>
          <Link
            href={`/karbala/night/${quizData.night.slug}`}
            className="hover:text-karbala-gold transition-colors"
          >
            الليلة {quizData.night.number}
          </Link>
          <span className="text-karbala-gray">/</span>
          <span className="text-karbala-gold">اختبار المعرفة</span>
        </nav>
      </div>

      <section className="section-container mt-4xl mb-6xl text-center max-w-prose mx-auto">
        <h1 className="font-scheherazade text-display-h2 text-karbala-gold mb-4">
          اختبر معلوماتك
        </h1>
        <p className="font-kufi text-body-lg text-karbala-gold-light">
          الليلة {quizData.night.number}: {quizData.night.title}
        </p>
      </section>

      <section className="section-container">
        <QuizGate quiz={quizData} />
      </section>
    </div>
  );
}

