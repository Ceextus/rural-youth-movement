import "server-only";
import { createClient } from "@/lib/supabase/server";

// The registration form stores state names from `naija-state-local-government`,
// whose spellings differ from a couple of our chapter display names. Map the
// member-facing name -> chapter display name so live counts join correctly.
const MEMBER_TO_CHAPTER_STATE = {
  "Federal Capital Territory": "FCT",
  Nassarawa: "Nasarawa",
};
// Reverse: chapter display name -> member-facing name (for single-chapter lookups).
const CHAPTER_TO_MEMBER_STATE = Object.fromEntries(
  Object.entries(MEMBER_TO_CHAPTER_STATE).map(([member, chapter]) => [
    chapter,
    member,
  ])
);

/**
 * Fetch all chapters with their member counts from the aggregate view.
 * Returns chapters sorted alphabetically by state name.
 */
export async function getChapters() {
  const supabase = await createClient();

  // Fetch chapters
  const { data: chapters, error: chaptersError } = await supabase
    .from("chapters")
    .select("*")
    .order("state", { ascending: true });

  if (chaptersError) {
    console.error("Failed to fetch chapters:", chaptersError);
    return [];
  }

  // Fetch member counts per state
  const { data: counts, error: countsError } = await supabase
    .from("state_member_counts")
    .select("state, members");

  if (countsError) {
    console.error("Failed to fetch member counts:", countsError);
  }

  // Merge member counts into chapters, normalising divergent state spellings.
  const countMap = new Map();
  for (const c of counts || []) {
    const key = MEMBER_TO_CHAPTER_STATE[c.state] || c.state;
    countMap.set(key, (countMap.get(key) || 0) + c.members);
  }

  return (chapters || []).map((ch) => ({
    ...ch,
    stat_members: countMap.get(ch.state) || 0,
  }));
}

/**
 * Fetch a single chapter by slug, including its executives.
 * Returns null if the chapter doesn't exist.
 */
export async function getChapterBySlug(slug) {
  const supabase = await createClient();

  const { data: chapter, error: chapterError } = await supabase
    .from("chapters")
    .select("*")
    .eq("slug", slug)
    .single();

  if (chapterError || !chapter) return null;

  // Fetch executives for this chapter
  const { data: executives } = await supabase
    .from("chapter_executives")
    .select("*")
    .eq("chapter_id", chapter.id)
    .order("display_order", { ascending: true });

  // Fetch member count for this state (using the member-facing spelling).
  const memberStateName =
    CHAPTER_TO_MEMBER_STATE[chapter.state] || chapter.state;
  const { data: countRow } = await supabase
    .from("state_member_counts")
    .select("members")
    .eq("state", memberStateName)
    .maybeSingle();

  return {
    ...chapter,
    executives: executives || [],
    stat_members: countRow?.members || 0,
  };
}

/**
 * Fetch all national-level executives, ordered by display_order.
 */
export async function getNationalExecutives() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("national_executives")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch national executives:", error);
    return [];
  }

  return data || [];
}
