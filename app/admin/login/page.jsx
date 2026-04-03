"use client";

import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import { useRouter, useSearchParams } from "next/navigation";

function AdminLoginInner() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const error = searchParams.get("error");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message);
      else router.push("/admin");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setMsg(error.message);
      else setMsg("Account created. Add this user to admin_users in Supabase, then sign in.");
    }

    setLoading(false);
  }

  return (
    <main className="auth-shell">
      <div className="card auth-card">
        <div className="kicker">Admin</div>
        <h1 style={{ fontSize: 44, margin: "10px 0 12px" }}>{mode === "login" ? "Sign in" : "Create account"}</h1>
        <p className="muted" style={{ marginBottom: 18 }}>
          {mode === "login"
            ? "Use your admin email and password."
            : "Create a user, then add it to admin_users in Supabase to grant dashboard access."}
        </p>

        {error === "not-admin" ? (
          <div className="notice" style={{ marginBottom: 14 }}>
            You signed in successfully, but this account is not listed in <code>admin_users</code> yet.
          </div>
        ) : null}

        {msg ? <div className="notice" style={{ marginBottom: 14 }}>{msg}</div> : null}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary" disabled={loading} type="submit">
            {loading ? "Working..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          className="btn"
          style={{ marginTop: 12 }}
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMsg("");
          }}
        >
          {mode === "login" ? "Need a new account?" : "Already have an account?"}
        </button>
      </div>
    </main>
  );
}

function AuthFallback() {
  return (
    <main className="auth-shell">
      <div className="card auth-card">
        <div className="kicker">Admin</div>
        <h1 style={{ fontSize: 44, margin: "10px 0 12px" }}>Loading…</h1>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <AdminLoginInner />
    </Suspense>
  );
}
