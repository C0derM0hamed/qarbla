"use client";

import React from "react";
import Link from "next/link";

interface QuizButtonProps {
  nightSlug: string;
  opensAt: string | null;
  compact?: boolean;
}

export function QuizButton({ nightSlug, opensAt, compact = false }: QuizButtonProps) {
  const isOpen = !opensAt || new Date(opensAt) <= new Date();

  if (compact) {
    return (
      <Link
        href={`/karbala/night/${nightSlug}/quiz`}
        className="inline-flex items-center justify-center px-3 py-1 border border-karbala-gold/60 text-karbala-gold text-[0.75rem] font-kufi rounded-pill hover:bg-[rgba(212,185,138,0.1)] transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {isOpen ? "اختبر معلوماتك" : "قريباً"}
      </Link>
    );
  }

  return (
    <Link
      href={`/karbala/night/${nightSlug}/quiz`}
      className="inline-flex items-center gap-2 px-6 py-3 border border-karbala-gold text-karbala-gold rounded-pill hover:bg-[rgba(212,185,138,0.1)] transition-colors font-kufi"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
      اختبر معلوماتك
    </Link>
  );
}
