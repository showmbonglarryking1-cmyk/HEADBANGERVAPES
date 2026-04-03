import Image from "next/image";
import Link from "next/link";
import { currency } from "@/lib/utils";

export default function ProductCard({ product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="product-card">
      <div className="image-wrap">
        <Image
          src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"}
          alt={product.name}
          width={900}
          height={900}
        />
      </div>
      <div className="body">
        <div className="kicker">{product.categories?.name || product.brand || "Product"}</div>
        <h3 style={{fontSize:26, margin:"10px 0 8px"}}>{product.name}</h3>
        <p className="muted" style={{minHeight:46}}>{product.short_description || product.description || ""}</p>
        <div style={{display:"flex",alignItems:"baseline",gap:8}}>
          <span className="price">{currency(product.price_gbp)}</span>
          {product.compare_at_price_gbp ? <span className="old-price">{currency(product.compare_at_price_gbp)}</span> : null}
        </div>
      </div>
    </Link>
  );
}
