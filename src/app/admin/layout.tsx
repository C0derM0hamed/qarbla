import React from "react";
import Link from "next/link";
import { ADMIN_NAV_LINKS, SITE_NAME } from "@/constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col md:flex-row" dir="rtl">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white md:border-l border-b md:border-b-0 border-gray-200 flex-shrink-0 flex flex-col md:h-screen md:sticky md:top-0 z-50">
        <div className="h-16 flex items-center px-4 md:px-6 border-b border-gray-200 justify-between">
          <Link href="/admin" className="font-scheherazade text-2xl text-karbala-gold font-bold">
            {SITE_NAME}
          </Link>
          <div className="md:hidden">
            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="text-sm font-medium text-red-700 hover:text-red-800"
              >
                تسجيل الخروج
              </button>
            </form>
          </div>
        </div>
        
        <div className="md:flex-1 overflow-x-auto md:overflow-y-auto md:py-6 scrollbar-hide">
          <nav className="flex md:flex-col space-x-2 md:space-x-0 md:space-y-1 p-3 md:px-3 whitespace-nowrap rtl:space-x-reverse">
            {ADMIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 shrink-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden md:block p-4 border-t border-gray-200">
          <Link
            href="/admin/profile"
            className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100 transition-colors mb-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 shrink-0">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            الملف الشخصي
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50 transition-colors"
            >
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
