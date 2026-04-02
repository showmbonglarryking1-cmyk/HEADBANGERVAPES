import SiteShell from "@/components/SiteShell";
import ProductCard from "@/components/ProductCard";
import { getFeaturedProducts, getSiteSettings, getCategories } from "@/lib/data";
import Link from "next/link";

export default async function HomePage() {
  const [settings, products, categories] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(6),
    getCategories()
  ]);

  return (
    <SiteShell>
      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-card">
              <div className="badge">18+ Luxury Storefront</div>
              <h1>{settings.hero_title}</h1>
              <p>{settings.hero_subtitle}</p>
              <div className="hero-actions">
                <Link href="/shop" className="btn btn-primary">Shop Collection</Link>
                <Link href="/admin" className="btn">Manage Store</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Shop by Category</h2>
                <p>Real category management now lives in the admin dashboard.</p>
              </div>
            </div>
            <div className="product-grid">
              {categories.map((category) => (
                <div key={category.id} className="card">
                  <div className="kicker">Category</div>
                  <h3 style={{fontSize:28, margin:"10px 0"}}>{category.name}</h3>
                  <p className="muted">{category.description || "Use the admin area to refine copy, add products, and build your catalogue."}</p>
                  <Link href={`/shop?category=${category.slug}`} className="btn" style={{marginTop:12}}>View Category</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Featured Products</h2>
                <p>Feature your best sellers from the admin dashboard.</p>
              </div>
              <Link href="/shop" className="btn">View all</Link>
            </div>
            {products.length ? (
              <div className="product-grid">
                {products.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="empty">No featured products yet. Sign in to the admin dashboard and mark some products as featured.</div>
            )}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
