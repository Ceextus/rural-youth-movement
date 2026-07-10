// Browser Supabase client (uses NEXT_PUBLIC_SUPABASE_URL + anon key).
// Safe for client components; subject to Row Level Security.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
