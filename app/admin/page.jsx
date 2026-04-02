import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import SiteShell from "@/components/SiteShell";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const [{ count: productCount }, { count: categoryCount }, { count: featuredCount }, { count: activeCount }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_featured", true),
    supabase.from("products").select("*", { count: "exact", head: true }).eq("is_active", true)
  ]);

  return (
    <AdminGuard>
      <SiteShell>
        <main className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h1 style={{fontSize:52}}>Admin Dashboard</h1>
                <p>Real products. Real categories. Cloud-saved data.</p>
              </div>
            </div>
            <AdminNav current="/admin" />

            <div className="stat-grid">
              <div className="stat"><div className="muted">Products</div><div className="num">{productCount || 0}</div></div>
              <div className="stat"><div className="muted">Categories</div><div className="num">{categoryCount || 0}</div></div>
              <div className="stat"><div className="muted">Featured</div><div className="num">{featuredCount || 0}</div></div>
              <div className="stat"><div className="muted">Active</div><div className="num">{activeCount || 0}</div></div>
            </div>

            <div className="card" style={{marginTop:20}}>
              <h2 style={{fontSize:34, marginBottom:10}}>What changed</h2>
              <ul style={{lineHeight:2, color:"var(--muted)"}}>
                <li>You can create unlimited products from the admin.</li>
                <li>You can create new categories from the admin.</li>
                <li>Everything saves in Supabase, not local JSON or browser storage.</li>
                <li>The same admin works from any device once you sign in.</li>
              </ul>
            </div>
          </div>
        </main>
      </SiteShell>
    </AdminGuard>
  );
}
