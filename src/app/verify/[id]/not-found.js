import Link from "next/link";

export default function MemberNotFound() {
  return (
    <section className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-error-container text-error rounded-full flex items-center justify-center mb-6 border-4 border-error/20 shadow-sm">
        <span className="material-symbols-outlined text-[48px]">
          person_off
        </span>
      </div>
      <h1 className="font-headline-lg text-[40px] text-on-background mb-4">
        Member Not Found
      </h1>
      <p className="font-body-lg text-[18px] text-on-surface-variant max-w-md mx-auto mb-10">
        We could not find a verified Rural Youth Movement member with this ID. The QR code may be invalid, expired, or fraudulent.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-surface-white font-label-lg text-label-lg py-3 px-8 rounded-lg hover:-translate-y-[2px] hover:shadow-[0px_4px_12px_rgba(15,122,61,0.2)] transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">home</span>
        Return to RYM Homepage
      </Link>
    </section>
  );
}
