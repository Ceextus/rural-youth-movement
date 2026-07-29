import ContactSection from "@/components/sections/ContactSection";
import { getSettings } from "@/lib/queries/settings";

export const metadata = {
  title: "Contact | Rural Youth Movement (RYM)",
  description:
    "Get in touch with the Rural Youth Movement — press, partnerships, and state chapter connections.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <ContactSection
      email={settings.contact_email}
      phone={settings.contact_phone}
      address={settings.contact_address}
    />
  );
}
