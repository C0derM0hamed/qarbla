import { createClient } from "@supabase/supabase-js";

// Admin Supabase client using service role key
// Bypasses RLS — use ONLY in Server Actions for mutations
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://placeholder.com";
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder";

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
