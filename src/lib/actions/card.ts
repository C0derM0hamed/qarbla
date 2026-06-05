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

export async function createCardAction(formData: FormData) {
  const supabase = createAdminClient();

  const type = formData.get("type") as 'quote' | 'reflection' | 'visual';
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const seo_description = formData.get("seo_description") as string;
  const night_id_str = formData.get("night_id") as string;
  const status = formData.get("status") as 'draft' | 'published';
  const featured = formData.get("featured") === "true";
  const downloadable = formData.get("downloadable") === "true";

  const night_id = night_id_str || null;
  const slug = `${type}-${Date.now()}`;

  try {
    const imageFile = formData.get("image") as File;
    const image = await uploadFileToStorage(supabase, imageFile, "cards");

    const { error } = await supabase.from("cards").insert({
      type,
      title,
      content,
      seo_description,
      night_id,
      status,
      featured,
      downloadable,
      slug,
      image,
      sort_order: 1, // Add logic later if needed
    });

    if (error) throw error;

    revalidatePath("/admin/cards");
    revalidatePath("/karbala/cards");

    return { success: true };
  } catch (error: any) {
    console.error("Error creating card:", error);
    return { success: false, error: error.message };
  }
}
