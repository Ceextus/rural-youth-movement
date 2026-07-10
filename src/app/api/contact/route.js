// POST: validate a contact message and insert into Supabase `contact_messages`.
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { contactSchema } from "@/lib/validations/contactSchema";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("contact_messages")
      .insert(parsed.data);

    if (error) throw error;

    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Contact submission failed:", err);
    return Response.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
