import AboutHero from "@/components/sections/AboutHero";
import OriginAffiliation from "@/components/sections/OriginAffiliation";
import CoreValues from "@/components/sections/CoreValues";
import VisionMission from "@/components/sections/VisionMission";
import ImpactGallery from "@/components/sections/ImpactGallery";
import CtaBanner from "@/components/sections/CtaBanner";
import { getContent } from "@/lib/queries/content";

export const metadata = {
  title: "About | Rural Youth Movement (RYM)",
  description:
    "A modern grassroots initiative empowering rural youth across Nigeria — building leadership, agricultural innovation, and community resilience.",
};

export default async function AboutPage() {
  const content = await getContent();
  return (
    <>
      <AboutHero content={content["about.hero"]} />
      <OriginAffiliation content={content["about.origin"]} />
      <CoreValues content={content["about.values"]} />
      <VisionMission content={content["about.vision"]} />
      <ImpactGallery />
      <CtaBanner />
    </>
  );
}
