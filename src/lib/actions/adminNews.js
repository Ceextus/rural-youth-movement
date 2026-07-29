"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Create a new news post.
 */
export async function createNewsPost(formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const title = formData.get("title")?.trim();
  if (!title) return { success: false, error: "Title is required." };

  const slug = formData.get("slug")?.trim() || generateSlug(title);
  const status = formData.get("status") || "draft";
  const published_at =
    status === "published" ? new Date().toISOString() : null;

  const insert = {
    title,
    slug,
    excerpt: formData.get("excerpt")?.trim() || null,
    body: formData.get("body") || "",
    cover_image: formData.get("cover_image")?.trim() || null,
    tag: formData.get("tag") || "General",
    status,
    published_at,
  };

  const { data, error } = await supabase
    .from("news_posts")
    .insert(insert)
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return { success: true, id: data.id };
}

/**
 * Update an existing news post.
 */
export async function updateNewsPost(id, formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const title = formData.get("title")?.trim();
  if (!title) return { success: false, error: "Title is required." };

  const status = formData.get("status") || "draft";

  // Fetch existing to check if published_at should be set
  const { data: existing } = await supabase
    .from("news_posts")
    .select("published_at")
    .eq("id", id)
    .single();

  const published_at =
    status === "published" && !existing?.published_at
      ? new Date().toISOString()
      : existing?.published_at || null;

  const updates = {
    title,
    slug: formData.get("slug")?.trim() || generateSlug(title),
    excerpt: formData.get("excerpt")?.trim() || null,
    body: formData.get("body") || "",
    cover_image: formData.get("cover_image")?.trim() || null,
    tag: formData.get("tag") || "General",
    status,
    published_at,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("news_posts")
    .update(updates)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return { success: true };
}

/**
 * Delete a news post.
 */
export async function deleteNewsPost(id) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("news_posts")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
  return { success: true };
}
