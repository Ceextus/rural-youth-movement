"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createPillar,
  updatePillar,
  deletePillar,
} from "@/lib/actions/adminAgenda";

export default function AgendaPillarForm({ pillar, onDone }) {
  const router = useRouter();
  const isEdit = !!pillar;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [iconPreview, setIconPreview] = useState(pillar?.icon || "flag");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const formData = new FormData(e.target);
    const result = isEdit
      ? await updatePillar(pillar.id, formData)
      : await createPillar(formData);

    if (result.success) {
      onDone?.();
      router.refresh();
    } else {
      setError(result.error || "Failed to save.");
    }
    setSaving(false);
  }

  async function handleDelete() {
    const result = await deletePillar(pillar.id);
    if (result.success) {
      onDone?.();
      router.refresh();
    }
  }

  const inputClasses =
    "w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">Title *</label>
        <input name="title" required defaultValue={pillar?.title || ""} className={inputClasses} placeholder="e.g. Education & Skills" />
      </div>

      <div>
        <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">Description</label>
        <textarea name="description" rows={3} defaultValue={pillar?.description || ""} className={`${inputClasses} resize-y`} placeholder="Pillar description…" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
            Icon (Material Symbols name)
          </label>
          <div className="flex items-center gap-3">
            <input
              name="icon"
              defaultValue={pillar?.icon || "flag"}
              className={inputClasses}
              placeholder="e.g. school, agriculture, work"
              onChange={(e) => setIconPreview(e.target.value)}
            />
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                {iconPreview}
              </span>
            </div>
          </div>
        </div>
        <div>
          <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">Display Order</label>
          <input name="display_order" type="number" defaultValue={pillar?.display_order ?? 0} className={inputClasses} />
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
