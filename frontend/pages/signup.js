import { useState } from "react";
import Link from "next/link";
import NavBar from "../components/NavBar";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://api.nerdnest.ai/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail || "Signup failed");
        return;
      }

      setSuccess("Signup successful! You may now log in.");
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <>
      <NavBar />
      <main className="nn-main">
        <section className="nn-auth-page">
          <div className="nn-auth-card">
            <div className="nn-auth-title">Create your account</div>
            <div className="nn-auth-subtitle">
              Start building your storefront in minutes.
            </div>

            {error && (
              <p style={{ color: "red", marginBottom: 10, fontSize: 12 }}>
                {error}
              </p>
            )}
            {success && (
              <p style={{ color: "green", marginBottom: 10, fontSize: 12 }}>
                {success}
              </p>
            )}

            <form onSubmit={handleSignup}>
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
                Sign up
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
              Already have an account?{" "}
              <Link href="/login">
                <span style={{ color: "#4f46e5" }}>Log in</span>
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

