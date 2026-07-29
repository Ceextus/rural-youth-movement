"use client";

import { useEffect, useRef, useState } from "react";
import { uploadMedia, listMedia, deleteMedia } from "@/lib/actions/adminMedia";

/**
 * Image field backed by the Supabase media library.
 * Renders a hidden input named `name` so it works inside plain <form> submissions.
 *
 * Props: name, label, defaultValue
 */
export default function MediaPicker({ name, label = "Image", defaultValue = "", onChange }) {
  const [value, setValue] = useState(defaultValue || "");
  const [open, setOpen] = useState(false);

  function update(url) {
    setValue(url);
    onChange?.(url);
  }

  return (
    <div>
      <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
        {label}
      </label>

      <input type="hidden" name={name} value={value} />

      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-xl border border-outline-variant/40 bg-surface-container-low overflow-hidden flex items-center justify-center flex-shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="material-symbols-outlined text-on-surface-variant/40">
              image
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant/40 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">photo_library</span>
            {value ? "Change" : "Choose image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => update("")}
              className="px-3 py-2 rounded-lg text-on-surface-variant/60 font-label-md text-label-md hover:text-red-500 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {open && (
        <MediaLibraryModal
          onClose={() => setOpen(false)}
          onSelect={(url) => {
            update(url);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}

function MediaLibraryModal({ onClose, onSelect }) {
  const [items, setItems] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  async function refresh() {
    setItems(await listMedia());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadMedia(fd);
    setUploading(false);
    if (result.success) {
      await refresh();
      onSelect(result.url);
    } else {
      setError(result.error || "Upload failed.");
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleDelete(path) {
    await deleteMedia(path);
    refresh();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface-container-lowest w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/15">
          <h3 className="font-headline-sm text-headline-sm text-on-background">
            Media Library
          </h3>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md cursor-pointer hover:bg-primary-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                {uploading ? "progress_activity" : "upload"}
              </span>
              {uploading ? "Uploading…" : "Upload"}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-4 flex items-center gap-2 text-red-600 font-body-sm text-body-sm bg-red-50 rounded-lg px-4 py-2.5">
            <span className="material-symbols-outlined text-[16px]">error</span>
            {error}
          </div>
        )}

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {items === null ? (
            <div className="flex items-center justify-center py-16 text-on-surface-variant/50 gap-2">
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Loading…
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant/50 font-body-sm text-body-sm">
              No images yet. Upload your first one above.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {items.map((item) => (
                <div
                  key={item.path}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-outline-variant/30 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                  onClick={() => onSelect(item.url)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.path);
                    }}
                    className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    aria-label="Delete"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
