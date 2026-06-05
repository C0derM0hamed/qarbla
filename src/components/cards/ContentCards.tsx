import React from "react";
import { Badge } from "@/components/ui/Badge";
import type { Card as CardType } from "@/types/database";

interface CardProps {
  card: CardType;
}

export function QuoteCard({ card }: CardProps) {
  return (
    <div className="card-base relative p-xl min-h-[180px] flex flex-col justify-between overflow-hidden group">
      {/* Decorative Quote Mark */}
      <div className="absolute top-2 left-2 text-[6rem] font-scheherazade text-karbala-gold opacity-10 leading-none select-none pointer-events-none group-hover:scale-110 group-hover:text-[rgba(212,185,138,0.2)] transition-all duration-500">
        &quot;
      </div>
      
      <div className="relative z-10">
        <p className="font-scheherazade text-[1.2rem] text-karbala-gold-light italic leading-[1.6] mb-6">
          {card.content}
        </p>
      </div>
      
      <div className="relative z-10 flex items-end justify-between mt-auto">
        <Badge variant="muted">{card.title}</Badge>
        {card.seo_description && (
          <span className="font-kufi text-[0.875rem] text-karbala-gold">
            — {card.seo_description}
          </span>
        )}
      </div>
    </div>
  );
}

export function ReflectionCard({ card }: CardProps) {
  return (
    <div className="card-base relative p-xl flex flex-col group pr-[24px]">
      {/* Right border accent (RTL) */}
      <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-karbala-gold rounded-r-lg opacity-80 group-hover:opacity-100 transition-opacity" />
      
      <h3 className="font-scheherazade text-[1.1rem] text-karbala-gold mb-3">
        {card.title}
      </h3>
      
      <p className="font-kufi text-[0.95rem] text-karbala-secondary leading-[1.7] mb-6 line-clamp-4">
        {card.content}
      </p>
      
      <div className="mt-auto flex flex-wrap gap-2">
        <Badge variant="gold">تأملات</Badge>
      </div>
    </div>
  );
}
