import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import ProductManager from "@/components/admin/ProductManager";
import SiteShell from "@/components/SiteShell";
import { createClient } from "@/lib/supabase/server";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*, categories(name, slug)").order("created_at", { ascending: false }),
    supabase.from("categories").select("*").order("sort_order", { ascending: true }).order("name")
  ]);

  return (
    <AdminGuard>
      <SiteShell>
        <main className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h1 style={{fontSize:52}}>Products</h1>
                <p>Add, edit, feature, hide, price and upload images here.</p>
              </div>
            </div>
            <AdminNav current="/admin/products" />
            <ProductManager initialProducts={products || []} categories={categories || []} />
          </div>
        </main>
      </SiteShell>
    </AdminGuard>
  );
}
