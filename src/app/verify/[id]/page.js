import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import MembershipCard from "@/components/cards/MembershipCard";
import Link from "next/link";

export async function generateMetadata({ params }) {
  return {
    title: "Verify Member | Rural Youth Movement",
    description: "Verify the official membership status of an RYM member.",
  };
}

export default async function VerifyPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  if (!id) notFound();

  const supabase = getSupabaseAdmin();
  const { data: member, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !member) {
    console.error("Member verification error:", error);
    notFound();
  }

  const isApproved = member.status === "approved";

  return (
    <section className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg text-center mb-10">
        <div className="inline-block mb-6">
          {isApproved ? (
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center border-4 border-primary">
              <span className="material-symbols-outlined text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
            </div>
          ) : (
            <div className="w-20 h-20 bg-surface-variant rounded-full flex items-center justify-center border-4 border-outline-variant">
              <span className="material-symbols-outlined text-[40px] text-on-surface-variant">
                pending
              </span>
            </div>
          )}
        </div>
        
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-4">
          {isApproved ? "Verified Member" : "Membership Pending"}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
          {isApproved 
            ? "This is an official, verified membership card for the Rural Youth Movement."
            : "This membership application is currently under review by our team."}
        </p>
      </div>

      <div className="w-full max-w-md">
        <MembershipCard member={member} />
      </div>

      <div className="mt-12 text-center">
        <Link 
          href="/"
          className="font-label-lg text-primary hover:underline flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">home</span>
          Return to RYM Homepage
        </Link>
      </div>
    </section>
  );
}
