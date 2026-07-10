"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-surface border border-primary/30 rounded-lg p-8 flex flex-col items-center text-center gap-4">
        <div className="p-4 bg-primary/10 rounded-full text-primary">
          <span
            className="material-symbols-outlined text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <h4 className="font-headline-sm text-headline-sm text-on-surface">
          Message Sent
        </h4>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-primary font-label-lg text-label-lg hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-muted-green/10 rounded-lg p-6 md:p-8 flex flex-col gap-5"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="font-label-md text-label-md text-on-surface uppercase tracking-wider"
        >
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="font-label-md text-label-md text-on-surface uppercase tracking-wider"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="font-label-md text-label-md text-on-surface uppercase tracking-wider"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="How can we help?"
          className="bg-surface-container-low border border-outline-variant/40 rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-y"
        />
      </div>

      {status === "error" && (
        <p className="font-body-sm text-body-sm text-error">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary text-on-primary font-display-lg text-label-lg px-8 py-4 rounded-lg hover:-translate-y-0.5 transition-transform shadow-[0px_4px_12px_rgba(15,122,61,0.12)] disabled:opacity-60 disabled:translate-y-0"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
