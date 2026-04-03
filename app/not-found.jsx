import SiteShell from "@/components/SiteShell";
import Link from "next/link";

export default function NotFound() {
  return (
    <SiteShell>
      <main className="section">
        <div className="container">
          <div className="card">
            <div className="kicker">404</div>
            <h1 style={{fontSize:52, margin:"10px 0 14px"}}>Page not found</h1>
            <p className="muted">The page you tried to open does not exist.</p>
            <Link href="/" className="btn btn-primary" style={{marginTop:16}}>Back home</Link>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
