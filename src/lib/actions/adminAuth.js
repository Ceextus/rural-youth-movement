"use server";

import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/adminAccess";

/**
 * Return the signed-in admin user, or null if the caller isn't an allowlisted admin.
 */
export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) return null;
  return user;
}

/** True if the current request is an authenticated, allowlisted admin. */
export async function isAdminAuthenticated() {
  return (await getAdminUser()) !== null;
}

/**
 * Guard for mutating admin server actions (defense-in-depth alongside middleware).
 * Throws if the caller is not an authenticated admin.
 */
export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    throw new Error("Unauthorized: admin session required.");
  }
}

/** Sign the current admin out. */
export async function logoutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}
