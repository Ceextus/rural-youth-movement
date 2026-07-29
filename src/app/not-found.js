import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-5rem)] bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[48px] text-primary">
          explore_off
        </span>
      </div>
      <h1 className="font-headline-lg text-[40px] text-on-background mb-4">
        Page Not Found
      </h1>
      <p className="font-body-lg text-[18px] text-on-surface-variant max-w-md mx-auto mb-8">
        We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-surface-white font-label-lg text-label-lg py-3 px-8 rounded-lg hover:-translate-y-[2px] hover:shadow-[0px_4px_12px_rgba(15,122,61,0.2)] transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">home</span>
        Return to Homepage
      </Link>
    </section>
  );
}
