import AgendaHero from "@/components/sections/AgendaHero";
import CorePillars from "@/components/sections/CorePillars";
import InteractiveNigeriaMap from "@/components/sections/InteractiveNigeriaMap";
import AgendaCta from "@/components/sections/AgendaCta";
import { getContent, getAgendaPillars } from "@/lib/queries/content";
import { getChapters } from "@/lib/queries/chapters";
import { getStateMemberCounts } from "@/lib/queries/publicStats";

export const metadata = {
  title: "Our Agenda | Rural Youth Movement (RYM)",
  description:
    "A blueprint for rural prosperity — education, sustainable agriculture, youth employment, and civic engagement across all 36 states of Nigeria.",
};

export default async function AgendaPage() {
  const [content, pillars, chapters, memberCounts] = await Promise.all([
    getContent(),
    getAgendaPillars(),
    getChapters(),
    getStateMemberCounts(),
  ]);

  return (
    <>
      <AgendaHero content={content["agenda.hero"]} />
      <CorePillars content={content["agenda.pillars"]} pillars={pillars} />
      <InteractiveNigeriaMap
        content={content["agenda.reachmap"]}
        chapters={chapters}
        memberCounts={memberCounts}
      />
      <AgendaCta content={content["agenda.cta"]} />
    </>
  );
}
