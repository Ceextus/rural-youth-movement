"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

export async function createTestimonial(formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const insert = {
    name: formData.get("name")?.trim(),
    role: formData.get("role")?.trim() || null,
    quote: formData.get("quote")?.trim(),
    photo_url: formData.get("photo_url")?.trim() || null,
    display_order: parseInt(formData.get("display_order") || "0", 10),
  };

  if (!insert.name || !insert.quote) {
    return { success: false, error: "Name and quote are required." };
  }

  const { error } = await supabase.from("testimonials").insert(insert);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id, formData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const updates = {
    name: formData.get("name")?.trim(),
    role: formData.get("role")?.trim() || null,
    quote: formData.get("quote")?.trim(),
    photo_url: formData.get("photo_url")?.trim() || null,
    display_order: parseInt(formData.get("display_order") || "0", 10),
  };

  const { error } = await supabase.from("testimonials").update(updates).eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { success: false, error: error.message };

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  return { success: true };
}
