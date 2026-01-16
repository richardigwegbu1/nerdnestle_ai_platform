// pages/login.js
"use client";
import { useState, useEffect } from "react";
import Router from "next/router";

export default function LoginPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const apiBase = "https://nerdnest.ai/api/auth";

  useEffect(() => {
    // Hydrate saved email (optional)
    const savedEmail = typeof window !== "undefined" && localStorage.getItem("nn_email");
    if (savedEmail) setEmail(savedEmail);
  }, []);

  async function sendLoginCode(e) {
    e.preventDefault();

    if (!email) return alert("Enter a valid email");

    const res = await fetch(`${apiBase}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("nn_email", email.toLowerCase().trim());
      setStep("code");
    } else {
      alert(data.detail || "Something went wrong");
    }
  }

  async function verifyCode(e) {
    e.preventDefault();

    if (!code) return alert("Enter your verification code");

    const formData = new FormData();
    formData.append("email", email.toLowerCase().trim());
    formData.append("code", code);

    const res = await fetch(`${apiBase}/verify-code`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.detail || "Invalid code");
      return;
    }

    // SAVE TOKEN
    localStorage.setItem("nn_token", data.token);
    localStorage.setItem("nn_email", data.email);

    Router.push("/dashboard");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Log in to NerdNest AI</h2>

      {step === "email" && (
        <form onSubmit={sendLoginCode}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">Send Login Code</button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={verifyCode}>
          <label>Enter Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button type="submit">Verify & Log In</button>
        </form>
      )}
    </main>
  );
}

