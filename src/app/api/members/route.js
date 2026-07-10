// POST: validate a membership registration and insert into Supabase `members`.
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { memberSchema } from "@/lib/validations/memberSchema";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = memberSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const d = parsed.data;

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("members")
      .insert({
        first_name: d.firstName,
        last_name: d.lastName,
        email: d.email,
        phone: d.phone,
        state: d.state,
        lga: d.lga,
        ward: d.ward,
        interests: d.interests,
        vision: d.vision || null,
      })
      .select("id, status, state")
      .single();

    if (error) throw error;

    return Response.json({ ok: true, member: data }, { status: 201 });
  } catch (err) {
    console.error("Member registration failed:", err);
    return Response.json(
      { error: "Could not complete registration. Please try again." },
      { status: 500 }
    );
  }
}
