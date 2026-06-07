import React from "react";
import Link from "next/link";
import type { Night } from "@/types/database";

interface NightCardProps {
  night: Pick<Night, "number" | "title" | "slug"> & {
    isLocked?: boolean;
    quiz?: { id: string; is_enabled: boolean; opens_at: string | null } | null;
  };
  isFeatured?: boolean;
}

export function NightCard({ night, isFeatured = false }: NightCardProps) {
  const formattedNumber = night.number.toString().padStart(2, "0");
  const hasQuiz = night.quiz?.is_enabled;

  const cardHeight = hasQuiz ? "h-[320px]" : "h-[280px]";

  const baseClasses = `
    relative block w-[200px] ${cardHeight} shrink-0
    rounded-lg transition-premium
    card-base overflow-hidden group
  `;

  const featuredClasses = isFeatured
    ? "border-[rgba(212,185,138,0.4)] bg-[#232019] shadow-glow scale-[1.05]"
    : "";

  return (
    <div className={`${baseClasses} ${featuredClasses} ${night.isLocked ? 'opacity-80' : ''}`}>
      <Link
        href={night.isLocked ? "#" : `/karbala/night/${night.slug}`}
        className={`block h-full ${night.isLocked ? 'cursor-not-allowed hover:-translate-y-0 hover:shadow-ambient hover:bg-karbala-card hover:border-gold-card' : ''}`}
        aria-disabled={night.isLocked}
      >
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[rgba(212,185,138,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[rgba(212,185,138,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="p-xl h-full flex flex-col relative z-10">
          <div className="flex justify-between items-start mb-auto">
            <div className="flex flex-col rtl:items-end ltr:items-start">
              <span className="font-kufi text-[0.8rem] text-karbala-gray leading-none mb-1">
                الليلة
              </span>
              <span className="font-cinzel text-night-number text-karbala-gold leading-none">
                {formattedNumber}
              </span>
            </div>

            {night.isLocked && (
              <div className="text-karbala-gold opacity-60">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-scheherazade text-[1rem] text-karbala-gold-light line-clamp-2 leading-[1.4] mb-3">
              {night.title}
            </h3>

            <div className="inline-flex items-center justify-center px-4 py-1.5 border border-karbala-gold rounded-pill bg-transparent text-karbala-gold text-[0.8rem] font-kufi group-hover:bg-[rgba(212,185,138,0.1)] group-hover:text-white transition-colors">
              {night.isLocked ? "قريباً" : "تصفح الليلة"}
            </div>
          </div>
        </div>
      </Link>

    </div>
  );
}
