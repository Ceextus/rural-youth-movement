"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteExecutive } from "@/lib/actions/adminExecutives";
import ExecutiveForm from "./ExecutiveForm";

/**
 * Renders a list of executives with add/edit/delete and inline form.
 * Props:
 *   executives: array of executive objects
 *   type: 'chapter' | 'national'
 *   chapterId: (required for chapter type)
 */
export default function ExecutivesList({ executives, type, chapterId }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  async function handleDelete(id) {
    const result = await deleteExecutive(type, id);
    if (result.success) {
      setConfirmDeleteId(null);
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-[18px] text-on-background font-semibold">
          {type === "national" ? "National Executives" : "Chapter Executives"}
        </h3>
        <button
          onClick={() => { setShowAddForm(true); setEditingId(null); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5">
          <ExecutiveForm
            type={type}
            chapterId={chapterId}
            onCancel={() => setShowAddForm(false)}
            onSaved={() => { setShowAddForm(false); router.refresh(); }}
          />
        </div>
      )}

      {/* List */}
      {executives.length === 0 && !showAddForm ? (
        <div className="text-center py-8 text-on-surface-variant/50 font-body-sm text-body-sm">
          No executives added yet.
        </div>
      ) : (
        <div className="space-y-2">
          {executives.map((exec) => (
            <div
              key={exec.id}
              className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden"
            >
              {editingId === exec.id ? (
                <div className="p-5">
                  <ExecutiveForm
                    type={type}
                    chapterId={chapterId}
                    executive={exec}
                    onCancel={() => setEditingId(null)}
                    onSaved={() => { setEditingId(null); router.refresh(); }}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Photo or placeholder */}
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {exec.photo_url ? (
                      <img src={exec.photo_url} alt={exec.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-body-sm text-[14px] text-on-background font-medium truncate">
                      {exec.name}
                    </p>
                    <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                      {exec.role}
                    </p>
                  </div>

                  {/* Order */}
                  <span className="text-[11px] text-on-surface-variant/40 font-mono flex-shrink-0">
                    #{exec.display_order}
                  </span>

                  {/* Actions */}
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => { setEditingId(exec.id); setShowAddForm(false); }}
                      className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-colors"
                      title="Edit"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>

                    {confirmDeleteId === exec.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(exec.id)}
                          className="px-2 py-1 rounded-lg bg-red-600 text-white text-[11px] font-medium"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1 rounded-lg border border-outline-variant/30 text-on-surface-variant text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(exec.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
