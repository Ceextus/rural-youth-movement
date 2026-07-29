import { getSupabaseAdmin } from "@/lib/supabase/admin";
import PillarsManager from "@/components/admin/PillarsManager";

export const metadata = { title: "Agenda Pillars | Admin Dashboard" };

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

export default async function AdminAgendaPage() {
  const pillars = await getAgendaPillars();

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Agenda Pillars
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Manage the core agenda pillars displayed on the public site.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
        <PillarsManager pillars={pillars} />
      </div>
    </div>
  );
}
