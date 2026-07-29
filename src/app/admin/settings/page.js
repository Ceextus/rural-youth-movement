import { getSettings } from "@/lib/queries/settings";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = { title: "Settings | Admin Dashboard" };

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="p-6 md:p-8 max-w-[1200px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Site Settings
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Logo, navigation, footer, contact details, and social links.
        </p>
      </div>
      <SettingsForm settings={settings} />
    </div>
  );
}
