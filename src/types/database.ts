// ─── Database Entity Types ───
// Mirror the Supabase database schema exactly

export type SeasonStatus = "active" | "inactive";
export type NightStatus = "draft" | "published" | "hidden";
export type CardType = "quote" | "reflection" | "visual";
export type CardStatus = "draft" | "published";
export type AttachmentType = "audio" | "pdf" | "image";
export type AttachmentStatus = "draft" | "published";
export type ResourceCategory = "book" | "article" | "video" | "website";

// ─── Seasons ───

export interface Season {
  id: string;
  title: string;
  subtitle: string | null;
  intro: string | null;
  hero_image: string | null;
  logo_image: string | null;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Nights ───

export interface Night {
  id: string;
  season_id: string;
  number: number;
  title: string;
  slug: string;
  short_description: string | null;
  teaser: string | null;
  why_important: string | null;
  central_idea: string | null;
  quote: string | null;
  quote_author: string | null;
  reflection_question: string | null;
  practical_step: string | null;
  cover_image: string | null;
  audio_file: string | null;
  pdf_file: string | null;
  status: NightStatus;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  created_at: string;
  updated_at: string;
}

// Night with all related data (for detail page)
export interface NightWithRelations extends Night {
  topics: Topic[];
  verses: Verse[];
  narrations: Narration[];
  resources: Resource[];
  cards: Card[];
  attachments: Attachment[];
}

// ─── Topics ───

export interface Topic {
  id: string;
  night_id: string;
  title: string;
  content: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ─── Verses ───

export interface Verse {
  id: string;
  night_id: string;
  surah_name: string | null;
  verse_number: string | null;
  content: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ─── Narrations ───

export interface Narration {
  id: string;
  night_id: string;
  content: string;
  source: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ─── Resources ───

export interface Resource {
  id: string;
  night_id: string;
  title: string;
  category: ResourceCategory;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ─── Cards ───

export interface Card {
  id: string;
  night_id: string | null;
  slug: string;
  type: CardType;
  title: string;
  content: string | null;
  image: string | null;
  downloadable: boolean;
  status: CardStatus;
  featured: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

// ─── Attachments ───

export interface Attachment {
  id: string;
  night_id: string;
  title: string;
  type: AttachmentType;
  file_url: string;
  downloadable: boolean;
  status: AttachmentStatus;
  created_at: string;
  updated_at: string;
}
