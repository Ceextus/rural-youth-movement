"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

/**
 * Update the global site settings. Scalar fields come as named form fields;
 * socials / nav_links / footer_columns arrive as JSON strings.
 */
export async function updateSettings(formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const updates = {
    id: "global",
    site_name: formData.get("site_name")?.trim() || "Rural Youth Movement",
    tagline: formData.get("tagline")?.trim() || null,
    logo_url: formData.get("logo_url")?.trim() || null,
    contact_email: formData.get("contact_email")?.trim() || null,
    contact_phone: formData.get("contact_phone")?.trim() || null,
    contact_address: formData.get("contact_address")?.trim() || null,
    seo_description: formData.get("seo_description")?.trim() || null,
    socials: parseJson(formData.get("socials"), {}),
    nav_links: parseJson(formData.get("nav_links"), []),
    footer_columns: parseJson(formData.get("footer_columns"), []),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("site_settings")
    .upsert(updates, { onConflict: "id" });

  if (error) return { success: false, error: error.message };

  // Settings drive the shared layout, so revalidate the whole site.
  revalidatePath("/", "layout");
  return { success: true };
}
