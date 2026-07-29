"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

/**
 * Update a chapter's editable fields.
 */
export async function updateChapter(id, formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const updates = {
    tagline: formData.get("tagline") || null,
    about: formData.get("about") || null,
    hq_address: formData.get("hq_address") || null,
    contact_email: formData.get("contact_email") || null,
    contact_phone: formData.get("contact_phone") || null,
    established: formData.get("established") || null,
    status: formData.get("status") || "active",
    stat_projects: parseInt(formData.get("stat_projects") || "0", 10),
    stat_communities: parseInt(formData.get("stat_communities") || "0", 10),
    stat_events: parseInt(formData.get("stat_events") || "0", 10),
    stat_lgas: parseInt(formData.get("stat_lgas") || "0", 10),
  };

  const { error } = await supabase
    .from("chapters")
    .update(updates)
    .eq("id", id);

  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/chapters");
  revalidatePath("/chapters");
  return { success: true };
}
