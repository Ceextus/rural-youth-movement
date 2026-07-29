import { getSupabaseAdmin } from "@/lib/supabase/admin";
import TestimonialsManager from "@/components/admin/TestimonialsManager";

export const metadata = { title: "Testimonials | Admin Dashboard" };

async function getTestimonials() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
  return data || [];
}

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Testimonials
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Manage testimonials displayed on the public site.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6">
        <TestimonialsManager testimonials={testimonials} />
      </div>
    </div>
  );
}
