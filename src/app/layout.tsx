import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "كربلاء",
    "الإمام الحسين",
    "محاضرات",
    "إسلامي",
    "تعليم",
    "وعي",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: SITE_NAME,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-karbala-dark text-karbala-primary antialiased relative min-h-screen">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "وعي يمر من كربلاء",
              "url": "https://qarbla.com",
              "description": "منصة تعليمية إسلامية متميزة تقدم محتوى معرفي حول نهضة الإمام الحسين (ع)",
              "inLanguage": "ar"
            })
          }}
        />
        {/* Global Noise Overlay (if not applied via globals.css) */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: "url('/noise-texture.png')" }}></div>
        {children}
      </body>
    </html>
  );
}
