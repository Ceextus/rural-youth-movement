import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Fetch aggregate counts for the admin overview dashboard.
 * All queries use the service-role client (bypasses RLS).
 */
export async function getOverviewStats() {
  const supabase = getSupabaseAdmin();

  const [
    { count: totalMembers },
    { count: pendingMembers },
    { count: activeChapters },
    { count: totalContacts },
  ] = await Promise.all([
    supabase.from("members").select("*", { count: "exact", head: true }),
    supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("chapters")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true }),
  ]);

  return {
    totalMembers: totalMembers ?? 0,
    pendingMembers: pendingMembers ?? 0,
    activeChapters: activeChapters ?? 0,
    totalContacts: totalContacts ?? 0,
  };
}

/**
 * Fetch the most recent member registrations.
 */
export async function getRecentMembers(limit = 5) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("members")
    .select("id, first_name, last_name, email, state, status, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch recent members:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch the most recent contact messages.
 */
export async function getRecentContacts(limit = 5) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, message, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to fetch recent contacts:", error);
    return [];
  }

  return data || [];
}
