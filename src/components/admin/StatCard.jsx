export default function StatCard({ icon, label, value, subtitle, className = "" }) {
  return (
    <div
      className={`bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 flex flex-col gap-3 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/15 transition-colors duration-300">
          <span
            className="material-symbols-outlined text-primary text-[24px] group-hover:scale-110 transition-transform duration-300"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
      </div>

      <div>
        <p className="font-headline-md text-[28px] leading-[36px] text-on-background font-semibold tabular-nums">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
          {label}
        </p>
      </div>

      {subtitle && (
        <p className="font-body-sm text-[12px] text-on-surface-variant/60 border-t border-outline-variant/15 pt-2 mt-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
