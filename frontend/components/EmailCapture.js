import { useState } from "react";

export default function EmailCapture({ source = "videokit", buttonText = "Continue", onSuccess }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setStatus("saving");
    setError("");

    try {
      const qs = new URLSearchParams(window.location.search);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          consent,
          consent_version: "v1",
          utm_source: qs.get("utm_source"),
          utm_medium: qs.get("utm_medium"),
          utm_campaign: qs.get("utm_campaign"),
          utm_content: qs.get("utm_content"),
          utm_term: qs.get("utm_term"),
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(`${res.status}: ${t}`);
      }

      const data = await res.json();

      localStorage.setItem("nerdnest_email", email);
      if (data?.lead_id != null) localStorage.setItem("nerdnest_lead_id", String(data.lead_id));

      setStatus("done");
      onSuccess && onSuccess({ email, lead_id: data.lead_id });
    } catch (err) {
      setStatus("error");
      setError(err?.message || "Unknown error");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
      <input
        type="email"
        required
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10 }}
      />

      <label style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span style={{ fontSize: 13 }}>
          I agree to receive NerdNest AI updates. Unsubscribe anytime.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "saving"}
        style={{ padding: 12, borderRadius: 10, border: "1px solid #ddd" }}
      >
        {status === "saving" ? "Saving..." : buttonText}
      </button>

      {status === "error" && (
        <div style={{ fontSize: 13, color: "crimson" }}>{error}</div>
      )}
    </form>
  );
}
