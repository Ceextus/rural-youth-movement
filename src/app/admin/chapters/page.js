import Link from "next/link";
import { getChapters } from "@/lib/queries/chapters";

export const metadata = { title: "Chapters | Admin Dashboard" };

export default async function AdminChaptersPage() {
  const chapters = await getChapters();

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          State Chapters
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Manage all 37 state chapters across Nigeria.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((ch) => (
          <Link
            key={ch.id}
            href={`/admin/chapters/${ch.slug}`}
            className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-headline-sm text-[16px] text-on-background font-semibold group-hover:text-primary transition-colors">
                {ch.state}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${
                  ch.status === "active"
                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                    : "bg-amber-100 text-amber-700 border-amber-200"
                }`}
              >
                {ch.status}
              </span>
            </div>

            {ch.tagline && (
              <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-2 mb-3">
                {ch.tagline}
              </p>
            )}

            <div className="flex items-center gap-4 text-[11px] text-on-surface-variant/60 font-mono">
              <span>{ch.stat_members} members</span>
              <span>{ch.stat_projects} projects</span>
              <span>{ch.stat_communities} comm.</span>
            </div>

            <div className="mt-3 flex items-center gap-1 text-primary font-label-md text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">
              Edit chapter
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
