import Link from "next/link";
import { getChapterBySlug } from "@/lib/queries/chapters";
import ChapterEditForm from "@/components/admin/ChapterEditForm";
import ExecutivesList from "@/components/admin/ExecutivesList";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);
  return { title: chapter ? `${chapter.state} Chapter | Admin` : "Chapter Not Found" };
}

export default async function AdminChapterDetailPage({ params }) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) return notFound();

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-on-surface-variant font-body-sm text-body-sm">
        <Link href="/admin/chapters" className="hover:text-primary transition-colors">
          Chapters
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-background font-medium">{chapter.state}</span>
      </div>

      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          {chapter.state} Chapter
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Edit chapter information and manage executives.
        </p>
      </div>

      {/* Chapter Edit Form */}
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 mb-8">
        <h2 className="font-headline-sm text-[18px] text-on-background font-semibold mb-6">
          Chapter Information
        </h2>
        <ChapterEditForm chapter={chapter} />
      </div>

      {/* Executives */}
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
        <ExecutivesList
          executives={chapter.executives || []}
          type="chapter"
          chapterId={chapter.id}
        />
      </div>
    </div>
  );
}
