import RegistrationForm from "@/components/forms/RegistrationForm";

export const metadata = {
  title: "Get Involved | Rural Youth Movement (RYM)",
  description:
    "Register to become an official member of the Rural Youth Movement and join thousands of young leaders across Nigeria.",
};

const BENEFITS = [
  {
    icon: "school",
    title: "Leadership Training",
    text: "Access exclusive workshops and mentorship programs.",
  },
  {
    icon: "id_card",
    title: "Membership ID",
    text: "Get your official digital and physical RYM credentials.",
  },
  {
    icon: "groups",
    title: "Community Projects",
    text: "Lead and participate in grassroots initiatives in your area.",
  },
];

export default function GetInvolvedPage() {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-12 md:py-16 bg-surface-container-low border-b border-outline-variant/30 min-h-[calc(100vh-5rem)]">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-start">
        {/* Form */}
        <div className="md:col-span-8">
          <RegistrationForm />
        </div>

        {/* Trust signals sidebar */}
        <aside className="md:col-span-4 space-y-6 hidden md:block">
          <div className="bg-surface-white rounded-lg border border-primary/20 p-6">
            <h3 className="font-headline-sm text-headline-sm text-primary mb-6">
              Why Join RYM?
            </h3>
            <ul className="space-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {benefit.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-lg text-label-lg text-on-background">
                      {benefit.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      {benefit.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted-green text-surface-white rounded-lg p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <span
                className="material-symbols-outlined text-[120px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm mb-2 relative z-10">
              Secure Registration
            </h4>
            <p className="font-body-sm text-body-sm text-surface-variant/80 relative z-10">
              Your data is encrypted and handled securely. We never share your
              personal information.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
