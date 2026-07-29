import { Suspense } from "react";
import { getMembers } from "@/lib/queries/adminMembers";
import MembersTable from "@/components/admin/MembersTable";

export const metadata = { title: "Members | Admin Dashboard" };

export default async function AdminMembersPage({ searchParams }) {
  const params = await searchParams;
  const status = params?.status || "all";
  const search = params?.search || "";
  const page = parseInt(params?.page || "1", 10);
  const perPage = 20;

  const { data: members, total } = await getMembers({
    status,
    search,
    page,
    perPage,
  });

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Members
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Manage member registrations and approvals.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center gap-3 py-12 justify-center text-on-surface-variant/50">
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
            Loading members…
          </div>
        }
      >
        <MembersTable
          members={members}
          total={total}
          currentPage={page}
          perPage={perPage}
          currentStatus={status}
          currentSearch={search}
        />
      </Suspense>
    </div>
  );
}
