import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

/**
 * Fetch all news posts for admin listing (drafts + published).
 */
export async function getNewsPosts({ status, page = 1, perPage = 20 } = {}) {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("news_posts")
    .select("*", { count: "exact" });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  query = query.order("created_at", { ascending: false });

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);

  const { data, count, error } = await query;

  if (error) {
    console.error("Failed to fetch news posts:", error);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count ?? 0 };
}

/**
 * Fetch a single news post by ID (admin — includes drafts).
 */
export async function getNewsPostById(id) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Failed to fetch news post:", error);
    return null;
  }

  return data;
}

/**
 * Fetch published posts for public pages.
 */
export async function getPublishedPosts({ limit } = {}) {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("news_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch published posts:", error);
    return [];
  }

  return data || [];
}

/**
 * Fetch a single published post by slug (public page).
 */
export async function getPublishedPostBySlug(slug) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
}
