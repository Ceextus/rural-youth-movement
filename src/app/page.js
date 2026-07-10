import Hero from "@/components/sections/Hero";
import StatBar from "@/components/sections/StatBar";
import WhoWeAre from "@/components/sections/WhoWeAre";
import PillarGrid from "@/components/sections/PillarGrid";
import NewsHighlights from "@/components/sections/NewsHighlights";
import CtaBanner from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <StatBar />
      <WhoWeAre />
      <PillarGrid />
      <NewsHighlights />
      <CtaBanner />
    </>
  );
}
