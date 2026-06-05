import React from "react";
import Link from "next/link";
import { ADMIN_NAV_LINKS, SITE_NAME } from "@/constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-l border-gray-200 flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link href="/admin" className="font-scheherazade text-2xl text-karbala-gold font-bold">
            {SITE_NAME}
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-3">
            {ADMIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
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
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
