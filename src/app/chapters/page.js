import { getChapters, getNationalExecutives } from "@/lib/queries/chapters";
import ChaptersHero from "@/components/sections/ChaptersHero";
import NationalLeadership from "@/components/sections/NationalLeadership";
import ChapterGrid from "@/components/sections/ChapterGrid";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata = {
  title: "State Chapters",
  description:
    "Explore RYM's presence across Nigeria's 36 states. Find your state chapter, meet local executives, and see the impact in your community.",
};

export default async function ChaptersPage() {
  const [chapters, nationalExecs] = await Promise.all([
    getChapters(),
    getNationalExecutives(),
  ]);

  const totalMembers = chapters.reduce((sum, ch) => sum + ch.stat_members, 0);

  return (
    <>
      <ChaptersHero
        totalChapters={chapters.length}
        totalMembers={totalMembers}
      />
      <NationalLeadership executives={nationalExecs} />
      <ChapterGrid chapters={chapters} />
      <CtaBanner />
    </>
  );
}
