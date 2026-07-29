"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";

const BUCKET = "media";

function publicUrl(supabase, path) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

/**
 * Upload an image file to the media bucket. Expects FormData with a `file` field.
 * Returns { success, url } or { success:false, error }.
 */
export async function uploadMedia(formData) {
  await requireAdmin();

  const file = formData.get("file");
  if (!file || typeof file === "string" || file.size === 0) {
    return { success: false, error: "No file provided." };
  }
  if (!file.type?.startsWith("image/")) {
    return { success: false, error: "Only image files are allowed." };
  }

  const supabase = getSupabaseAdmin();
  const safeName = (file.name || "upload")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");
  const path = `${Date.now()}-${safeName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "31536000", upsert: false });

  if (error) return { success: false, error: error.message };

  return { success: true, url: publicUrl(supabase, path), path };
}

/**
 * List uploaded media (newest first). Returns [{ name, path, url, updatedAt }].
 */
export async function listMedia() {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.storage.from(BUCKET).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) return [];

  return (data || [])
    .filter((o) => o.id) // skip folder placeholders
    .map((o) => ({
      name: o.name,
      path: o.name,
      url: publicUrl(supabase, o.name),
      updatedAt: o.updated_at || o.created_at,
    }));
}

/**
 * Delete a media object by its storage path.
 */
export async function deleteMedia(path) {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
