import React from "react";
import Link from "next/link";
import type { Night } from "@/types/database";

interface NightCardProps {
  night: Pick<Night, "number" | "title" | "slug"> & { isLocked?: boolean };
  isFeatured?: boolean;
}

export function NightCard({ night, isFeatured = false }: NightCardProps) {
  const formattedNumber = night.number.toString().padStart(2, "0");

  const baseClasses = `
    relative block w-[200px] h-[280px] shrink-0
    rounded-lg transition-premium
    card-base overflow-hidden group
  `;

  const featuredClasses = isFeatured
    ? "border-[rgba(212,185,138,0.4)] bg-[#232019] shadow-glow scale-[1.05]"
    : "";

  return (
    <Link
      href={night.isLocked ? "#" : `/karbala/night/${night.slug}`}
      className={`${baseClasses} ${featuredClasses} ${night.isLocked ? 'cursor-not-allowed opacity-80 hover:-translate-y-0 hover:shadow-ambient hover:bg-karbala-card hover:border-gold-card' : ''}`}
      aria-disabled={night.isLocked}
    >
      {/* Corner Ornaments (Top Left, Bottom Right - adjusted for RTL: Top Right, Bottom Left visually, but layout is RTL so top-left is visual top-right) */}
      {/* Since design system says: "brackets in gold at top-left and bottom-right corners" -> In RTL, Top-Right and Bottom-Left are often the natural corners, but we will stick to Top-Left and Bottom-Right visually. */}
      
      {/* Top Left Bracket */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[rgba(212,185,138,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Bottom Right Bracket */}
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[rgba(212,185,138,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-xl h-full flex flex-col relative z-10">
        
        {/* Header (Number and Lock) */}
        <div className="flex justify-between items-start mb-auto">
           {/* In RTL, left is right. The design says "top-left position" for number. */}
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

        {/* Title & CTA */}
        <div className="mt-4">
          <h3 className="font-scheherazade text-[1rem] text-karbala-gold-light line-clamp-2 leading-[1.4] mb-4">
            {night.title}
          </h3>
          
          <div className="inline-flex items-center justify-center px-4 py-1.5 border border-karbala-gold rounded-pill bg-transparent text-karbala-gold text-[0.8rem] font-kufi group-hover:bg-[rgba(212,185,138,0.1)] transition-colors">
            {night.isLocked ? "قريباً" : "تصفح الليلة"}
          </div>
        </div>
      </div>
    </Link>
  );
}
