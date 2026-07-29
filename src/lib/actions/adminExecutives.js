"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

/**
 * Create a new executive (chapter or national).
 */
export async function createExecutive(type, data) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const table = type === "national" ? "national_executives" : "chapter_executives";

  const insert = {
    name: data.name,
    role: data.role,
    photo_url: data.photo_url || null,
    display_order: parseInt(data.display_order || "0", 10),
  };

  // Chapter executives also need chapter_id
  if (type === "chapter" && data.chapter_id) {
    insert.chapter_id = data.chapter_id;
  }

  // National executives also have bio
  if (type === "national") {
    insert.bio = data.bio || null;
  }

  const { error } = await supabase.from(table).insert(insert);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  if (type === "national") {
    revalidatePath("/admin/national-executives");
    revalidatePath("/about");
  } else {
    revalidatePath("/admin/chapters");
    revalidatePath("/chapters");
  }
  return { success: true };
}

/**
 * Update an existing executive.
 */
export async function updateExecutive(type, id, data) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const table = type === "national" ? "national_executives" : "chapter_executives";

  const updates = {
    name: data.name,
    role: data.role,
    photo_url: data.photo_url || null,
    display_order: parseInt(data.display_order || "0", 10),
  };

  if (type === "national") {
    updates.bio = data.bio || null;
  }

  const { error } = await supabase.from(table).update(updates).eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  if (type === "national") {
    revalidatePath("/admin/national-executives");
    revalidatePath("/about");
  } else {
    revalidatePath("/admin/chapters");
    revalidatePath("/chapters");
  }
  return { success: true };
}

/**
 * Delete an executive.
 */
export async function deleteExecutive(type, id) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const table = type === "national" ? "national_executives" : "chapter_executives";

  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin");
  if (type === "national") {
    revalidatePath("/admin/national-executives");
    revalidatePath("/about");
  } else {
    revalidatePath("/admin/chapters");
    revalidatePath("/chapters");
  }
  return { success: true };
}
