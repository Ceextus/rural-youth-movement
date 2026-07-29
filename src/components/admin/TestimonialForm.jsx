"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/actions/adminTestimonials";
import MediaPicker from "./MediaPicker";

export default function TestimonialForm({ testimonial, onDone }) {
  const router = useRouter();
  const isEdit = !!testimonial;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.target);
    const result = isEdit
      ? await updateTestimonial(testimonial.id, formData)
      : await createTestimonial(formData);

    if (result.success) {
      onDone?.();
      router.refresh();
    } else {
      setError(result.error || "Failed to save.");
    }
    setSaving(false);
  }

  async function handleDelete() {
    const result = await deleteTestimonial(testimonial.id);
    if (result.success) {
      onDone?.();
      router.refresh();
    }
  }

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">Name *</label>
          <input name="name" required defaultValue={testimonial?.name || ""} className={inputClasses} placeholder="Full name" />
        </div>
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">Role</label>
          <input name="role" defaultValue={testimonial?.role || ""} className={inputClasses} placeholder="e.g. Community Leader" />
        </div>
      </div>

      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">Quote *</label>
        <textarea name="quote" required rows={3} defaultValue={testimonial?.quote || ""} className={`${inputClasses} resize-y`} placeholder="Testimonial quote…" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MediaPicker name="photo_url" label="Photo" defaultValue={testimonial?.photo_url || ""} />
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">Display Order</label>
          <input name="display_order" type="number" defaultValue={testimonial?.display_order ?? 0} className={inputClasses} />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 font-body-sm text-body-sm bg-red-50 rounded-lg px-4 py-2.5">
          <span className="material-symbols-outlined text-[16px]">error</span>
          {error}
        </div>
      )}

      <div className="flex items-center gap-2 justify-end">
        {isEdit && (
          confirmDelete ? (
            <div className="flex items-center gap-2 mr-auto">
              <button type="button" onClick={handleDelete} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[12px] font-medium">Yes, delete</button>
              <button type="button" onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-on-surface-variant text-[12px]">Cancel</button>
            </div>
          ) : (
            <button type="button" onClick={() => setConfirmDelete(true)} className="mr-auto text-red-500 font-label-md text-[12px] hover:text-red-700 transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">delete</span> Delete
            </button>
          )
        )}
        <button type="button" onClick={onDone} className="px-4 py-2 rounded-xl border border-outline-variant/30 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors disabled:opacity-50">
          {saving && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
          {isEdit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
}
