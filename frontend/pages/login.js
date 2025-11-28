import { useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";
import { saveToken } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://api.nerdnest.ai/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Login failed");
        return;
      }

      // Save JWT in localStorage (lib/auth.js)
      saveToken(data.token);

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Network error. Please try again.");
    }
  }

  return (
    <>
      <NavBar />
      <main className="nn-main">
        <section className="nn-auth-page">
          <div className="nn-auth-card">
            <div className="nn-auth-title">Log in</div>
            <div className="nn-auth-subtitle">
              Access your NerdNest dashboard and storefront.
            </div>

            {error && (
              <p
                style={{
                  color: "red",
                  marginBottom: 10,
                  fontSize: 12,
                }}
              >
                {error}
              </p>
            )}

            <form onSubmit={handleLogin}>
              <div className="nn-field">
                <label>Email</label>
                <input
                  className="nn-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="nn-field">
                <label>Password</label>
                <input
                  className="nn-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="nn-btn nn-btn-primary"
                style={{ width: "100%", marginTop: 18 }}
              >
                Continue
              </button>
            </form>

            <p
              style={{
                marginTop: 14,
                fontSize: 12,
                color: "#9ca3af",
                textAlign: "center",
              }}
            >
              Don’t have an account?{" "}
              <Link href="/signup">
                <span style={{ color: "#4f46e5" }}>Sign up</span>
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

