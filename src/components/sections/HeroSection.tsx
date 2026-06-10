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
  heroImage = "/hero-bg-karbala.jpg",
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
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
            {/* Logo / Icon above the main headline */}
            <div className="mb-4 opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
              {logoImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoImage} alt="شعار وعي" className="h-16 md:h-20 mx-auto rounded-md shadow-lg" />
              ) : (
                <svg
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto text-karbala-gold"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" stroke="#D4B98A" strokeWidth="1.25" />
                  <path d="M8 12c1.333-2 4-2 6 0" stroke="#D4B98A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8v8" stroke="#D4B98A" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>

            <h1 className="font-scheherazade text-karbala-gold font-bold leading-[1.02] text-center drop-shadow-[0_0_40px_rgba(212,185,138,0.35)]">
              <span
                className="block opacity-0 animate-fade-up"
                style={{ fontSize: "clamp(4rem, 10vw, 9rem)", animationDelay: "400ms" }}
              >
                وعي
              </span>

              <span
                className="block opacity-0 animate-fade-up text-karbala-gold-light"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 4rem)", animationDelay: "700ms" }}
              >
                يمرّ من
              </span>

              <span
                className="block italic opacity-0 animate-fade-up text-[#C0392B]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", animationDelay: "1000ms" }}
              >
                كربلاء
              </span>
            </h1>

            <p
              className="font-kufi text-body-md text-karbala-secondary tracking-[0.12em] mt-6 uppercase opacity-0 animate-fade-up"
              style={{ animationDelay: "1300ms" }}
            >
              {title}
            </p>

            <p
              className="font-kufi text-body-lg text-karbala-gold-light mt-4 max-w-[680px] mx-auto opacity-0 animate-fade-up"
              style={{ animationDelay: "1400ms", lineHeight: 1.6 }}
            >
              {subtitle}
            </p>
            
            {intro && (
               <p className="font-kufi text-body-md text-karbala-gray mt-6 max-w-prose mx-auto opacity-0 animate-fade-up"
               style={{ animationDelay: "1500ms", lineHeight: 1.8 }}>
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
