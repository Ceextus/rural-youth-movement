"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateChapter } from "@/lib/actions/adminChapters";

export default function ChapterEditForm({ chapter }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const formData = new FormData(e.target);
    const result = await updateChapter(chapter.id, formData);

    if (result.success) {
      setToast({ type: "success", message: "Chapter updated successfully." });
      router.refresh();
    } else {
      setToast({ type: "error", message: result.error || "Failed to save." });
    }
    setSaving(false);
    setTimeout(() => setToast(null), 4000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Read-only info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FieldReadOnly label="State" value={chapter.state} />
        <FieldReadOnly label="Slug" value={chapter.slug} />
      </div>

      {/* Editable fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Status" name="status" defaultValue={chapter.status} type="select" options={["active", "forming"]} />
        <Field label="Established" name="established" defaultValue={chapter.established} />
      </div>

      <Field label="Tagline" name="tagline" defaultValue={chapter.tagline} />
      <Field label="About" name="about" defaultValue={chapter.about} type="textarea" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="HQ Address" name="hq_address" defaultValue={chapter.hq_address} />
        <Field label="Contact Email" name="contact_email" defaultValue={chapter.contact_email} type="email" />
      </div>

      <Field label="Contact Phone" name="contact_phone" defaultValue={chapter.contact_phone} />

      {/* Stats */}
      <div>
        <p className="font-label-md text-label-md text-on-surface-variant mb-3">Chapter Statistics</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label="Projects" name="stat_projects" defaultValue={chapter.stat_projects} type="number" />
          <Field label="Communities" name="stat_communities" defaultValue={chapter.stat_communities} type="number" />
          <Field label="Events" name="stat_events" defaultValue={chapter.stat_events} type="number" />
          <Field label="LGAs" name="stat_lgas" defaultValue={chapter.stat_lgas} type="number" />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-lg font-body-sm text-body-sm ${
          toast.type === "success" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
        }`}>
          <span className="material-symbols-outlined text-[18px]">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          {toast.message}
        </div>
      )}

      {/* Save */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-xl shadow-sm hover:bg-primary-container transition-all disabled:opacity-50"
        >
          {saving ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
              Saving…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">save</span>
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({ label, name, defaultValue, type = "text", options }) {
  const baseClasses = "w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <div>
      <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          defaultValue={defaultValue || ""}
          rows={4}
          className={`${baseClasses} resize-y`}
        />
      ) : type === "select" ? (
        <select name={name} defaultValue={defaultValue || ""} className={baseClasses}>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function FieldReadOnly({ label, value }) {
  return (
    <div>
      <label className="block font-label-md text-[12px] text-on-surface-variant mb-1.5">
        {label}
      </label>
      <div className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant font-body-sm text-body-sm border border-outline-variant/20">
        {value}
      </div>
    </div>
  );
}
