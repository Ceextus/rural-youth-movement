"use client";

import { approveMember, rejectMember } from "@/lib/actions/adminMembers";

export default function MemberDetailModal({ member, onClose, onRefresh }) {
  if (!member) return null;

  async function handleAction(actionFn) {
    const result = await actionFn(member.id);
    if (result.success) {
      onRefresh?.();
      onClose();
    }
  }

  const statusColors = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md h-full bg-surface-container-lowest shadow-2xl overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant/15 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-headline-sm text-[18px] text-on-background font-semibold">
            Member Details
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-[20px]">
                {member.first_name?.[0]}{member.last_name?.[0]}
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-[20px] text-on-background font-semibold">
                {member.first_name} {member.last_name}
              </h3>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize mt-1 ${
                  statusColors[member.status] || statusColors.pending
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <DetailRow icon="mail" label="Email" value={member.email} />
            <DetailRow icon="phone" label="Phone" value={member.phone} />
            <DetailRow icon="location_on" label="State" value={member.state} />
            <DetailRow icon="map" label="LGA" value={member.lga} />
            <DetailRow icon="home" label="Ward" value={member.ward} />
            <DetailRow
              icon="calendar_today"
              label="Registered"
              value={new Date(member.created_at).toLocaleDateString("en-NG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />

            {/* Interests */}
            {member.interests?.length > 0 && (
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">interests</span>
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary font-label-md text-[12px]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Vision */}
            {member.vision && (
              <div>
                <p className="font-label-md text-label-md text-on-surface-variant mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                  Vision Statement
                </p>
                <p className="font-body-sm text-body-sm text-on-background bg-surface-container-low rounded-lg p-4 border border-outline-variant/15">
                  {member.vision}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          {member.status === "pending" && (
            <div className="flex gap-3 pt-4 border-t border-outline-variant/15">
              <button
                onClick={() => handleAction(approveMember)}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white font-label-lg text-label-lg px-4 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Approve
              </button>
              <button
                onClick={() => handleAction(rejectMember)}
                className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white font-label-lg text-label-lg px-4 py-3 rounded-xl hover:bg-red-700 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="material-symbols-outlined text-[18px] text-on-surface-variant/50 mt-0.5">
        {icon}
      </span>
      <div>
        <p className="font-label-md text-[11px] text-on-surface-variant/60 uppercase tracking-wider">
          {label}
        </p>
        <p className="font-body-sm text-[14px] text-on-background">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}
