import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Fetch paginated contact messages, newest first.
 */
export async function getContacts({ page = 1, perPage = 20 } = {}) {
  const supabase = getSupabaseAdmin();

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count, error } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("Failed to fetch contacts:", error);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count ?? 0 };
}

/**
 * Count of unread contact messages (for sidebar badge).
 */
export async function getUnreadContactCount() {
  const supabase = getSupabaseAdmin();

  const { count, error } = await supabase
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("is_read", false);

  if (error) {
    console.error("Failed to count unread contacts:", error);
    return 0;
  }

  return count ?? 0;
}
