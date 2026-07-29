import NewsForm from "@/components/admin/NewsForm";

export const metadata = { title: "New Post | Admin Dashboard" };

export default function AdminNewPostPage() {
  return (
    <div className="p-6 md:p-8 max-w-[900px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          New Post
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Create a new news article.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
        <NewsForm />
      </div>
    </div>
  );
}
