"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateContent } from "@/lib/actions/adminContent";
import MediaPicker from "./MediaPicker";
import PillarsManager from "./PillarsManager";

const input =
  "w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
const labelCls = "block font-label-md text-[12px] text-on-surface-variant mb-1.5";

const TABS = [
  { id: "home", label: "Home Page", icon: "home" },
  { id: "about", label: "About Page", icon: "info" },
  { id: "agenda", label: "Agenda Page", icon: "flag" },
];

export default function ContentEditor({ content, pillars }) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="max-w-3xl">
      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-none border-b border-outline-variant/20">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-t-xl font-label-md text-label-md whitespace-nowrap transition-all duration-200 border-b-2 ${
                isActive
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-on-surface-variant hover:text-on-background hover:bg-surface-container-low"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] transition-colors ${isActive ? "text-primary" : ""}`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "home" && (
          <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
            <HeroSection value={content["home.hero"]} />
            <StatsSection value={content["home.stats"]} />
            <CtaSection value={content["home.cta"]} />
          </div>
        )}

        {activeTab === "about" && (
          <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
            <AboutHeroSection value={content["about.hero"]} />
            <OriginSection value={content["about.origin"]} />
            <ValuesSection value={content["about.values"]} />
            <VisionSection value={content["about.vision"]} />
          </div>
        )}

        {activeTab === "agenda" && (
          <div className="space-y-6 animate-[fadeIn_0.2s_ease-out]">
            <AgendaHeroSection value={content["agenda.hero"]} />
            <AgendaPillarsSection value={content["agenda.pillars"]} />

            {/* Pillar Cards CRUD */}
            <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
              <h2 className="flex items-center gap-2 font-headline-sm text-[18px] text-on-background mb-5">
                <span className="material-symbols-outlined text-primary text-[20px]">view_agenda</span>
                Pillar Cards
              </h2>
              <p className="font-body-sm text-[12px] text-on-surface-variant/70 mb-4">
                Add, edit, or reorder the individual agenda pillar cards shown on the public site.
              </p>
              <PillarsManager pillars={pillars} />
            </section>

            <ReachMapSection value={content["agenda.reachmap"]} />
            <AgendaCtaSection value={content["agenda.cta"]} />
          </div>
        )}
      </div>
    </div>
  );
}

/** Shared card wrapper with its own save button + toast. */
function SectionCard({ title, icon, contentKey, buildValue, children }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  async function save() {
    setSaving(true);
    setToast(null);
    const result = await updateContent(contentKey, buildValue());
    setSaving(false);
    setToast(result.success ? { ok: true } : { ok: false, msg: result.error });
    if (result.success) {
      router.refresh();
      setTimeout(() => setToast(null), 3500);
    }
  }

  return (
    <section className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-6">
      <h2 className="flex items-center gap-2 font-headline-sm text-[18px] text-on-background mb-5">
        <span className="material-symbols-outlined text-primary text-[20px]">{icon}</span>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-outline-variant/15">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-xl hover:bg-primary-container transition-all disabled:opacity-50"
        >
          {saving && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
          Save
        </button>
        {toast && (
          <span className={`flex items-center gap-1.5 font-body-sm text-body-sm ${toast.ok ? "text-emerald-600" : "text-red-600"}`}>
            <span className="material-symbols-outlined text-[16px]">{toast.ok ? "check_circle" : "error"}</span>
            {toast.ok ? "Saved" : toast.msg || "Failed"}
          </span>
        )}
      </div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      {children}
    </div>
  );
}

function HeroSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Hero" icon="wallpaper" contentKey="home.hero" buildValue={() => f}>
      <MediaPicker
        name="hero_bg"
        label="Background image"
        defaultValue={f.backgroundImage}
        onChange={(url) => set("backgroundImage", url)}
      />
      <Field label="Badge text">
        <input className={input} value={f.badge} onChange={(e) => set("badge", e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Heading line 1">
          <input className={input} value={f.headingLine1} onChange={(e) => set("headingLine1", e.target.value)} />
        </Field>
        <Field label="Heading line 2 (highlighted)">
          <input className={input} value={f.headingLine2} onChange={(e) => set("headingLine2", e.target.value)} />
        </Field>
      </div>
      <Field label="Subtext">
        <textarea rows={2} className={`${input} resize-y`} value={f.subtext} onChange={(e) => set("subtext", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Primary button label">
          <input className={input} value={f.primaryLabel} onChange={(e) => set("primaryLabel", e.target.value)} />
        </Field>
        <Field label="Primary button link">
          <input className={input} value={f.primaryHref} onChange={(e) => set("primaryHref", e.target.value)} />
        </Field>
        <Field label="Secondary button label">
          <input className={input} value={f.secondaryLabel} onChange={(e) => set("secondaryLabel", e.target.value)} />
        </Field>
        <Field label="Secondary button link">
          <input className={input} value={f.secondaryHref} onChange={(e) => set("secondaryHref", e.target.value)} />
        </Field>
      </div>
    </SectionCard>
  );
}

function StatsSection({ value }) {
  const [items, setItems] = useState(value.items || []);
  const set = (i, k, v) => setItems((p) => p.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const add = () => setItems((p) => [...p, { icon: "star", value: "", label: "" }]);
  const remove = (i) => setItems((p) => p.filter((_, idx) => idx !== i));

  return (
    <SectionCard title="Stats Bar" icon="leaderboard" contentKey="home.stats" buildValue={() => ({ items: items.filter((i) => i.value && i.label) })}>
      <p className="font-body-sm text-[12px] text-on-surface-variant/70 -mt-1">
        Icon uses a{" "}
        <a href="https://fonts.google.com/icons" target="_blank" rel="noreferrer" className="text-primary underline">
          Material Symbols
        </a>{" "}
        name (e.g. map, groups, home_work).
      </p>
      {items.map((item, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end">
          <Field label="Icon"><input className={input} value={item.icon} onChange={(e) => set(i, "icon", e.target.value)} /></Field>
          <Field label="Value"><input className={input} value={item.value} onChange={(e) => set(i, "value", e.target.value)} /></Field>
          <Field label="Label"><input className={input} value={item.label} onChange={(e) => set(i, "label", e.target.value)} /></Field>
          <button type="button" onClick={() => remove(i)} className="p-2.5 text-on-surface-variant/60 hover:text-red-500 transition-colors" aria-label="Remove">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="flex items-center gap-1.5 text-primary font-label-md text-label-md hover:text-primary-container transition-colors">
        <span className="material-symbols-outlined text-[18px]">add</span> Add stat
      </button>
    </SectionCard>
  );
}

function CtaSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="CTA Banner" icon="campaign" contentKey="home.cta" buildValue={() => f}>
      <Field label="Heading">
        <input className={input} value={f.heading} onChange={(e) => set("heading", e.target.value)} />
      </Field>
      <Field label="Subtext">
        <textarea rows={2} className={`${input} resize-y`} value={f.subtext} onChange={(e) => set("subtext", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Button label">
          <input className={input} value={f.buttonLabel} onChange={(e) => set("buttonLabel", e.target.value)} />
        </Field>
        <Field label="Button link">
          <input className={input} value={f.buttonHref} onChange={(e) => set("buttonHref", e.target.value)} />
        </Field>
      </div>
    </SectionCard>
  );
}

function AboutHeroSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Hero" icon="info" contentKey="about.hero" buildValue={() => f}>
      <Field label="Badge">
        <input className={input} value={f.badge} onChange={(e) => set("badge", e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Heading (lead)">
          <input className={input} value={f.headingLead} onChange={(e) => set("headingLead", e.target.value)} />
        </Field>
        <Field label="Heading (highlighted word)">
          <input className={input} value={f.headingHighlight} onChange={(e) => set("headingHighlight", e.target.value)} />
        </Field>
      </div>
      <Field label="Subtext">
        <textarea rows={3} className={`${input} resize-y`} value={f.subtext} onChange={(e) => set("subtext", e.target.value)} />
      </Field>
    </SectionCard>
  );
}

function OriginSection({ value }) {
  const [f, setF] = useState(value);
  const [stats, setStats] = useState(value.stats || []);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setStat = (i, k, v) => setStats((p) => p.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)));
  const addStat = () => setStats((p) => [...p, { value: "", label: "" }]);
  const removeStat = (i) => setStats((p) => p.filter((_, idx) => idx !== i));

  return (
    <SectionCard
      title="Rooted in Renewed Hope"
      icon="history_edu"
      contentKey="about.origin"
      buildValue={() => ({ ...f, stats: stats.filter((s) => s.value && s.label) })}
    >
      <MediaPicker name="origin_img" label="Image" defaultValue={f.image} onChange={(url) => set("image", url)} />
      <Field label="Heading">
        <input className={input} value={f.heading} onChange={(e) => set("heading", e.target.value)} />
      </Field>
      <Field label="Paragraph 1">
        <textarea rows={3} className={`${input} resize-y`} value={f.paragraph1} onChange={(e) => set("paragraph1", e.target.value)} />
      </Field>
      <Field label="Paragraph 2">
        <textarea rows={3} className={`${input} resize-y`} value={f.paragraph2} onChange={(e) => set("paragraph2", e.target.value)} />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Badge title">
          <input className={input} value={f.badgeTitle} onChange={(e) => set("badgeTitle", e.target.value)} />
        </Field>
        <Field label="Badge text">
          <input className={input} value={f.badgeText} onChange={(e) => set("badgeText", e.target.value)} />
        </Field>
      </div>
      <span className={labelCls}>Stats</span>
      {stats.map((s, i) => (
        <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center">
          <input className={input} placeholder="36+" value={s.value} onChange={(e) => setStat(i, "value", e.target.value)} />
          <input className={input} placeholder="State Chapters" value={s.label} onChange={(e) => setStat(i, "label", e.target.value)} />
          <button type="button" onClick={() => removeStat(i)} className="p-2 text-on-surface-variant/60 hover:text-red-500" aria-label="Remove">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      ))}
      <button type="button" onClick={addStat} className="flex items-center gap-1.5 text-primary font-label-md text-label-md hover:text-primary-container">
        <span className="material-symbols-outlined text-[18px]">add</span> Add stat
      </button>
    </SectionCard>
  );
}

function ValuesSection({ value }) {
  const [f, setF] = useState(value);
  const [items, setItems] = useState(value.items || []);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const setItem = (i, k, v) => setItems((p) => p.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const addItem = () => setItems((p) => [...p, { icon: "star", title: "", text: "" }]);
  const removeItem = (i) => setItems((p) => p.filter((_, idx) => idx !== i));

  return (
    <SectionCard
      title="Core Values"
      icon="volunteer_activism"
      contentKey="about.values"
      buildValue={() => ({ ...f, items: items.filter((it) => it.title) })}
    >
      <Field label="Badge">
        <input className={input} value={f.badge} onChange={(e) => set("badge", e.target.value)} />
      </Field>
      <Field label="Heading">
        <input className={input} value={f.heading} onChange={(e) => set("heading", e.target.value)} />
      </Field>
      <Field label="Subtext">
        <textarea rows={2} className={`${input} resize-y`} value={f.subtext} onChange={(e) => set("subtext", e.target.value)} />
      </Field>
      <span className={labelCls}>Values</span>
      {items.map((it, i) => (
        <div key={i} className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low/40 space-y-2 relative">
          <button type="button" onClick={() => removeItem(i)} className="absolute top-2 right-2 text-on-surface-variant/60 hover:text-red-500" aria-label="Remove">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="grid grid-cols-[1fr_2fr] gap-2">
            <input className={input} placeholder="icon" value={it.icon} onChange={(e) => setItem(i, "icon", e.target.value)} />
            <input className={input} placeholder="Title" value={it.title} onChange={(e) => setItem(i, "title", e.target.value)} />
          </div>
          <textarea rows={2} className={`${input} resize-y`} placeholder="Description" value={it.text} onChange={(e) => setItem(i, "text", e.target.value)} />
        </div>
      ))}
      <button type="button" onClick={addItem} className="flex items-center gap-1.5 text-primary font-label-md text-label-md hover:text-primary-container">
        <span className="material-symbols-outlined text-[18px]">add</span> Add value
      </button>
    </SectionCard>
  );
}

function VisionSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Vision & Mission" icon="visibility" contentKey="about.vision" buildValue={() => f}>
      <Field label="Vision statement">
        <textarea rows={3} className={`${input} resize-y`} value={f.visionText} onChange={(e) => set("visionText", e.target.value)} />
      </Field>
      <Field label="Mission statement">
        <textarea rows={3} className={`${input} resize-y`} value={f.missionText} onChange={(e) => set("missionText", e.target.value)} />
      </Field>
    </SectionCard>
  );
}

function AgendaHeroSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Hero" icon="flag" contentKey="agenda.hero" buildValue={() => f}>
      <MediaPicker name="agenda_hero_img" label="Image" defaultValue={f.image} onChange={(url) => set("image", url)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Heading line 1"><input className={input} value={f.headingLine1} onChange={(e) => set("headingLine1", e.target.value)} /></Field>
        <Field label="Heading line 2"><input className={input} value={f.headingLine2} onChange={(e) => set("headingLine2", e.target.value)} /></Field>
      </div>
      <Field label="Subtext">
        <textarea rows={3} className={`${input} resize-y`} value={f.subtext} onChange={(e) => set("subtext", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Button label"><input className={input} value={f.buttonLabel} onChange={(e) => set("buttonLabel", e.target.value)} /></Field>
        <Field label="Button link"><input className={input} value={f.buttonHref} onChange={(e) => set("buttonHref", e.target.value)} /></Field>
      </div>
    </SectionCard>
  );
}

function AgendaPillarsSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Pillars Heading" icon="dashboard" contentKey="agenda.pillars" buildValue={() => f}>
      <p className="font-body-sm text-[12px] text-on-surface-variant/70 -mt-1">
        The pillar cards themselves are managed under{" "}
        <a href="/admin/agenda" className="text-primary underline">Agenda Pillars</a>. This just edits the section heading.
      </p>
      <Field label="Heading"><input className={input} value={f.heading} onChange={(e) => set("heading", e.target.value)} /></Field>
      <Field label="Subtext">
        <textarea rows={2} className={`${input} resize-y`} value={f.subtext} onChange={(e) => set("subtext", e.target.value)} />
      </Field>
    </SectionCard>
  );
}

function ReachMapSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="Reach Map" icon="map" contentKey="agenda.reachmap" buildValue={() => f}>
      <MediaPicker name="reachmap_img" label="Map image" defaultValue={f.image} onChange={(url) => set("image", url)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Heading line 1"><input className={input} value={f.headingLine1} onChange={(e) => set("headingLine1", e.target.value)} /></Field>
        <Field label="Heading line 2"><input className={input} value={f.headingLine2} onChange={(e) => set("headingLine2", e.target.value)} /></Field>
      </div>
      <Field label="Body">
        <textarea rows={3} className={`${input} resize-y`} value={f.body} onChange={(e) => set("body", e.target.value)} />
      </Field>
    </SectionCard>
  );
}

function AgendaCtaSection({ value }) {
  const [f, setF] = useState(value);
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  return (
    <SectionCard title="CTA" icon="campaign" contentKey="agenda.cta" buildValue={() => f}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Heading (lead)"><input className={input} value={f.headingLead} onChange={(e) => set("headingLead", e.target.value)} /></Field>
        <Field label="Heading (highlighted)"><input className={input} value={f.headingHighlight} onChange={(e) => set("headingHighlight", e.target.value)} /></Field>
      </div>
      <Field label="Subtext">
        <textarea rows={2} className={`${input} resize-y`} value={f.subtext} onChange={(e) => set("subtext", e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Button label"><input className={input} value={f.buttonLabel} onChange={(e) => set("buttonLabel", e.target.value)} /></Field>
        <Field label="Button link"><input className={input} value={f.buttonHref} onChange={(e) => set("buttonHref", e.target.value)} /></Field>
      </div>
    </SectionCard>
  );
}
