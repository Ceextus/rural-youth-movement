import { forwardRef } from "react";

const StatCard = forwardRef(function StatCard({ icon, value, label }, ref) {
  return (
    <div
      ref={ref}
      className="flex flex-col items-center pt-4 md:pt-0"
    >
      <span
        className="material-symbols-outlined text-primary text-[40px] mb-2"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <h3 className="font-headline-md text-headline-md text-on-background">
        {value}
      </h3>
      <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
});

export default StatCard;
