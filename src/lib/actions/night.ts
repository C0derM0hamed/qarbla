"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

async function uploadFileToStorage(
  supabase: ReturnType<typeof createAdminClient>,
  file: File,
  folder: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(filename);

  return urlData.publicUrl;
}

export async function createNightAction(formData: FormData) {
  const supabase = createAdminClient();

  // Extract base night fields
  const number = parseInt(formData.get("number") as string);
  const title = formData.get("title") as string;
  const short_description = formData.get("short_description") as string;
  const teaser = formData.get("teaser") as string;
  const central_idea = formData.get("central_idea") as string;
  const why_important = formData.get("why_important") as string;
  const status = formData.get("status") as 'draft' | 'published';

  // Dynamic content (JSON)
  const topicsJson = formData.get("topics") as string;
  const versesJson = formData.get("verses") as string;
  const narrationsJson = formData.get("narrations") as string;

  try {
    // Get the active season ID
    const { data: season } = await supabase
      .from("seasons")
      .select("id")
      .eq("is_active", true)
      .single();
    
    if (!season) {
      return { success: false, error: "No active season found. Please create a season first." };
    }

    // ── Upload media files to Supabase Storage ──
    const coverFile = formData.get("cover_image") as File;
    const audioFile = formData.get("audio_file") as File;
    const pdfFile = formData.get("pdf_file") as File;

    const [cover_image, audio_file, pdf_file] = await Promise.all([
      uploadFileToStorage(supabase, coverFile, `nights/covers`),
      uploadFileToStorage(supabase, audioFile, `nights/audio`),
      uploadFileToStorage(supabase, pdfFile, `nights/pdfs`),
    ]);

    // 1. Insert Night (with media URLs)
    const { data: night, error: nightError } = await supabase
      .from("nights")
      .insert({
        season_id: season.id,
        number,
        title,
        short_description,
        teaser,
        central_idea,
        why_important,
        status,
        slug: `night-${number}`,
        cover_image,
        audio_file,
        pdf_file,
      })
      .select()
      .single();

    if (nightError) throw nightError;
    const nightId = night.id;

    // 2. Insert Topics
    if (topicsJson) {
      const topics = JSON.parse(topicsJson);
      if (topics.length > 0) {
        const topicsToInsert = topics.map((t: any, i: number) => ({
          night_id: nightId,
          title: t.title,
          content: t.content,
          sort_order: i + 1,
        }));
        const { error } = await supabase.from("topics").insert(topicsToInsert);
        if (error) throw error;
      }
    }

    // 3. Insert Verses
    if (versesJson) {
      const verses = JSON.parse(versesJson);
      if (verses.length > 0) {
        const versesToInsert = verses.map((v: any, i: number) => ({
          night_id: nightId,
          content: v.content,
          surah_name: v.surah_name,
          verse_number: v.verse_number,
          sort_order: i + 1,
        }));
        const { error } = await supabase.from("verses").insert(versesToInsert);
        if (error) throw error;
      }
    }

    // 4. Insert Narrations
    if (narrationsJson) {
      const narrations = JSON.parse(narrationsJson);
      if (narrations.length > 0) {
        const narrationsToInsert = narrations.map((n: any, i: number) => ({
          night_id: nightId,
          content: n.content,
          source: n.source,
          sort_order: i + 1,
        }));
        const { error } = await supabase.from("narrations").insert(narrationsToInsert);
        if (error) throw error;
      }
    }

    revalidatePath("/admin/nights");
    revalidatePath("/karbala");
    
    return { success: true, nightId };
  } catch (error: any) {
    console.error("Error creating night:", error);
    return { success: false, error: error.message };
  }
}
