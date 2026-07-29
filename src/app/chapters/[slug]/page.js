import { notFound } from "next/navigation";
import { getChapterBySlug, getChapters } from "@/lib/queries/chapters";
import ChapterHero from "@/components/sections/ChapterHero";
import ChapterAbout from "@/components/sections/ChapterAbout";
import ChapterExecutives from "@/components/sections/ChapterExecutives";
import CtaBanner from "@/components/sections/CtaBanner";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) {
    return { title: "Chapter Not Found" };
  }

  return {
    title: `${chapter.state} Chapter`,
    description:
      chapter.tagline ||
      `Explore the Rural Youth Movement chapter in ${chapter.state} — meet the leadership, see stats, and get involved.`,
  };
}

export default async function ChapterDetailPage({ params }) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) notFound();

  return (
    <>
      <ChapterHero chapter={chapter} />
      <ChapterAbout chapter={chapter} />
      <ChapterExecutives executives={chapter.executives} />
      <CtaBanner />
    </>
  );
}
