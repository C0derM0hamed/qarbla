import { createServerClient } from "@/lib/supabase/server";
import type {
  Season,
  Night,
  NightWithRelations,
  Card,
} from "@/types/database";

// ─── Season Queries ───

export async function getActiveSeason(): Promise<Season | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("seasons")
    .select("*")
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching active season:", error);
    return null;
  }
  return data;
}

// ─── Night Queries ───

export async function getPublishedNights(): Promise<Night[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("nights")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching nights:", error);
    return [];
  }
  return data ?? [];
}

export async function getNightBySlug(
  slug: string
): Promise<NightWithRelations | null> {
  const supabase = createServerClient();

  // Fetch the night
  const { data: night, error } = await supabase
    .from("nights")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !night) {
    console.error("Error fetching night:", error);
    return null;
  }

  // Fetch all related data in parallel
  const [topics, verses, narrations, resources, cards, attachments] =
    await Promise.all([
      supabase
        .from("topics")
        .select("*")
        .eq("night_id", night.id)
        .order("sort_order"),
      supabase
        .from("verses")
        .select("*")
        .eq("night_id", night.id)
        .order("sort_order"),
      supabase
        .from("narrations")
        .select("*")
        .eq("night_id", night.id)
        .order("sort_order"),
      supabase
        .from("resources")
        .select("*")
        .eq("night_id", night.id)
        .order("sort_order"),
      supabase
        .from("cards")
        .select("*")
        .eq("night_id", night.id)
        .eq("status", "published")
        .order("sort_order"),
      supabase
        .from("attachments")
        .select("*")
        .eq("night_id", night.id)
        .eq("status", "published")
        .order("created_at"),
    ]);

  return {
    ...night,
    topics: topics.data ?? [],
    verses: verses.data ?? [],
    narrations: narrations.data ?? [],
    resources: resources.data ?? [],
    cards: cards.data ?? [],
    attachments: attachments.data ?? [],
  };
}

export async function getAllNightSlugs(): Promise<string[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("nights")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching night slugs:", error);
    return [];
  }
  return (data ?? []).map((n) => n.slug);
}

// ─── Card Queries ───

export async function getPublishedCards(type?: string): Promise<Card[]> {
  const supabase = createServerClient();
  let query = supabase
    .from("cards")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (type) {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching cards:", error);
    return [];
  }
  return data ?? [];
}

export async function getFeaturedCards(): Promise<Card[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("sort_order", { ascending: true })
    .limit(6);

  if (error) {
    console.error("Error fetching featured cards:", error);
    return [];
  }
  return data ?? [];
}

export async function getCardBySlug(slug: string): Promise<Card | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching card:", error);
    return null;
  }
  return data;
}

export async function getAllCardSlugs(): Promise<string[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("cards")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("Error fetching card slugs:", error);
    return [];
  }
  return (data ?? []).map((c) => c.slug);
}
