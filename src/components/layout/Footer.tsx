import React from "react";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";

export function Footer() {
  return (
    <footer className="bg-karbala-black relative overflow-hidden">
      {/* Subtle top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(212,185,138,0.3)] to-transparent" />
      <div className="section-container py-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3xl">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-xl">
            <Link
              href="/karbala"
              className="block hover:opacity-80 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.png" alt="وعي يمر من كربلاء" className="h-20 w-auto object-contain" />
            </Link>
            <p className="font-kufi text-body-sm text-karbala-secondary leading-relaxed max-w-[280px]">
              منصة تعليمية إسلامية متميزة تقدم موسمًا معرفيًا من ١٣ ليلة تتناول
              قضايا فكرية وروحية مرتبطة بكربلاء
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-lg">
            <h3 className="font-scheherazade text-display-h4 text-karbala-gold-light">
              روابط سريعة
            </h3>
            <nav className="flex flex-col gap-md">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-kufi text-body-sm text-karbala-secondary hover:text-karbala-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Social */}
          <div className="space-y-lg">
            <h3 className="font-scheherazade text-display-h4 text-karbala-gold-light">
              تواصل معنا
            </h3>
            <div className="flex gap-base">
              {/* Social icons — SVG placeholders, will be replaced with custom icons */}
              {["twitter", "instagram", "youtube"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="
                    w-10 h-10 rounded-full
                    border border-[rgba(212,185,138,0.25)]
                    flex items-center justify-center
                    text-karbala-gold shadow-ambient
                    hover:bg-[rgba(212,185,138,0.1)] hover:-translate-y-1 hover:shadow-glow hover:text-karbala-gold-light
                    transition-all duration-350 ease-premium
                  "
                  aria-label={platform}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {platform === "twitter" && (
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    )}
                    {platform === "instagram" && (
                      <>
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                      </>
                    )}
                    {platform === "youtube" && (
                      <>
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                      </>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: About */}
          <div className="space-y-lg">
            <h3 className="font-scheherazade text-display-h4 text-karbala-gold-light">
              عن المنصة
            </h3>
            <p className="font-kufi text-body-sm text-karbala-gray leading-relaxed">
              موسم معرفي يهدف إلى إثراء الوعي الحسيني من خلال محاضرات ومحتوى
              تعليمي متميز
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-5xl pt-xl border-t border-[rgba(212,185,138,0.08)]">
          <p className="font-kufi text-[0.8rem] text-karbala-gray text-center">
            جميع الحقوق محفوظة © {new Date().getFullYear()} — وعيٌ يمرّ من كربلاء
          </p>
        </div>
      </div>
    </footer>
  );
}
