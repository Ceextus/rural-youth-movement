"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

/**
 * Delete a contact message.
 */
export async function deleteContact(id) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
  return { success: true };
}

/**
 * Toggle the is_read flag on a contact message.
 */
export async function toggleContactRead(id, isRead) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: isRead })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/contacts");
  return { success: true };
}
