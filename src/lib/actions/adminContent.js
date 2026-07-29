"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

/**
 * Upsert a single content section by key. `value` is a plain JSON-serialisable object.
 */
export async function updateContent(key, value) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("site_content")
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: "key" }
    );

  if (error) return { success: false, error: error.message };

  // Section content appears on public pages — revalidate the whole site.
  revalidatePath("/", "layout");
  return { success: true };
}
