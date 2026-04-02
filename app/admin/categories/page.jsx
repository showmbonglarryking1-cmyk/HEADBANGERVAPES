import AdminGuard from "@/components/AdminGuard";
import AdminNav from "@/components/AdminNav";
import CategoryManager from "@/components/admin/CategoryManager";
import SiteShell from "@/components/SiteShell";
import { createClient } from "@/lib/supabase/server";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("*").order("sort_order").order("name");

  return (
    <AdminGuard>
      <SiteShell>
        <main className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h1 style={{fontSize:52}}>Categories</h1>
                <p>Build real categories from the dashboard.</p>
              </div>
            </div>
            <AdminNav current="/admin/categories" />
            <CategoryManager initialCategories={categories || []} />
          </div>
        </main>
      </SiteShell>
    </AdminGuard>
  );
}
