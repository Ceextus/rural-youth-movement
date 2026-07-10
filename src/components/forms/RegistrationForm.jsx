"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import NaijaStates from "naija-state-local-government";
import RegistrationStepIndicator from "./RegistrationStepIndicator";

const STEPS = ["Personal Details", "Location", "Interests"];

const NIGERIAN_STATES = NaijaStates.states();

const INTERESTS = [
  { icon: "eco", label: "Sustainable Agriculture" },
  { icon: "school", label: "Rural Education" },
  { icon: "work", label: "Youth Employment" },
  { icon: "gavel", label: "Civic Leadership" },
  { icon: "laptop_mac", label: "Digital Skills" },
];

const inputClass =
  "w-full bg-surface-white border-2 border-outline-variant rounded p-3 text-on-background focus:border-primary focus:outline-none focus:ring-0 transition-colors font-body-md text-body-md placeholder:text-outline-variant";
const labelClass =
  "font-label-md text-label-md text-on-surface-variant block mb-2";

export default function RegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    lga: "",
    ward: "",
    interests: [],
    vision: "",
  });

  const stepRef = useRef(null);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // Reset LGA whenever the state changes so a stale LGA can't linger.
  const handleStateChange = (value) => {
    setForm((prev) => ({ ...prev, state: value, lga: "" }));
    setErrors((prev) => ({ ...prev, state: undefined, lga: undefined }));
  };

  // LGAs for the selected state, sorted alphabetically.
  const lgaOptions = useMemo(() => {
    if (!form.state) return [];
    try {
      return [...(NaijaStates.lgas(form.state)?.lgas ?? [])].sort();
    } catch {
      return [];
    }
  }, [form.state]);

  const toggleInterest = (label) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(label)
        ? prev.interests.filter((i) => i !== label)
        : [...prev.interests, label],
    }));
  };

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = "First name is required";
      if (!form.lastName.trim()) e.lastName = "Last name is required";
      if (!form.email.trim()) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        e.email = "Enter a valid email";
      if (!form.phone.trim()) e.phone = "Phone number is required";
    }
    if (step === 2) {
      if (!form.state) e.state = "Please select your state";
      if (!form.lga.trim()) e.lga = "LGA is required";
      if (!form.ward.trim()) e.ward = "Ward / community is required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const animateTo = (next) => {
    gsap.fromTo(
      stepRef.current,
      { opacity: 0, x: next > step ? 24 : -24 },
      { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
    );
    setStep(next);
  };

  const handleNext = () => {
    if (validateStep()) animateTo(step + 1);
  };

  const handleBack = () => animateTo(step - 1);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Registration failed. Please try again.");
      }
      const { member } = await res.json();
      // Hand the new member's details to the success screen.
      if (typeof window !== "undefined" && member) {
        sessionStorage.setItem("rym_member", JSON.stringify(member));
      }
      router.push("/get-involved/success");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-white rounded-lg border border-muted-green/10 p-6 md:p-8 shadow-[0px_4px_12px_rgba(15,122,61,0.05)] relative overflow-hidden">
      <RegistrationStepIndicator steps={STEPS} current={step} />

      <div className="mb-8 md:mb-10">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-3">
          {step === 3 ? "Your Voice Matters" : "Join the Movement"}
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          {step === 1 &&
            "Your voice matters. Register to become an official member of RYM."}
          {step === 2 &&
            "Let us know where you are based so we can connect you with your local chapter."}
          {step === 3 &&
            "Select the areas you are most passionate about to help us tailor your experience."}
        </p>
      </div>

      <div ref={stepRef}>
        {/* Step 1: Personal Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass} htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={inputClass}
                  placeholder="Enter your first name"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
                {errors.firstName && (
                  <p className="text-error font-body-sm text-body-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={inputClass}
                  placeholder="Enter your last name"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-error font-body-sm text-body-sm mt-1">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-error font-body-sm text-body-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                className={inputClass}
                placeholder="0800 000 0000"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
              {errors.phone && (
                <p className="text-error font-body-sm text-body-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className={labelClass} htmlFor="state">
                State
              </label>
              <div className="relative">
                <select
                  id="state"
                  className={`${inputClass} appearance-none cursor-pointer pr-10`}
                  value={form.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                >
                  <option value="" disabled>
                    Select your state
                  </option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute inset-y-0 right-3 flex items-center pointer-events-none text-primary h-full">
                  expand_more
                </span>
              </div>
              {errors.state && (
                <p className="text-error font-body-sm text-body-sm mt-1">
                  {errors.state}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass} htmlFor="lga">
                Local Government Area (LGA)
              </label>
              <div className="relative">
                <select
                  id="lga"
                  disabled={!form.state}
                  className={`${inputClass} appearance-none cursor-pointer pr-10 disabled:opacity-50 disabled:cursor-not-allowed`}
                  value={form.lga}
                  onChange={(e) => update("lga", e.target.value)}
                >
                  <option value="" disabled>
                    {form.state
                      ? "Select your LGA"
                      : "Select a state first"}
                  </option>
                  {lgaOptions.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute inset-y-0 right-3 flex items-center pointer-events-none text-primary h-full">
                  expand_more
                </span>
              </div>
              {errors.lga && (
                <p className="text-error font-body-sm text-body-sm mt-1">
                  {errors.lga}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass} htmlFor="ward">
                Ward / Community
              </label>
              <input
                id="ward"
                type="text"
                className={inputClass}
                placeholder="Enter your ward or local community"
                value={form.ward}
                onChange={(e) => update("ward", e.target.value)}
              />
              <p className="font-body-sm text-body-sm text-outline mt-1">
                This helps us connect you to grassroots activities.
              </p>
              {errors.ward && (
                <p className="text-error font-body-sm text-body-sm mt-1">
                  {errors.ward}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Interests */}
        {step === 3 && (
          <div className="space-y-8">
            <div>
              <label className={labelClass}>
                Interests (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((interest) => {
                  const selected = form.interests.includes(interest.label);
                  return (
                    <button
                      key={interest.label}
                      type="button"
                      onClick={() => toggleInterest(interest.label)}
                      className={`border-2 px-4 py-3 rounded-full font-label-lg text-label-lg transition-all flex items-center gap-2 ${
                        selected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-outline-variant text-on-surface-variant hover:border-primary"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{
                          fontVariationSettings: selected
                            ? "'FILL' 1"
                            : "'FILL' 0",
                        }}
                      >
                        {interest.icon}
                      </span>
                      {interest.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label
                className="font-label-md text-label-md text-on-surface flex items-center gap-2 mb-2"
                htmlFor="vision"
              >
                Your Vision
                <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-sm text-[10px] uppercase tracking-wider">
                  Optional
                </span>
              </label>
              <textarea
                id="vision"
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Tell us a bit about your vision for your community..."
                value={form.vision}
                onChange={(e) => update("vision", e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {submitError && (
        <p className="mt-6 text-error font-body-sm text-body-sm bg-error-container/40 border border-error/20 rounded p-3">
          {submitError}
        </p>
      )}

      {/* Navigation */}
      <div className="pt-8 mt-8 border-t border-outline-variant/30 flex items-center justify-between gap-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-on-surface-variant font-label-lg text-label-lg px-4 py-3 rounded hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back
            </span>
            Back
          </button>
        ) : (
          <span />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-display-lg text-label-lg py-3 px-8 rounded transition-all transform hover:-translate-y-[2px] shadow-[0px_4px_12px_rgba(15,122,61,0.12)]"
          >
            {step === 1 ? "Continue to Location" : "Continue"}
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-display-lg text-label-lg py-3 px-8 rounded transition-all transform hover:-translate-y-[2px] shadow-[0px_4px_12px_rgba(15,122,61,0.12)] disabled:opacity-60 disabled:translate-y-0"
          >
            {submitting ? "Submitting..." : "Complete Registration"}
            <span className="material-symbols-outlined text-[20px]">
              {submitting ? "progress_activity" : "check_circle"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
