import { getContent } from "@/lib/queries/content";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import ContentEditor from "@/components/admin/ContentEditor";

export const metadata = { title: "Content | Admin Dashboard" };

async function getAgendaPillars() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("agenda_pillars")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch agenda pillars:", error);
    return [];
  }
  return data || [];
}

export default async function AdminContentPage() {
  const [content, pillars] = await Promise.all([
    getContent(),
    getAgendaPillars(),
  ]);

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Page Content
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Edit the content sections across all public pages.
        </p>
      </div>
      <ContentEditor content={content} pillars={pillars} />
    </div>
  );
}
