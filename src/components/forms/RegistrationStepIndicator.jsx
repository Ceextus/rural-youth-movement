"use client";

export default function RegistrationStepIndicator({ steps, current }) {
  const total = steps.length;
  const pct = (current / total) * 100;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <div className="text-primary-container font-label-lg text-label-lg">
          Step {current} of {total}
        </div>
        <div className="text-on-surface-variant font-label-md text-label-md">
          {steps[current - 1]}
        </div>
      </div>
      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
