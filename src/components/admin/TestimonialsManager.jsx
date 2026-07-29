"use client";

import { useState } from "react";
import TestimonialForm from "@/components/admin/TestimonialForm";

export default function TestimonialsManager({ testimonials }) {
  const [editingId, setEditingId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
        </span>
        <button
          onClick={() => { setShowAdd(true); setEditingId(null); }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Testimonial
        </button>
      </div>

      {showAdd && (
        <div className="bg-surface-container-low border border-outline-variant/20 rounded-xl p-5">
          <TestimonialForm onDone={() => setShowAdd(false)} />
        </div>
      )}

      {testimonials.length === 0 && !showAdd ? (
        <div className="text-center py-12 text-on-surface-variant/50 font-body-sm text-body-sm">
          No testimonials yet. Add your first one!
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
              {editingId === t.id ? (
                <div className="p-5">
                  <TestimonialForm testimonial={t} onDone={() => setEditingId(null)} />
                </div>
              ) : (
                <div className="flex items-start gap-4 px-5 py-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {t.photo_url ? (
                      <img src={t.photo_url} alt={t.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-primary text-[20px]">format_quote</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body-sm text-[14px] text-on-background font-medium">{t.name}</p>
                    {t.role && <p className="font-body-sm text-[12px] text-on-surface-variant">{t.role}</p>}
                    <p className="font-body-sm text-[13px] text-on-surface-variant/80 mt-1 line-clamp-2 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                  <span className="text-[11px] text-on-surface-variant/40 font-mono flex-shrink-0">#{t.display_order}</span>
                  <button
                    onClick={() => { setEditingId(t.id); setShowAdd(false); }}
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
