"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  approveMember,
  rejectMember,
  bulkUpdateMemberStatus,
  exportMembersCSV,
} from "@/lib/actions/adminMembers";
import MemberDetailModal from "./MemberDetailModal";

const STATUS_FILTERS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export default function MembersTable({ members, total, currentPage, perPage, currentStatus, currentSearch }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState([]);
  const [detailMember, setDetailMember] = useState(null);
  const [searchInput, setSearchInput] = useState(currentSearch || "");

  const totalPages = Math.ceil(total / perPage);

  function updateParams(updates) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val) params.set(key, val);
      else params.delete(key);
    });
    // Reset to page 1 when filters change
    if (updates.status !== undefined || updates.search !== undefined) {
      params.delete("page");
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  function handleSearch(e) {
    e.preventDefault();
    updateParams({ search: searchInput || null });
  }

  function toggleSelect(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selected.length === members.length) {
      setSelected([]);
    } else {
      setSelected(members.map((m) => m.id));
    }
  }

  async function handleBulkAction(status) {
    if (!selected.length) return;
    const result = await bulkUpdateMemberStatus(selected, status);
    if (result.success) {
      setSelected([]);
      router.refresh();
    }
  }

  async function handleExport() {
    const result = await exportMembersCSV(currentStatus || "all");
    if (result.success && result.csv) {
      const blob = new Blob([result.csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rym-members-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-on-surface-variant/50">
              search
            </span>
            <input
              type="text"
              placeholder="Search by name or email…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors"
          >
            Search
          </button>
        </form>

        {/* Export */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export CSV
        </button>
      </div>

      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUS_FILTERS.map((filter) => {
          const isActive = (currentStatus || "all") === filter.value;
          return (
            <button
              key={filter.value}
              onClick={() => updateParams({ status: filter.value === "all" ? null : filter.value })}
              className={`px-4 py-2 rounded-full font-label-md text-label-md transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "border border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
          <span className="font-body-sm text-body-sm text-on-background font-medium">
            {selected.length} selected
          </span>
          <button
            onClick={() => handleBulkAction("approved")}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-label-md text-label-md text-[12px] hover:bg-emerald-700 transition-colors"
          >
            Approve
          </button>
          <button
            onClick={() => handleBulkAction("rejected")}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-label-md text-label-md text-[12px] hover:bg-red-700 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => setSelected([])}
            className="ml-auto text-on-surface-variant/60 hover:text-on-surface-variant text-[12px]"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/15 bg-surface-container-low/50">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selected.length === members.length && members.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded accent-primary"
                  />
                </th>
                <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Name</th>
                <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Email</th>
                <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant hidden lg:table-cell">State</th>
                <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant">Status</th>
                <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant hidden sm:table-cell">Date</th>
                <th className="px-4 py-3 font-label-md text-label-md text-on-surface-variant w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {members.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-on-surface-variant/50 font-body-sm text-body-sm">
                    No members found.
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                    onClick={() => setDetailMember(member)}
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.includes(member.id)}
                        onChange={() => toggleSelect(member.id)}
                        className="rounded accent-primary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold text-[11px]">
                            {member.first_name?.[0]}{member.last_name?.[0]}
                          </span>
                        </div>
                        <span className="font-body-sm text-[14px] text-on-background font-medium truncate">
                          {member.first_name} {member.last_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-body-sm text-[13px] text-on-surface-variant hidden md:table-cell truncate max-w-[200px]">
                      {member.email}
                    </td>
                    <td className="px-4 py-3 font-body-sm text-[13px] text-on-surface-variant hidden lg:table-cell">
                      {member.state}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-4 py-3 font-body-sm text-[12px] text-on-surface-variant/60 hidden sm:table-cell">
                      {new Date(member.created_at).toLocaleDateString("en-NG", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-1">
                        {member.status === "pending" && (
                          <>
                            <button
                              onClick={async () => {
                                await approveMember(member.id);
                                router.refresh();
                              }}
                              title="Approve"
                              className="p-1.5 rounded-lg hover:bg-emerald-100 text-emerald-600 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">check_circle</span>
                            </button>
                            <button
                              onClick={async () => {
                                await rejectMember(member.id);
                                router.refresh();
                              }}
                              title="Reject"
                              className="p-1.5 rounded-lg hover:bg-red-100 text-red-500 transition-colors"
                            >
                              <span className="material-symbols-outlined text-[18px]">cancel</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant/15">
            <span className="font-body-sm text-[12px] text-on-surface-variant/60">
              Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, total)} of {total}
            </span>
            <div className="flex gap-1">
              <button
                disabled={currentPage <= 1}
                onClick={() => updateParams({ page: String(currentPage - 1) })}
                className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => updateParams({ page: String(currentPage + 1) })}
                className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {detailMember && (
        <MemberDetailModal
          member={detailMember}
          onClose={() => setDetailMember(null)}
          onRefresh={() => router.refresh()}
        />
      )}

      {/* Loading overlay */}
      {isPending && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center">
          <div className="bg-surface-container-lowest rounded-xl px-6 py-4 shadow-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary animate-spin">progress_activity</span>
            <span className="font-body-sm text-body-sm text-on-background">Loading…</span>
          </div>
        </div>
      )}
    </>
  );
}

function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border capitalize ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}
