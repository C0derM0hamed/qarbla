"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  intro?: string;
  heroImage?: string | null;
  logoImage?: string | null;
}

export function HeroSection({
  title = "الموسم الأول — ١٣ ليلة معرفية",
  subtitle = "رحلة معرفية في الوعي الحسيني",
  intro,
  heroImage,
  logoImage,
}: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image (Cinematic) */}
      {heroImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slow-zoom origin-center" 
          style={{ backgroundImage: `url(${heroImage})` }} 
        />
      )}

      {/* Dark gradient background overlay & Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(13,11,9,0.3)] to-[rgba(13,11,9,0.85)] z-[1]" />
      <div className="absolute inset-0 shadow-deep z-[1]" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise-texture.png')] z-[2] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-base flex flex-col items-center">
        
        {/* Animated text group */}
        {mounted && (
          <>
            <h1 className="font-scheherazade text-karbala-gold font-bold leading-[1.1] flex flex-col items-center drop-shadow-[0_0_60px_rgba(212,185,138,0.4)]">
              {/* Optional dynamic logo image if available, else text */}
              {logoImage ? (
                 /* eslint-disable-next-line @next/next/no-img-element */
                 <img src={logoImage} alt="Logo" className="h-24 md:h-32 mb-4 animate-fade-up" style={{ animationDelay: "300ms" }} />
              ) : (
                <span 
                  className="block opacity-0 animate-fade-up bg-clip-text text-transparent bg-gradient-to-b from-[#FFF5DE] via-karbala-gold to-karbala-gold-dark drop-shadow-sm" 
                  style={{ fontSize: "clamp(5rem, 14vw, 11rem)", animationDelay: "300ms" }}
                >
                  وعي
                </span>
              )}
              
              <span 
                className="block opacity-0 animate-fade-up bg-clip-text text-transparent bg-gradient-to-b from-karbala-gold-light to-karbala-gold-dark" 
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", animationDelay: "600ms" }}
              >
                يمرّ من
              </span>
              
              <span
                className="block italic opacity-0 animate-fade-up drop-shadow-[0_0_60px_rgba(139,30,30,0.5)] bg-clip-text text-transparent bg-gradient-to-b from-[#E74C3C] to-[#8B1E1E]"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)", animationDelay: "900ms" }}
              >
                كربلاء
              </span>
            </h1>

            <p 
              className="font-kufi text-body-md text-karbala-secondary tracking-[0.15em] mt-xl uppercase opacity-0 animate-fade-up"
              style={{ animationDelay: "1200ms" }}
            >
              {title}
            </p>
            
            <p 
              className="font-kufi text-body-lg text-karbala-gold-light mt-lg max-w-[500px] mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: "1200ms" }}
            >
              {subtitle}
            </p>
            
            {intro && (
               <p className="font-kufi text-body-md text-karbala-gray mt-md max-w-prose mx-auto opacity-0 animate-fade-up"
               style={{ animationDelay: "1200ms" }}>
                 {intro}
               </p>
            )}

            <div className="mt-2xl opacity-0 animate-fade-up" style={{ animationDelay: "1400ms" }}>
              <Button href="#nights" size="lg" variant="primary">
                تصفح الليالي
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Scroll indicator */}
      {mounted && (
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-hint opacity-0 z-10"
          style={{ animationFillMode: "forwards", animationDelay: "2000ms" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4B98A"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="opacity-60"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      )}
    </section>
  );
}
