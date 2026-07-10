// Zod schema for contact form input.
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("A valid email is required").max(160),
  message: z.string().trim().min(1, "Message is required").max(2000),
});
