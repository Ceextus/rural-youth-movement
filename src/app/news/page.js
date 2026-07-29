import NewsHero from "@/components/sections/NewsHero";
import NewsFeed from "@/components/sections/NewsFeed";
import ContactSection from "@/components/sections/ContactSection";
import NewsCard from "@/components/cards/NewsCard";
import { getPublishedPosts } from "@/lib/queries/adminNews";
import { getSettings } from "@/lib/queries/settings";

export const metadata = {
  title: "News & Contact | Rural Youth Movement (RYM)",
  description:
    "The latest movements, policies, and community action from RYM chapters across Nigeria — and how to get in touch.",
};

export default async function NewsPage() {
  const [posts, settings] = await Promise.all([
    getPublishedPosts(),
    getSettings(),
  ]);

  // First 3 go to the featured bento, the rest go in the full grid
  const featuredPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);

  return (
    <>
      <NewsHero />
      <NewsFeed posts={featuredPosts} />

      {/* All Articles Grid */}
      {remainingPosts.length > 0 && (
        <section className="py-[80px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-10 border-b border-outline-variant/30 pb-4">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background">
              More Articles
            </h2>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {posts.length} article{posts.length !== 1 ? "s" : ""} total
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
            {remainingPosts.map((post) => (
              <NewsCard
                key={post.id}
                image={post.cover_image || "/images/news/kano-agritech.jpg"}
                alt={post.title}
                tag={post.tag || "General"}
                date={new Date(post.published_at || post.created_at).toLocaleDateString("en-NG", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
                title={post.title}
                excerpt={post.excerpt || ""}
                href={`/news/${post.slug}`}
              />
            ))}
          </div>
        </section>
      )}

      <ContactSection
        email={settings.contact_email}
        phone={settings.contact_phone}
        address={settings.contact_address}
      />
    </>
  );
}
