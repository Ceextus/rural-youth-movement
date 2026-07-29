"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createNewsPost, updateNewsPost, deleteNewsPost } from "@/lib/actions/adminNews";
import MediaPicker from "./MediaPicker";

const TAGS = ["General", "Initiative", "Event", "Progress", "Announcement"];

export default function NewsForm({ post }) {
  const isEdit = !!post;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleTitleChange(e) {
    const val = e.target.value;
    setTitle(val);
    if (!isEdit || slug === generateSlug(title)) {
      setSlug(generateSlug(val));
    }
  }

  function generateSlug(t) {
    return t
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.target);
    const result = isEdit
      ? await updateNewsPost(post.id, formData)
      : await createNewsPost(formData);

    if (result.success) {
      if (isEdit) {
        setToast({ type: "success", message: "Post updated successfully!" });
        router.refresh();
        setTimeout(() => setToast(null), 4000);
      } else {
        router.push("/admin/news");
      }
    } else {
      setError(result.error || "Failed to save.");
    }
    setSaving(false);
  }

  async function handleDelete() {
    const result = await deleteNewsPost(post.id);
    if (result.success) {
      router.push("/admin/news");
    }
  }

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
          Title *
        </label>
        <input
          name="title"
          required
          value={title}
          onChange={handleTitleChange}
          className={inputClasses}
          placeholder="Post title"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
          Slug
        </label>
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant/50 font-body-sm text-[13px]">/news/</span>
          <input
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={inputClasses}
            placeholder="auto-generated-from-title"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          rows={2}
          maxLength={300}
          defaultValue={post?.excerpt || ""}
          className={`${inputClasses} resize-y`}
          placeholder="Brief summary (max 300 chars)…"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
          Body *
        </label>
        <textarea
          name="body"
          required
          rows={12}
          defaultValue={post?.body || ""}
          className={`${inputClasses} resize-y font-mono text-[13px]`}
          placeholder="Write your article content here…"
        />
      </div>

      {/* Cover Image + Tag row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MediaPicker
          name="cover_image"
          label="Cover Image"
          defaultValue={post?.cover_image || ""}
        />
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
            Tag
          </label>
          <select name="tag" defaultValue={post?.tag || "General"} className={inputClasses}>
            {TAGS.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
          Status
        </label>
        <select name="status" defaultValue={post?.status || "draft"} className={inputClasses}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {post?.published_at && (
          <p className="mt-1.5 font-body-sm text-[11px] text-on-surface-variant/50">
            First published:{" "}
            {new Date(post.published_at).toLocaleDateString("en-NG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Feedback */}
      {toast && (
        <div className={`flex items-center gap-2 font-body-sm text-body-sm rounded-lg px-4 py-2.5 ${
          toast.type === "success" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}>
          <span className="material-symbols-outlined text-[16px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          {toast.message}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-600 font-body-sm text-body-sm bg-red-50 rounded-lg px-4 py-2.5">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/15">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-xl shadow-sm hover:bg-primary-container transition-all disabled:opacity-50"
        >
          {saving && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
          {isEdit ? "Update Post" : "Create Post"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-3 rounded-xl border border-outline-variant/30 text-on-surface-variant font-label-lg text-label-lg hover:bg-surface-container-low transition-colors"
        >
          Cancel
        </button>

        {isEdit && (
          <div className="ml-auto">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-on-surface-variant">Sure?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[13px] font-medium"
                >
                  Yes, delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant text-[13px]"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="flex items-center gap-1.5 text-red-500 font-label-md text-label-md hover:text-red-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                Delete Post
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
