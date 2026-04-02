import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

export default async function SiteShell({ children }) {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="topbar">18+ only • Reusable vape products & accessories • UK adult customers only</div>
      <header className="site-header">
        <div className="container nav">
          <Link href="/" className="brand">
            <span className="brand-mark" />
            <span>{settings.store_name || "Headbanger Vapes"}</span>
          </Link>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="footer">
        <div className="container">
          <div style={{display:"flex",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
            <div>
              <div className="brand" style={{marginBottom:10}}>
                <span className="brand-mark" />
                <span>{settings.store_name || "Headbanger Vapes"}</span>
              </div>
              <div>Luxury refillable vape devices, pods, coils and accessories.</div>
            </div>
            <div>
              <div>{settings.support_email || "support@example.com"}</div>
              <div>{settings.support_phone || "+44 0000 000000"}</div>
              <div>{settings.address_line || "Your business address"}</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
