import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import SettingsManager from "@/components/admin/SettingsManager";
import SiteShell from "@/components/SiteShell";
import { getSiteSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminGuard>
      <SiteShell>
        <main className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h1 style={{fontSize:52}}>Settings</h1>
                <p>Change storefront content without touching code.</p>
              </div>
            </div>
            <AdminNav current="/admin/settings" />
            <SettingsManager initialSettings={settings} />
          </div>
        </main>
      </SiteShell>
    </AdminGuard>
  );
}
