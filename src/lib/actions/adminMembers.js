"use server";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/actions/adminAuth";
import { revalidatePath } from "next/cache";

/**
 * Approve a single member.
 */
export async function approveMember(id) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("members")
    .update({ status: "approved" })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/members");
  revalidatePath("/admin");
  return { success: true };
}

/**
 * Reject a single member.
 */
export async function rejectMember(id) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("members")
    .update({ status: "rejected" })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/members");
  revalidatePath("/admin");
  return { success: true };
}

/**
 * Bulk-update member statuses.
 * @param {string[]} ids
 * @param {'approved' | 'rejected'} status
 */
export async function bulkUpdateMemberStatus(ids, status) {
  if (!ids?.length || !["approved", "rejected"].includes(status)) {
    return { success: false, error: "Invalid input." };
  }

  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("members")
    .update({ status })
    .in("id", ids);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/members");
  revalidatePath("/admin");
  return { success: true };
}

/**
 * Export members matching filters to a CSV string.
 */
export async function exportMembersCSV(statusFilter) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("members")
    .select("first_name, last_name, email, phone, state, lga, ward, interests, vision, status, created_at")
    .order("created_at", { ascending: false });

  if (statusFilter && statusFilter !== "all") {
    query = query.eq("status", statusFilter);
  }

  const { data, error } = await query;

  if (error) return { success: false, error: error.message };

  // Build CSV
  const headers = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "State",
    "LGA",
    "Ward",
    "Interests",
    "Vision",
    "Status",
    "Registered",
  ];

  const rows = (data || []).map((m) => [
    m.first_name,
    m.last_name,
    m.email,
    m.phone,
    m.state,
    m.lga,
    m.ward,
    (m.interests || []).join("; "),
    (m.vision || "").replace(/"/g, '""'),
    m.status,
    new Date(m.created_at).toLocaleDateString("en-NG"),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row.map((cell) => `"${cell}"`).join(",")
    ),
  ].join("\n");

  return { success: true, csv: csvContent };
}
