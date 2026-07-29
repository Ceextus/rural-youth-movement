import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// Fallbacks so the public layout renders correctly even before the row exists.
export const DEFAULT_SETTINGS = {
  site_name: "Rural Youth Movement",
  tagline:
    "For the People, By the Youth. Mobilising the grassroots for rural development.",
  logo_url: "/logo.png",
  contact_email: "hello@rymovement.org",
  contact_phone: "+234 800 000 0000",
  contact_address:
    "Plot 100, Grassroots Avenue, Central Business District, Abuja, FCT, Nigeria",
  seo_description:
    "Mobilising the grassroots for rural development and civic participation across Nigeria's 36 states.",
  socials: { facebook: "#", twitter: "#", instagram: "#", website: "#" },
  nav_links: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Our Agenda", href: "/agenda" },
    { label: "Chapters", href: "/chapters" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ],
  footer_columns: [
    {
      heading: "Organization",
      links: [
        { label: "National Secretariat", href: "/about" },
        { label: "State Chapters", href: "/chapters" },
        { label: "Constitution", href: "/about" },
      ],
    },
    {
      heading: "Initiatives",
      links: [
        { label: "Policy Agenda", href: "/agenda" },
        { label: "Rural Development", href: "/agenda" },
        { label: "Civic Education", href: "/agenda" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
      ],
    },
  ],
};

/** Fetch global site settings, merged over sensible defaults. */
export async function getSettings() {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "global")
      .maybeSingle();

    if (!data) return DEFAULT_SETTINGS;

    // Merge so missing/empty fields fall back to defaults.
    return {
      ...DEFAULT_SETTINGS,
      ...Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== null && v !== undefined)
      ),
      socials: { ...DEFAULT_SETTINGS.socials, ...(data.socials || {}) },
      nav_links: data.nav_links?.length
        ? data.nav_links
        : DEFAULT_SETTINGS.nav_links,
      footer_columns: data.footer_columns?.length
        ? data.footer_columns
        : DEFAULT_SETTINGS.footer_columns,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
