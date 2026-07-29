// Allowlist of email addresses permitted into the admin dashboard.
// Set ADMIN_EMAILS in .env.local as a comma-separated list, e.g.
//   ADMIN_EMAILS=you@example.com,teammate@example.com
// A signed-in Supabase user whose email isn't listed cannot access /admin.

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email) {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
