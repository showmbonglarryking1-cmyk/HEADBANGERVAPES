"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export default function SettingsManager({ initialSettings }) {
  const supabase = createClient();
  const [form, setForm] = useState(initialSettings || {});
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    const payload = { ...form, id: 1 };
    const { error } = await supabase.from("site_settings").upsert(payload);
    if (error) setMsg(error.message);
    else setMsg("Settings saved.");
    setBusy(false);
  }

  return (
    <div className="card">
      <h2 style={{fontSize:34, marginBottom:10}}>Store Settings</h2>
      <p className="muted" style={{marginBottom:16}}>Edit your storefront branding, support info, social links and bank details here.</p>
      {msg ? <div className="notice" style={{marginBottom:16}}>{msg}</div> : null}

      <form onSubmit={save}>
        <div className="form-grid">
          <div>
            <label className="label">Store name</label>
            <input className="input" value={form.store_name || ""} onChange={(e) => setField("store_name", e.target.value)} />
          </div>
          <div>
            <label className="label">Support email</label>
            <input className="input" value={form.support_email || ""} onChange={(e) => setField("support_email", e.target.value)} />
          </div>
          <div className="full">
            <label className="label">Hero title</label>
            <input className="input" value={form.hero_title || ""} onChange={(e) => setField("hero_title", e.target.value)} />
          </div>
          <div className="full">
            <label className="label">Hero subtitle</label>
            <textarea className="textarea" value={form.hero_subtitle || ""} onChange={(e) => setField("hero_subtitle", e.target.value)} />
          </div>
          <div>
            <label className="label">Support phone</label>
            <input className="input" value={form.support_phone || ""} onChange={(e) => setField("support_phone", e.target.value)} />
          </div>
          <div>
            <label className="label">Address line</label>
            <input className="input" value={form.address_line || ""} onChange={(e) => setField("address_line", e.target.value)} />
          </div>
          <div>
            <label className="label">Instagram URL</label>
            <input className="input" value={form.instagram_url || ""} onChange={(e) => setField("instagram_url", e.target.value)} />
          </div>
          <div>
            <label className="label">Facebook URL</label>
            <input className="input" value={form.facebook_url || ""} onChange={(e) => setField("facebook_url", e.target.value)} />
          </div>
          <div>
            <label className="label">Telegram URL</label>
            <input className="input" value={form.telegram_url || ""} onChange={(e) => setField("telegram_url", e.target.value)} />
          </div>
          <div>
            <label className="label">Potato URL</label>
            <input className="input" value={form.potato_url || ""} onChange={(e) => setField("potato_url", e.target.value)} />
          </div>
          <div>
            <label className="label">Bank name</label>
            <input className="input" value={form.bank_name || ""} onChange={(e) => setField("bank_name", e.target.value)} />
          </div>
          <div>
            <label className="label">Account name</label>
            <input className="input" value={form.bank_account_name || ""} onChange={(e) => setField("bank_account_name", e.target.value)} />
          </div>
          <div>
            <label className="label">Sort code</label>
            <input className="input" value={form.bank_sort_code || ""} onChange={(e) => setField("bank_sort_code", e.target.value)} />
          </div>
          <div>
            <label className="label">Account number</label>
            <input className="input" value={form.bank_account_number || ""} onChange={(e) => setField("bank_account_number", e.target.value)} />
          </div>
        </div>
        <div style={{marginTop:16}}>
          <button className="btn btn-primary" disabled={busy}>{busy ? "Saving..." : "Save Settings"}</button>
        </div>
      </form>
    </div>
  );
}
