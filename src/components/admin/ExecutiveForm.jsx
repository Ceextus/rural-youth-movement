"use client";

import { useState } from "react";
import { createExecutive, updateExecutive } from "@/lib/actions/adminExecutives";
import MediaPicker from "./MediaPicker";

/**
 * Form for creating/editing an executive.
 * Props:
 *   type: 'chapter' | 'national'
 *   chapterId: (required for chapter type, when creating)
 *   executive: existing executive object (for edit mode)
 *   onCancel: callback
 *   onSaved: callback
 */
export default function ExecutiveForm({ type, chapterId, executive, onCancel, onSaved }) {
  const isEdit = !!executive;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const fd = new FormData(e.target);
    const data = {
      name: fd.get("name"),
      role: fd.get("role"),
      photo_url: fd.get("photo_url"),
      display_order: fd.get("display_order"),
      chapter_id: chapterId,
    };

    if (type === "national") {
      data.bio = fd.get("bio");
    }

    const result = isEdit
      ? await updateExecutive(type, executive.id, data)
      : await createExecutive(type, data);

    if (result.success) {
      onSaved?.();
    } else {
      setError(result.error || "Failed to save.");
    }
    setSaving(false);
  }

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="font-label-lg text-label-lg text-on-background font-semibold">
        {isEdit ? "Edit Executive" : "Add Executive"}
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
            Name *
          </label>
          <input
            name="name"
            required
            defaultValue={executive?.name || ""}
            className={inputClasses}
            placeholder="Full name"
          />
        </div>
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
            Role *
          </label>
          <input
            name="role"
            required
            defaultValue={executive?.role || ""}
            className={inputClasses}
            placeholder="e.g. State Coordinator"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MediaPicker
          name="photo_url"
          label="Photo"
          defaultValue={executive?.photo_url || ""}
        />
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
            Display Order
          </label>
          <input
            name="display_order"
            type="number"
            defaultValue={executive?.display_order ?? 0}
            className={inputClasses}
          />
        </div>
      </div>

      {type === "national" && (
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
            Bio
          </label>
          <textarea
            name="bio"
            rows={3}
            defaultValue={executive?.bio || ""}
            className={`${inputClasses} resize-y`}
            placeholder="Short biography…"
          />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 font-body-sm text-body-sm bg-red-50 rounded-lg px-4 py-2.5">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-xl border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors disabled:opacity-50"
        >
          {saving && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
          {isEdit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
