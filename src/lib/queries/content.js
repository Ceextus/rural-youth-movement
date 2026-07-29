import "server-only";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// Defaults mirror the current hardcoded copy, so the site is unchanged until
// an editor overrides a section. Each key maps to one editable section.
export const DEFAULT_CONTENT = {
  "home.hero": {
    badge: "Grassroots Movement",
    headingLine1: "RYM: 36 States.",
    headingLine2: "One Mission.",
    subtext:
      "Mobilising the grassroots for rural development and civic participation under Nigeria's Renewed Hope Agenda.",
    primaryLabel: "Join the Movement",
    primaryHref: "/get-involved",
    secondaryLabel: "Learn More",
    secondaryHref: "/about",
    backgroundImage: "/images/hero/hero-community.jpg",
  },
  "home.stats": {
    items: [
      { icon: "map", value: "36 States", label: "Nationwide Reach" },
      { icon: "groups", value: "1M+", label: "Active Members" },
      { icon: "home_work", value: "5k+", label: "Communities" },
    ],
  },
  "home.cta": {
    heading: "Ready to shape the future of your community?",
    subtext:
      "Join thousands of young leaders driving real change across all 36 states.",
    buttonLabel: "Become a Member Today",
    buttonHref: "/get-involved",
  },
  "about.hero": {
    badge: "About Us",
    headingLead: "The Movement for the",
    headingHighlight: "Future",
    subtext:
      "A modern grassroots initiative empowering rural youth across Nigeria. We are building a foundation of leadership, agricultural innovation, and community resilience.",
  },
  "about.origin": {
    heading: "Rooted in Renewed Hope",
    paragraph1:
      "The Rural Youth Movement (RYM) stands as a vital grassroots pillar aligned with Nigeria's Renewed Hope Agenda. We recognize that true national progress must begin in our agricultural heartlands and rural communities.",
    paragraph2:
      "Our mission is to translate high-level policy into tangible, on-the-ground action, ensuring that the youth who form the backbone of our agrarian economy are equipped, empowered, and elevated to leadership roles.",
    image: "/images/about/farmers-modern-equipment.jpg",
    badgeTitle: "Impact Driven",
    badgeText: "Advancing communities through grassroots mobilization.",
    stats: [
      { value: "36+", label: "State Chapters" },
      { value: "50k", label: "Active Members" },
    ],
  },
  "about.values": {
    badge: "What Drives Us",
    heading: "Our Core Values",
    subtext:
      "The principles that guide every chapter, every project, and every young leader in the movement.",
    items: [
      { icon: "handshake", title: "Integrity", text: "Transparent, accountable leadership at every level — from the national secretariat to each local chapter." },
      { icon: "diversity_3", title: "Community First", text: "Every initiative begins with the people it serves, driven by local voices and grassroots needs." },
      { icon: "lightbulb", title: "Innovation", text: "Bringing modern tools, digital skills, and climate-smart techniques to rural communities." },
      { icon: "trending_up", title: "Empowerment", text: "Equipping young leaders with the resources and networks to elevate themselves and their communities." },
    ],
  },
  "about.vision": {
    visionText:
      "To cultivate a resilient, technologically adept generation of rural leaders who will drive Nigeria's sustainable agricultural transformation.",
    missionText:
      "To mobilize, educate, and resource rural youth, transforming communities through modern farming practices, civic engagement, and cooperative economics.",
  },
  "agenda.hero": {
    headingLine1: "A Blueprint for",
    headingLine2: "Rural Prosperity",
    subtext:
      "Our comprehensive agenda to revitalize rural communities through education, sustainable agriculture, youth empowerment, and active civic participation. We are building the future from the grassroots up.",
    buttonLabel: "Explore the Pillars",
    buttonHref: "#pillars",
    image: "/images/agenda/rural-prosperity.jpg",
  },
  "agenda.pillars": {
    heading: "Core Pillars",
    subtext:
      "Strategic initiatives designed to create sustainable impact across rural communities.",
  },
  "agenda.reachmap": {
    headingLine1: "National Footprint,",
    headingLine2: "Local Impact",
    body: "The Rural Youth Movement is active across all 36 states of Nigeria. Our decentralized chapter model ensures that initiatives are tailored to the specific agricultural and economic realities of each region, while remaining united under a single agenda for rural prosperity.",
    image: "/images/agenda/nigeria-map.jpg",
  },
  "agenda.cta": {
    headingLead: "Ready to",
    headingHighlight: "Act?",
    subtext:
      "The agenda is set, but the real work happens in the community. Join thousands of young leaders transforming rural Nigeria today.",
    buttonLabel: "Be the Change in Your Community",
    buttonHref: "/get-involved",
  },
};

// Fallback pillar cards for /agenda when the agenda_pillars table is empty.
export const DEFAULT_AGENDA_PILLARS = [
  { icon: "school", title: "Education & Literacy", description: "Foundational literacy, digital skills training, and community learning centers to bridge the educational divide in rural areas." },
  { icon: "agriculture", title: "Sustainable Farming", description: "Better seeds, sustainable farming techniques, and direct-to-market cooperatives modernising rural agriculture." },
  { icon: "work", title: "Youth Employment", description: "Rural entrepreneurship and vocational pathways tailored to the economic realities of each region." },
  { icon: "how_to_vote", title: "Civic Engagement", description: "Town halls, leadership workshops, and voter drives that give rural youth an active role in local governance." },
];

/** Public read of admin-managed agenda pillars, ordered; empty array if none. */
export async function getAgendaPillars() {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from("agenda_pillars")
      .select("*")
      .order("display_order", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

/** Fetch all site content, each section merged over its defaults. */
export async function getContent() {
  const merged = structuredClone(DEFAULT_CONTENT);
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase.from("site_content").select("key, value");
    for (const row of data || []) {
      merged[row.key] = { ...(merged[row.key] || {}), ...(row.value || {}) };
    }
  } catch {
    // table missing / offline → defaults
  }
  return merged;
}
