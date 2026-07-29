"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettings } from "@/lib/actions/adminSettings";
import MediaPicker from "./MediaPicker";

const input =
  "w-full px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-on-background font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
const labelCls =
  "block font-label-md text-[12px] text-on-surface-variant mb-1.5";

const TABS = [
  { id: "brand", label: "Brand", icon: "branding_watermark" },
  { id: "contact", label: "Contact", icon: "contact_mail" },
  { id: "socials", label: "Social Links", icon: "share" },
  { id: "navigation", label: "Navigation", icon: "menu" },
  { id: "footer", label: "Footer", icon: "view_column" },
];

export default function SettingsForm({ settings }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("brand");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const [socials, setSocials] = useState({
    facebook: settings.socials?.facebook || "",
    twitter: settings.socials?.twitter || "",
    instagram: settings.socials?.instagram || "",
    website: settings.socials?.website || "",
  });
  const [navLinks, setNavLinks] = useState(settings.nav_links || []);
  const [footerColumns, setFooterColumns] = useState(settings.footer_columns || []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    const formData = new FormData(e.target);
    formData.set("socials", JSON.stringify(socials));
    formData.set("nav_links", JSON.stringify(navLinks.filter((l) => l.label && l.href)));
    formData.set(
      "footer_columns",
      JSON.stringify(
        footerColumns
          .map((c) => ({
            heading: c.heading,
            links: (c.links || []).filter((l) => l.label && l.href),
          }))
          .filter((c) => c.heading)
      )
    );

    const result = await updateSettings(formData);
    setSaving(false);
    setToast(
      result.success
        ? { type: "success", message: "Settings saved." }
        : { type: "error", message: result.error || "Failed to save." }
    );
    if (result.success) router.refresh();
    if (result.success) setTimeout(() => setToast(null), 4000);
  }

  // --- nav link helpers ---
  const setNav = (i, key, val) =>
    setNavLinks((p) => p.map((l, idx) => (idx === i ? { ...l, [key]: val } : l)));
  const addNav = () => setNavLinks((p) => [...p, { label: "", href: "" }]);
  const removeNav = (i) => setNavLinks((p) => p.filter((_, idx) => idx !== i));

  // --- footer column helpers ---
  const setColHeading = (ci, val) =>
    setFooterColumns((p) => p.map((c, i) => (i === ci ? { ...c, heading: val } : c)));
  const setColLink = (ci, li, key, val) =>
    setFooterColumns((p) =>
      p.map((c, i) =>
        i === ci
          ? { ...c, links: c.links.map((l, j) => (j === li ? { ...l, [key]: val } : l)) }
          : c
      )
    );
  const addColLink = (ci) =>
    setFooterColumns((p) =>
      p.map((c, i) => (i === ci ? { ...c, links: [...(c.links || []), { label: "", href: "" }] } : c))
    );
  const removeColLink = (ci, li) =>
    setFooterColumns((p) =>
      p.map((c, i) => (i === ci ? { ...c, links: c.links.filter((_, j) => j !== li) } : c))
    );
  const addColumn = () =>
    setFooterColumns((p) => [...p, { heading: "", links: [{ label: "", href: "" }] }]);
  const removeColumn = (ci) => setFooterColumns((p) => p.filter((_, i) => i !== ci));

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1 scrollbar-none border-b border-outline-variant/20">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-label-md text-label-md whitespace-nowrap transition-all duration-200 border-b-2 ${
                isActive
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-on-surface-variant hover:text-on-background hover:bg-surface-container-low"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] transition-colors ${
                  isActive ? "text-primary" : ""
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[320px]">
        {/* Brand */}
        {activeTab === "brand" && (
          <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <MediaPicker name="logo_url" label="Logo" defaultValue={settings.logo_url || ""} />
            <Field label="Site name">
              <input name="site_name" defaultValue={settings.site_name || ""} className={input} />
            </Field>
            <Field label="Tagline">
              <input name="tagline" defaultValue={settings.tagline || ""} className={input} />
            </Field>
            <Field label="SEO description">
              <textarea name="seo_description" rows={2} defaultValue={settings.seo_description || ""} className={`${input} resize-y`} />
            </Field>
          </div>
        )}

        {/* Contact */}
        {activeTab === "contact" && (
          <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Email">
                <input name="contact_email" type="email" defaultValue={settings.contact_email || ""} className={input} />
              </Field>
              <Field label="Phone">
                <input name="contact_phone" defaultValue={settings.contact_phone || ""} className={input} />
              </Field>
            </div>
            <Field label="Address">
              <textarea name="contact_address" rows={2} defaultValue={settings.contact_address || ""} className={`${input} resize-y`} />
            </Field>
          </div>
        )}

        {/* Socials */}
        {activeTab === "socials" && (
          <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["facebook", "twitter", "instagram", "website"].map((k) => (
                <Field key={k} label={k[0].toUpperCase() + k.slice(1)}>
                  <input
                    value={socials[k]}
                    onChange={(e) => setSocials((s) => ({ ...s, [k]: e.target.value }))}
                    className={input}
                    placeholder="https://…"
                  />
                </Field>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        {activeTab === "navigation" && (
          <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <p className="font-body-sm text-body-sm text-on-surface-variant/70 mb-2">
              Configure the links that appear in the site navigation bar.
            </p>
            <div className="space-y-2">
              {navLinks.map((link, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    value={link.label}
                    onChange={(e) => setNav(i, "label", e.target.value)}
                    className={input}
                    placeholder="Label"
                  />
                  <input
                    value={link.href}
                    onChange={(e) => setNav(i, "href", e.target.value)}
                    className={input}
                    placeholder="/path"
                  />
                  <button type="button" onClick={() => removeNav(i)} className="p-2 text-on-surface-variant/60 hover:text-red-500 transition-colors" aria-label="Remove">
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addNav} className="mt-3 flex items-center gap-1.5 text-primary font-label-md text-label-md hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span> Add link
            </button>
          </div>
        )}

        {/* Footer */}
        {activeTab === "footer" && (
          <div className="space-y-4 animate-[fadeIn_0.2s_ease-out]">
            <p className="font-body-sm text-body-sm text-on-surface-variant/70 mb-2">
              Configure the columns and links shown in the site footer.
            </p>
            <div className="space-y-6">
              {footerColumns.map((col, ci) => (
                <div key={ci} className="p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/40">
                  <div className="flex gap-2 items-center mb-3">
                    <input
                      value={col.heading}
                      onChange={(e) => setColHeading(ci, e.target.value)}
                      className={`${input} font-semibold`}
                      placeholder="Column heading"
                    />
                    <button type="button" onClick={() => removeColumn(ci)} className="p-2 text-on-surface-variant/60 hover:text-red-500 transition-colors" aria-label="Remove column">
                      <span className="material-symbols-outlined text-[20px]">delete</span>
                    </button>
                  </div>
                  <div className="space-y-2 pl-2 border-l-2 border-outline-variant/20">
                    {(col.links || []).map((link, li) => (
                      <div key={li} className="flex gap-2 items-center">
                        <input value={link.label} onChange={(e) => setColLink(ci, li, "label", e.target.value)} className={input} placeholder="Label" />
                        <input value={link.href} onChange={(e) => setColLink(ci, li, "href", e.target.value)} className={input} placeholder="/path" />
                        <button type="button" onClick={() => removeColLink(ci, li)} className="p-2 text-on-surface-variant/60 hover:text-red-500 transition-colors" aria-label="Remove">
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addColLink(ci)} className="flex items-center gap-1.5 text-primary font-label-md text-[12px] hover:text-primary-container transition-colors">
                      <span className="material-symbols-outlined text-[16px]">add</span> Add link
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={addColumn} className="mt-3 flex items-center gap-1.5 text-primary font-label-md text-label-md hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">add</span> Add column
            </button>
          </div>
        )}

        {/* Hidden inputs for inactive tabs to preserve values in FormData */}
        {activeTab !== "brand" && (
          <>
            <input type="hidden" name="logo_url" defaultValue={settings.logo_url || ""} />
            <input type="hidden" name="site_name" defaultValue={settings.site_name || ""} />
            <input type="hidden" name="tagline" defaultValue={settings.tagline || ""} />
            <input type="hidden" name="seo_description" defaultValue={settings.seo_description || ""} />
          </>
        )}
        {activeTab !== "contact" && (
          <>
            <input type="hidden" name="contact_email" defaultValue={settings.contact_email || ""} />
            <input type="hidden" name="contact_phone" defaultValue={settings.contact_phone || ""} />
            <input type="hidden" name="contact_address" defaultValue={settings.contact_address || ""} />
          </>
        )}
      </div>

      {/* Save — sticky bottom */}
      <div className="flex items-center gap-3 pt-4 mt-6 border-t border-outline-variant/15 sticky bottom-0 bg-surface-container py-4">
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-primary text-on-primary font-label-lg text-label-lg px-6 py-3 rounded-xl shadow-sm hover:bg-primary-container transition-all disabled:opacity-50">
          {saving && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
          Save Settings
        </button>
        {toast && (
          <span className={`flex items-center gap-1.5 font-body-sm text-body-sm ${toast.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
            <span className="material-symbols-outlined text-[18px]">{toast.type === "success" ? "check_circle" : "error"}</span>
            {toast.message}
          </span>
        )}
      </div>
    </form>
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
