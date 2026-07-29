// Zod schema for membership registration input.
import { z } from "zod";

export const memberSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("A valid email is required").max(160),
  phone: z.string().trim().min(7, "A valid phone number is required").max(20),
  state: z.string().trim().min(1, "State is required"),
  lga: z.string().trim().min(1, "LGA is required"),
  ward: z.string().trim().min(1, "Ward / community is required").max(120),
  interests: z.array(z.string()).default([]),
  vision: z.string().trim().max(1000).optional().or(z.literal("")),
  photoUrl: z.string().url().optional().or(z.literal("")),
});
