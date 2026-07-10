import AgendaHero from "@/components/sections/AgendaHero";
import CorePillars from "@/components/sections/CorePillars";
import ReachMap from "@/components/sections/ReachMap";
import AgendaCta from "@/components/sections/AgendaCta";

export const metadata = {
  title: "Our Agenda | Rural Youth Movement (RYM)",
  description:
    "A blueprint for rural prosperity — education, sustainable agriculture, youth employment, and civic engagement across all 36 states of Nigeria.",
};

export default function AgendaPage() {
  return (
    <>
      <AgendaHero />
      <CorePillars />
      <ReachMap />
      <AgendaCta />
    </>
  );
}
