import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Fetch live movement statistics for the public-facing stat bar.
 * Returns real counts from the database.
 */
export async function getLiveStats() {
  const supabase = getSupabaseAdmin();

  const [
    { count: totalMembers },
    { count: approvedMembers },
    { count: activeChapters },
    { count: totalChapters },
  ] = await Promise.all([
    supabase.from("members").select("*", { count: "exact", head: true }),
    supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase
      .from("chapters")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase.from("chapters").select("*", { count: "exact", head: true }),
  ]);

  return {
    totalMembers: totalMembers ?? 0,
    approvedMembers: approvedMembers ?? 0,
    activeChapters: activeChapters ?? 0,
    totalChapters: totalChapters ?? 0,
  };
}

/**
 * Fetch member count per state for the interactive map heat map.
 */
export async function getStateMemberCounts() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("members")
    .select("state")
    .eq("status", "approved");

  if (error) {
    console.error("Failed to fetch member states:", error);
    return {};
  }

  // Count members per state
  const counts = {};
  (data || []).forEach((row) => {
    const st = row.state;
    if (st) counts[st] = (counts[st] || 0) + 1;
  });

  return counts;
}
