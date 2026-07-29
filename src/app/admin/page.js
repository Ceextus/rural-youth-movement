import StatCard from "@/components/admin/StatCard";
import {
  getOverviewStats,
  getRecentMembers,
  getRecentContacts,
} from "@/lib/queries/adminStats";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const [stats, recentMembers, recentContacts] = await Promise.all([
    getOverviewStats(),
    getRecentMembers(5),
    getRecentContacts(5),
  ]);

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Overview
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Welcome to the RYM Admin Dashboard.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          icon="group"
          label="Total Members"
          value={stats.totalMembers}
        />
        <StatCard
          icon="pending"
          label="Pending Approval"
          value={stats.pendingMembers}
          subtitle="Awaiting review"
        />
        <StatCard
          icon="location_on"
          label="Active Chapters"
          value={stats.activeChapters}
        />
        <StatCard
          icon="mail"
          label="Contact Messages"
          value={stats.totalContacts}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/15">
            <h2 className="font-headline-sm text-[18px] leading-[24px] text-on-background font-semibold">
              Recent Members
            </h2>
            <Link
              href="/admin/members"
              className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors flex items-center gap-1"
            >
              View all
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>

          {recentMembers.length === 0 ? (
            <div className="px-5 py-8 text-center text-on-surface-variant/50 font-body-sm text-body-sm">
              No member registrations yet.
            </div>
          ) : (
            <ul className="divide-y divide-outline-variant/10">
              {recentMembers.map((member) => (
                <li
                  key={member.id}
                  className="px-5 py-3 flex items-center gap-3 hover:bg-surface-container-low/50 transition-colors"
                >
                  {/* Avatar placeholder */}
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold text-[13px]">
                      {member.first_name?.[0]}
                      {member.last_name?.[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body-sm text-[14px] text-on-background font-medium truncate">
                      {member.first_name} {member.last_name}
                    </p>
                    <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                      {member.state} • {member.email}
                    </p>
                  </div>
                  <StatusBadge status={member.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/15">
            <h2 className="font-headline-sm text-[18px] leading-[24px] text-on-background font-semibold">
              Recent Messages
            </h2>
            <Link
              href="/admin/contacts"
              className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors flex items-center gap-1"
            >
              View all
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>

          {recentContacts.length === 0 ? (
            <div className="px-5 py-8 text-center text-on-surface-variant/50 font-body-sm text-body-sm">
              No contact messages yet.
            </div>
          ) : (
            <ul className="divide-y divide-outline-variant/10">
              {recentContacts.map((msg) => (
                <li
                  key={msg.id}
                  className="px-5 py-3 hover:bg-surface-container-low/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-body-sm text-[14px] text-on-background font-medium truncate">
                      {msg.name}
                    </p>
                    <time className="font-body-sm text-[11px] text-on-surface-variant/60 flex-shrink-0 ml-2">
                      {new Date(msg.created_at).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-2">
                    {msg.message}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending:
      "bg-amber-100 text-amber-700 border-amber-200",
    approved:
      "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected:
      "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}
