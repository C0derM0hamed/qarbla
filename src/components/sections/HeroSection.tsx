"use client";

import React from "react";
import Link from "next/link";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  intro?: string;
  heroImage?: string | null;
  logoImage?: string | null;
}

export function HeroSection(props: HeroSectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ignored = props;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700;900&family=Cairo:wght@400;600;700&display=swap');
        
        .hero-container {
          direction: rtl;
          text-align: right;
          position: relative;
          width: 100%;
          height: 100vh;
          background-color: #0a0705;
          overflow: hidden;
          padding-top: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-right: 12%;
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/hero.png');
          background-size: cover;
          background-position: center;
          animation: heroBgZoom 1.8s ease-out forwards;
          z-index: 1;
        }

        .hero-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to left, rgba(10,7,5,0.25) 0%, rgba(10,7,5,0.75) 60%, rgba(10,7,5,0.92) 100%);
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-title {
          font-family: 'Amiri', serif;
          font-size: clamp(100px, 15vw, 200px);
          color: #e8dcc8;
          font-weight: 900;
          line-height: 1.6;
          margin: 0;
          padding-bottom: 10px;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.7s ease-out forwards;
          animation-delay: 0.1s;
        }

        .hero-subtitle {
          font-family: 'Amiri', serif;
          font-size: clamp(36px, 6vw, 64px);
          margin: 0;
          line-height: 1.5;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.7s ease-out forwards;
          animation-delay: 0.35s;
        }

        .hero-subtitle .text-white {
          color: #e8dcc8;
        }

        .hero-subtitle .text-red {
          color: #c0392b;
        }

        .hero-info-1 {
          font-family: 'Cairo', sans-serif;
          font-size: clamp(18px, 2.5vw, 24px);
          color: #b0a090;
          margin-top: 32px;
          margin-bottom: 0;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.7s ease-out forwards;
          animation-delay: 0.55s;
        }

        .hero-info-2 {
          font-family: 'Cairo', sans-serif;
          font-size: clamp(15px, 2vw, 20px);
          color: #8a7a6a;
          margin-top: 12px;
          margin-bottom: 0;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.7s ease-out forwards;
          animation-delay: 0.7s;
        }

        .hero-btn-container {
          margin-top: 40px;
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.7s ease-out forwards;
          animation-delay: 0.85s;
        }

        .hero-btn {
          display: inline-block;
          font-family: 'Cairo', sans-serif;
          border: 1px solid #c9a96e;
          color: #e8dcc8;
          background: rgba(0,0,0,0.4);
          padding: 16px 40px;
          border-radius: 999px;
          text-decoration: none;
          font-size: clamp(16px, 1.5vw, 18px);
          transition: all 0.3s ease;
        }

        .hero-btn:hover {
          background: rgba(201,169,110,0.15);
          box-shadow: 0 0 12px rgba(201,169,110,0.3);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroBgZoom {
          from { transform: scale(1.04); }
          to { transform: scale(1); }
        }
        
        @media (max-width: 768px) {
          .hero-container { 
            padding-right: 5%; 
            padding-left: 5%;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
          .hero-content {
            align-items: center;
          }
        }
      `}} />
      <section className="hero-container">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="hero-title">وعي</h1>
          <h2 className="hero-subtitle">
            <span className="text-white">يمر من </span>
            <span className="text-red">كربلاء</span>
          </h2>
          <p className="hero-info-1">محاضرات حسينية | 13 ليلة</p>
          <p className="hero-info-2">أفكار تبني الوعي .. ومواقف تصنع الإنسان</p>
          <div className="hero-btn-container">
            <Link href="#nights" className="hero-btn">
              اكتشف المزيد ←
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
