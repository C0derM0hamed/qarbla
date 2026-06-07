"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, NAV_CTA } from "@/constants";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
        
        .custom-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 72px;
          background: rgba(10,7,5,0.6);
          backdrop-filter: blur(8px);
          z-index: 50;
          direction: rtl;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          transition: background 0.3s ease;
        }

        .custom-navbar.scrolled {
          background: rgba(10,7,5,0.9);
        }

        .nav-logo-container {
          display: flex;
          align-items: center;
        }

        .nav-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
        }

        .nav-center-container {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-link {
          font-family: 'Cairo', sans-serif;
          color: #e8dcc8;
          text-decoration: none;
          font-size: 16px;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #c9a96e;
        }

        .nav-cta {
          font-family: 'Cairo', sans-serif;
          border: 1px solid #c9a96e;
          color: #c9a96e;
          border-radius: 999px;
          padding: 8px 20px;
          background: transparent;
          text-decoration: none;
          font-size: 15px;
          transition: background 0.3s ease;
        }

        .nav-cta:hover {
          background: rgba(201,169,110,0.12);
        }

        @media (max-width: 768px) {
          .custom-navbar { padding: 0 20px; }
          .nav-center-container { display: none; }
        }
      `}} />
      <nav className={`custom-navbar ${isScrolled ? "scrolled" : ""}`}>
        {/* RIGHT side: logo */}
        <Link href="/karbala" className="nav-logo-container" aria-label="الرئيسية">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icon.png" alt="شعار وعي يمر من كربلاء" className="nav-logo" />
        </Link>

        {/* CENTER: links */}
        <div className="nav-center-container">
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* LEFT side: CTA */}
        <div>
          <Link href={NAV_CTA.href} className="nav-cta">
            {NAV_CTA.label}
          </Link>
        </div>
      </nav>
    </>
  );
}
