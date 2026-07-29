import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPublishedPostBySlug } from "@/lib/queries/adminNews";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | RYM News`,
    description: post.excerpt || post.title,
  };
}

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) return notFound();

  return (
    <article className="py-[80px] px-margin-mobile md:px-margin-desktop max-w-[800px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-on-surface-variant font-body-sm text-body-sm">
        <Link href="/news" className="hover:text-primary transition-colors">
          News
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-background font-medium truncate">{post.title}</span>
      </div>

      {/* Tag + Date */}
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-md text-label-md">
          {post.tag}
        </span>
        <time className="font-body-sm text-body-sm text-on-surface-variant">
          {new Date(post.published_at || post.created_at).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>

      {/* Title */}
      <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-6">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 border-l-4 border-primary/30 pl-4">
          {post.excerpt}
        </p>
      )}

      {/* Cover Image */}
      {post.cover_image && (
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-cover"
          />
        </div>
      )}

      {/* Body */}
      <div className="prose prose-lg max-w-none font-body-md text-body-md text-on-background leading-relaxed whitespace-pre-wrap">
        {post.body}
      </div>

      {/* Back link */}
      <div className="mt-12 pt-8 border-t border-outline-variant/20">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:text-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to News
        </Link>
      </div>
    </article>
  );
}
