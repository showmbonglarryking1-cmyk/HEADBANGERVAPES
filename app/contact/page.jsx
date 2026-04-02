import SiteShell from "@/components/SiteShell";
import { getSiteSettings } from "@/lib/data";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <SiteShell>
      <main className="section">
        <div className="container two-col">
          <div className="card">
            <div className="kicker">Contact</div>
            <h1 style={{fontSize:"clamp(34px,5vw,56px)", margin:"10px 0 14px"}}>Talk to the store</h1>
            <p className="muted">Use your real support information below.</p>
            <div style={{marginTop:18, lineHeight:2}}>
              <div><strong>Email:</strong> {settings.support_email || "support@example.com"}</div>
              <div><strong>Phone:</strong> {settings.support_phone || "+44 0000 000000"}</div>
              <div><strong>Address:</strong> {settings.address_line || "Your business address"}</div>
            </div>
          </div>
          <div className="card">
            <div className="kicker">Socials</div>
            <h2 style={{fontSize:36, margin:"10px 0 14px"}}>Where customers can find you</h2>
            <div className="split-actions">
              {settings.instagram_url ? <a className="btn" href={settings.instagram_url} target="_blank">Instagram</a> : null}
              {settings.facebook_url ? <a className="btn" href={settings.facebook_url} target="_blank">Facebook</a> : null}
              {settings.telegram_url ? <a className="btn" href={settings.telegram_url} target="_blank">Telegram</a> : null}
              {settings.potato_url ? <a className="btn" href={settings.potato_url} target="_blank">Potato</a> : null}
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
