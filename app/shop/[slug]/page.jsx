import SiteShell from "@/components/SiteShell";
import { getProductBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { currency } from "@/lib/utils";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <SiteShell>
      <main className="section">
        <div className="container two-col">
          <div className="card">
            <Image
              src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"}
              alt={product.name}
              width={1200}
              height={1200}
              style={{width:"100%",height:"auto",borderRadius:18}}
            />
          </div>
          <div className="card">
            <div className="kicker">{product.categories?.name || product.brand || "Product"}</div>
            <h1 style={{fontSize:"clamp(38px,5vw,58px)", margin:"10px 0 14px"}}>{product.name}</h1>
            <p className="muted" style={{fontSize:18, lineHeight:1.8}}>{product.short_description}</p>
            <div style={{display:"flex",alignItems:"baseline",gap:8, margin:"18px 0 10px"}}>
              <span className="price">{currency(product.price_gbp)}</span>
              {product.compare_at_price_gbp ? <span className="old-price">{currency(product.compare_at_price_gbp)}</span> : null}
            </div>
            <div className="pill">{product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : "Out of stock"}</div>

            <div style={{marginTop:20, lineHeight:1.8}}>
              <p>{product.description || "No long description added yet."}</p>
              {product.brand ? <p><strong>Brand:</strong> {product.brand}</p> : null}
              {product.sku ? <p><strong>SKU:</strong> {product.sku}</p> : null}
            </div>

            <div className="notice" style={{marginTop:18}}>
              This starter leaves checkout simple on purpose. Expand it later with compliant payment and order capture.
            </div>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
