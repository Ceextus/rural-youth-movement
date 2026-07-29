import Link from "next/link";
import { getNewsPosts } from "@/lib/queries/adminNews";

export const metadata = { title: "News Posts | Admin Dashboard" };

export default async function AdminNewsPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || "all";
  const page = parseInt(params?.page || "1", 10);

  const { data: posts, total } = await getNewsPosts({ status, page, perPage: 20 });

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-headline-md text-headline-md text-on-background">
            News Posts
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Create and manage news articles.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="flex items-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg px-5 py-2.5 rounded-xl hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {[
          { label: "All", value: "all" },
          { label: "Draft", value: "draft" },
          { label: "Published", value: "published" },
        ].map((filter) => {
          const isActive = status === filter.value;
          return (
            <Link
              key={filter.value}
              href={`/admin/news${filter.value === "all" ? "" : `?status=${filter.value}`}`}
              className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      {/* Posts Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/15 bg-surface-container-low/50">
                <th className="px-5 py-3 font-label-md text-label-md text-on-surface-variant">Title</th>
                <th className="px-5 py-3 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Tag</th>
                <th className="px-5 py-3 font-label-md text-label-md text-on-surface-variant">Status</th>
                <th className="px-5 py-3 font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-on-surface-variant/50 font-body-sm text-body-sm">
                    No posts yet. Create your first one!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-surface-container-low/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/news/${post.id}/edit`}
                        className="font-body-sm text-[14px] text-on-background font-medium hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                      {post.excerpt && (
                        <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1 mt-0.5">
                          {post.excerpt}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-label-md text-[11px]">
                        {post.tag}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${
                          post.status === "published"
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-body-sm text-[12px] text-on-surface-variant/60 hidden sm:table-cell">
                      {new Date(post.published_at || post.created_at).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
