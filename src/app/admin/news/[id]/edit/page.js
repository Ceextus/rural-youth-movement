import { notFound } from "next/navigation";
import { getNewsPostById } from "@/lib/queries/adminNews";
import NewsForm from "@/components/admin/NewsForm";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getNewsPostById(id);
  return { title: post ? `Edit: ${post.title} | Admin` : "Post Not Found" };
}

export default async function AdminEditPostPage({ params }) {
  const { id } = await params;
  const post = await getNewsPostById(id);

  if (!post) return notFound();

  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-on-surface-variant font-body-sm text-body-sm">
        <Link href="/admin/news" className="hover:text-primary transition-colors">
          News
        </Link>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-background font-medium truncate">{post.title}</span>
      </div>

      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Edit Post
        </h1>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
        <NewsForm post={post} />
      </div>
    </div>
  );
}
