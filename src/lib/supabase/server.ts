import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client for RSC data fetching
// Uses the anon key — RLS policies control access
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://placeholder.com";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}
