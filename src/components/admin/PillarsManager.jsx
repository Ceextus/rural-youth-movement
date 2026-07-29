"use client";

import { useState } from "react";
import AgendaPillarForm from "@/components/admin/AgendaPillarForm";

export default function PillarsManager({ pillars }) {
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          {pillars.length} pillar{pillars.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => { setShowAdd(true); setEditingId(null); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Pillar
        </button>
      </div>

      {showAdd && (
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5">
          <AgendaPillarForm onDone={() => setShowAdd(false)} />
        </div>
      )}

      {pillars.length === 0 && !showAdd ? (
        <div className="text-center py-12 text-on-surface-variant/50 font-body-sm text-body-sm">
          No agenda pillars yet. Add your first one!
        </div>
      ) : (
        <div className="space-y-3">
          {pillars.map((p) => (
            <div key={p.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
              {editingId === p.id ? (
                <div className="p-5">
                  <AgendaPillarForm pillar={p} onDone={() => setEditingId(null)} />
                </div>
              ) : (
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {p.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body-sm text-[14px] text-on-background font-medium">{p.title}</p>
                    <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1">{p.description}</p>
                  </div>
                  <span className="text-[11px] text-on-surface-variant/40 font-mono flex-shrink-0">#{p.display_order}</span>
                  <button
                    onClick={() => { setEditingId(p.id); setShowAdd(false); }}
                    className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-colors flex-shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
