import { getContacts } from "@/lib/queries/adminContacts";
import ContactsList from "@/components/admin/ContactsList";

export const metadata = { title: "Contact Messages | Admin Dashboard" };

export default async function AdminContactsPage({ searchParams }) {
  const params = await searchParams;
  const page = parseInt(params?.page || "1", 10);

  const { data: contacts, total } = await getContacts({ page, perPage: 30 });

  return (
    <div className="p-6 md:p-8 max-w-[1000px]">
      <div className="mb-8">
        <h1 className="font-headline-md text-headline-md text-on-background">
          Contact Messages
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-1">
          Messages from the public contact form.
        </p>
      </div>

      <ContactsList contacts={contacts} total={total} />
    </div>
  );
}
