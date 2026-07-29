import { getNationalExecutives } from "@/lib/queries/chapters";
import ExecutivesList from "@/components/admin/ExecutivesList";

export const metadata = { title: "National Executives | Admin Dashboard" };

export default async function AdminNationalExecutivesPage() {
  const executives = await getNationalExecutives();

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          National Executives
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Manage the national leadership team.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
        <ExecutivesList
          executives={executives}
          type="national"
        />
      </div>
    </div>
  );
}
