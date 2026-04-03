import SiteShell from "@/components/SiteShell";

export default function AboutPage() {
  return (
    <SiteShell>
      <main className="section">
        <div className="container">
          <div className="card">
            <div className="kicker">About</div>
            <h1 style={{fontSize:"clamp(34px,5vw,56px)", margin:"10px 0 14px"}}>Built like a real brand, not a throwaway template</h1>
            <p className="muted" style={{fontSize:18, lineHeight:1.8}}>
              This rebuild uses a proper cloud database, proper admin authentication, real categories, and real product management.
              Replace this page with your own brand story, sourcing standards, customer service promise, and delivery info.
            </p>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
