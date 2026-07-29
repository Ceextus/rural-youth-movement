import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Fetch paginated members with optional filters.
 * @param {{ status?: string, search?: string, page?: number, perPage?: number, sortBy?: string, sortDir?: string }} opts
 * @returns {{ data: object[], total: number }}
 */
export async function getMembers({
  status,
  search,
  page = 1,
  perPage = 20,
  sortBy = "created_at",
  sortDir = "desc",
} = {}) {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("members")
    .select("*", { count: "exact" });

  // Filter by status
  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  // Search by name or email. Strip characters that carry meaning in a
  // PostgREST `or()` filter so the term can't break out and inject filters.
  if (search) {
    const safe = search.replace(/[,()*]/g, " ").trim();
    if (safe) {
      query = query.or(
        `first_name.ilike.%${safe}%,last_name.ilike.%${safe}%,email.ilike.%${safe}%`
      );
    }
  }

  // Sort
  query = query.order(sortBy, { ascending: sortDir === "asc" });

  // Paginate
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Failed to fetch members:", error);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count ?? 0 };
}
