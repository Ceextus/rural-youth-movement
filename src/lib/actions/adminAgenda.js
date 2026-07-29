"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

export async function createPillar(formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const insert = {
    title: formData.get("title")?.trim(),
    description: formData.get("description")?.trim() || "",
    icon: formData.get("icon")?.trim() || "flag",
    display_order: parseInt(formData.get("display_order") || "0", 10),
  };

  if (!insert.title) {
    return { success: false, error: "Title is required." };
  }

  const { error } = await supabase.from("agenda_pillars").insert(insert);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/agenda");
  revalidatePath("/agenda");
  revalidatePath("/");
  return { success: true };
}

export async function updatePillar(id, formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const updates = {
    title: formData.get("title")?.trim(),
    description: formData.get("description")?.trim() || "",
    icon: formData.get("icon")?.trim() || "flag",
    display_order: parseInt(formData.get("display_order") || "0", 10),
  };

  const { error } = await supabase.from("agenda_pillars").update(updates).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/agenda");
  revalidatePath("/agenda");
  revalidatePath("/");
  return { success: true };
}

export async function deletePillar(id) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("agenda_pillars").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/agenda");
  revalidatePath("/agenda");
  revalidatePath("/");
  return { success: true };
}
