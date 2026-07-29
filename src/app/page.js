import Hero from "@/components/sections/Hero";
import StatBar from "@/components/sections/StatBar";
import WhoWeAre from "@/components/sections/WhoWeAre";
import PillarGrid from "@/components/sections/PillarGrid";
import NewsHighlights from "@/components/sections/NewsHighlights";
import TestimonialSection from "@/components/sections/TestimonialSection";
import CtaBanner from "@/components/sections/CtaBanner";
import { getPublishedPosts } from "@/lib/queries/adminNews";
import { getContent } from "@/lib/queries/content";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getLiveStats } from "@/lib/queries/publicStats";

async function getTestimonials() {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [newsPosts, testimonials, content, liveStats] = await Promise.all([
    getPublishedPosts({ limit: 3 }),
    getTestimonials(),
    getContent(),
    getLiveStats(),
  ]);

  return (
    <>
      <Hero content={content["home.hero"]} />
      <StatBar content={content["home.stats"]} liveStats={liveStats} />
      <WhoWeAre />
      <PillarGrid />
      <NewsHighlights posts={newsPosts} />
      <TestimonialSection testimonials={testimonials} />
      <CtaBanner content={content["home.cta"]} />
    </>
  );
}
