import AboutHero from "@/components/sections/AboutHero";
import OriginAffiliation from "@/components/sections/OriginAffiliation";
import CoreValues from "@/components/sections/CoreValues";
import VisionMission from "@/components/sections/VisionMission";
import ImpactGallery from "@/components/sections/ImpactGallery";
import CtaBanner from "@/components/sections/CtaBanner";

export const metadata = {
  title: "About | Rural Youth Movement (RYM)",
  description:
    "A modern grassroots initiative empowering rural youth across Nigeria — building leadership, agricultural innovation, and community resilience.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OriginAffiliation />
      <CoreValues />
      <VisionMission />
      <ImpactGallery />
      <CtaBanner />
    </>
  );
}
