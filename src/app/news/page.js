import NewsHero from "@/components/sections/NewsHero";
import NewsFeed from "@/components/sections/NewsFeed";
import ContactSection from "@/components/sections/ContactSection";

export const metadata = {
  title: "News & Contact | Rural Youth Movement (RYM)",
  description:
    "The latest movements, policies, and community action from RYM chapters across Nigeria — and how to get in touch.",
};

export default function NewsPage() {
  return (
    <>
      <NewsHero />
      <NewsFeed />
      <ContactSection />
    </>
  );
}
