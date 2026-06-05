// ─── Application Constants ───

export const SITE_NAME = "وعيٌ يمرّ من كربلاء";
export const SITE_NAME_EN = "Wa'y min Karbala";
export const SITE_DESCRIPTION =
  "منصة تعليمية إسلامية متميزة تقدم موسم معرفي مكون من ١٣ ليلة";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// ─── Navigation Links ───

export const NAV_LINKS = [
  { label: "الرئيسية", href: "/karbala" },
  { label: "الليالي", href: "/karbala#nights" },
  { label: "البطاقات", href: "/karbala/cards" },
] as const;

export const NAV_CTA = {
  label: "جدول المحاضرات",
  href: "/karbala#nights",
} as const;

// ─── Admin Navigation ───

export const ADMIN_NAV_LINKS = [
  { label: "لوحة التحكم", href: "/admin", icon: "dashboard" },
  { label: "الموسم", href: "/admin/season", icon: "season" },
  { label: "الليالي", href: "/admin/nights", icon: "nights" },
  { label: "البطاقات", href: "/admin/cards", icon: "cards" },
  { label: "المصادر", href: "/admin/resources", icon: "resources" },
  { label: "المرفقات", href: "/admin/attachments", icon: "attachments" },
] as const;

// ─── Status Labels ───

export const NIGHT_STATUS_LABELS: Record<string, string> = {
  draft: "مسودة",
  published: "منشور",
  hidden: "مخفي",
};

export const CARD_TYPE_LABELS: Record<string, string> = {
  quote: "اقتباس",
  reflection: "تأمل",
  visual: "بصري",
};

export const RESOURCE_CATEGORY_LABELS: Record<string, string> = {
  book: "كتاب",
  article: "مقال",
  video: "فيديو",
  website: "موقع",
};

export const ATTACHMENT_TYPE_LABELS: Record<string, string> = {
  audio: "صوتي",
  pdf: "PDF",
  image: "صورة",
};

// ─── Supabase Storage Buckets ───

export const STORAGE_BUCKETS = {
  images: "images",
  audio: "audio",
  pdf: "pdf",
} as const;
