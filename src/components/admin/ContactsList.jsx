"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteContact, toggleContactRead } from "@/lib/actions/adminContacts";

export default function ContactsList({ contacts, total }) {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  async function handleDelete(id) {
    const result = await deleteContact(id);
    if (result.success) {
      setConfirmDeleteId(null);
      setExpandedId(null);
      router.refresh();
    }
  }

  async function handleToggleRead(id, currentIsRead) {
    await toggleContactRead(id, !currentIsRead);
    router.refresh();
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl px-6 py-16 text-center">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant/20 mb-4 block">
          inbox
        </span>
        <p className="font-body-md text-body-md text-on-surface-variant/50">
          No contact messages yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contacts.map((msg) => {
        const isExpanded = expandedId === msg.id;
        const isUnread = !msg.is_read;

        return (
          <div
            key={msg.id}
            className={`bg-surface-container-lowest border rounded-xl overflow-hidden transition-all duration-200 ${
              isUnread
                ? "border-primary/30 shadow-sm"
                : "border-outline-variant/20"
            }`}
          >
            {/* Header row */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : msg.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-surface-container-low/30 transition-colors"
            >
              {/* Unread dot */}
              <div className="w-2 flex-shrink-0">
                {isUnread && (
                  <div className="w-2 h-2 rounded-full bg-primary" />
                )}
              </div>

              {/* Sender info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`font-body-sm text-[14px] truncate ${isUnread ? "text-on-background font-semibold" : "text-on-background font-medium"}`}>
                    {msg.name}
                  </p>
                  <span className="font-body-sm text-[12px] text-on-surface-variant/50 flex-shrink-0">
                    {msg.email}
                  </span>
                </div>
                {!isExpanded && (
                  <p className="font-body-sm text-[13px] text-on-surface-variant line-clamp-1">
                    {msg.message}
                  </p>
                )}
              </div>

              {/* Date + chevron */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <time className="font-body-sm text-[11px] text-on-surface-variant/50">
                  {new Date(msg.created_at).toLocaleDateString("en-NG", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
                <span className={`material-symbols-outlined text-[18px] text-on-surface-variant/40 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-5 pb-5 border-t border-outline-variant/10">
                <p className="font-body-md text-body-md text-on-background py-4 whitespace-pre-wrap">
                  {msg.message}
                </p>

                <div className="flex items-center gap-2 pt-3 border-t border-outline-variant/10">
                  {/* Toggle read */}
                  <button
                    onClick={() => handleToggleRead(msg.id, msg.is_read)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isUnread ? "mark_email_read" : "mark_email_unread"}
                    </span>
                    {isUnread ? "Mark as read" : "Mark as unread"}
                  </button>

                  {/* Reply (mailto) */}
                  <a
                    href={`mailto:${msg.email}?subject=Re: Your message to RYM`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">reply</span>
                    Reply
                  </a>

                  {/* Delete */}
                  <div className="ml-auto">
                    {confirmDeleteId === msg.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] text-on-surface-variant">Delete?</span>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-[12px] font-medium hover:bg-red-700 transition-colors"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2.5 py-1 rounded-lg border border-outline-variant/30 text-on-surface-variant text-[12px] hover:bg-surface-container-low transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(msg.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
