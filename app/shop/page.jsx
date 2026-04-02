import SiteShell from "@/components/SiteShell";
import ProductCard from "@/components/ProductCard";
import { getAllProducts, getCategories } from "@/lib/data";

export default async function ShopPage({ searchParams }) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([getAllProducts(), getCategories()]);
  const categorySlug = params?.category || "";
  const filtered = categorySlug ? products.filter((p) => p.categories?.slug === categorySlug) : products;

  return (
    <SiteShell>
      <main className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Shop</h2>
              <p>Reusable vape devices, pods, coils and accessories.</p>
            </div>
          </div>

          <div className="tabs" style={{marginBottom:18}}>
            <a href="/shop" className={`tab ${!categorySlug ? "active" : ""}`}>All</a>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className={`tab ${categorySlug === category.slug ? "active" : ""}`}
              >
                {category.name}
              </a>
            ))}
          </div>

          {filtered.length ? (
            <div className="product-grid">
              {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="empty">No products in this category yet.</div>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
