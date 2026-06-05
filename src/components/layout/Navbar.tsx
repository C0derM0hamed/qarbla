"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, NAV_CTA } from "@/constants";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <nav
        className={`
          fixed top-0 right-0 left-0 z-50
          h-[72px] flex items-center
          transition-all duration-350 ease-premium
          ${
            isScrolled
              ? "bg-[rgba(13,11,9,0.85)] backdrop-blur-[12px] border-b border-[rgba(212,185,138,0.12)]"
              : "bg-transparent"
          }
        `}
      >
        <div className="section-container w-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/karbala"
            className="flex items-center hover:opacity-80 transition-opacity"
            aria-label="الرئيسية"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon.png" alt="وعي يمر من كربلاء" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative font-kufi text-[0.95rem]
                  transition-colors duration-300
                  ${
                    pathname === link.href
                      ? "text-karbala-gold"
                      : "text-karbala-secondary hover:text-karbala-gold"
                  }
                  after:content-[''] after:absolute after:bottom-[-4px] after:right-0
                  after:h-px after:bg-karbala-gold after:transition-all after:duration-300
                  ${
                    pathname === link.href
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="cta" size="sm" href={NAV_CTA.href}>
              {NAV_CTA.label}
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={isMobileOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-karbala-gold transition-all duration-300 ${
                isMobileOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-karbala-gold transition-all duration-300 ${
                isMobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-karbala-gold transition-all duration-300 ${
                isMobileOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="
            fixed inset-0 z-40
            bg-[rgba(13,11,9,0.98)]
            flex flex-col items-center justify-center gap-8
            animate-fade-up
          "
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                font-kufi text-xl text-karbala-secondary
                hover:text-karbala-gold transition-colors
              "
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="cta" size="lg" href={NAV_CTA.href}>
            {NAV_CTA.label}
          </Button>
        </div>
      )}
    </>
  );
}
