// /home/ec2-user/nerdnest_ai_platform/frontend/pages/tools/videokit.js

import { useEffect, useMemo, useState } from "react";

export default function VideoKitToolPage() {
  // Gate identity
  const [email, setEmail] = useState("");
  const [leadId, setLeadId] = useState(null);
  const [gateOpen, setGateOpen] = useState(false);
  const [gateBusy, setGateBusy] = useState(false);
  const [gateErr, setGateErr] = useState("");

  // Tool inputs
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [duration, setDuration] = useState("60 seconds");
  const [audience, setAudience] = useState("Beginners");
  const [style, setStyle] = useState("Explainer");

  // Results
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [result, setResult] = useState(null);

  // Rate-limit headers (optional visibility)
  const [rateInfo, setRateInfo] = useState(null);

  const isGated = useMemo(() => {
    return !!email && (leadId !== null && leadId !== undefined);
  }, [email, leadId]);

  useEffect(() => {
    // Client-only localStorage read
    try {
      const savedEmail = window.localStorage.getItem("nn_email") || "";
      const savedLead = window.localStorage.getItem("nn_lead_id") || "";

      if (savedEmail && savedLead) {
        setEmail(savedEmail);
        const n = Number(savedLead);
        setLeadId(Number.isFinite(n) ? n : savedLead);
        setGateOpen(false);
      } else {
        // If not gated, open the modal automatically
        setGateOpen(true);
      }
    } catch {
      // If storage blocked, keep gate open
      setGateOpen(true);
    }
  }, []);

  async function submitGate(e) {
    e.preventDefault();
    setGateErr("");

    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setGateErr("Please enter a valid email address.");
      return;
    }

    setGateBusy(true);
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          source: "videokit_gate",
          consent: true,
          consent_version: "v1",
        }),
      });

      const data = await r.json().catch(() => ({}));

      if (!r.ok) {
        throw new Error(data?.error || "Failed to save email. Please try again.");
      }

      const newLeadId = data?.lead_id ?? null;
      if (newLeadId === null) {
        throw new Error("Lead capture did not return a lead_id.");
      }

      // Persist identity
      window.localStorage.setItem("nn_email", cleanEmail);
      window.localStorage.setItem("nn_lead_id", String(newLeadId));

      setEmail(cleanEmail);
      setLeadId(newLeadId);
      setGateOpen(false);
    } catch (e2) {
      setGateErr(e2?.message || "Could not save email.");
    } finally {
      setGateBusy(false);
    }
  }

  function clearIdentity() {
    try {
      window.localStorage.removeItem("nn_email");
      window.localStorage.removeItem("nn_lead_id");
    } catch {}
    setEmail("");
    setLeadId(null);
    setResult(null);
    setRateInfo(null);
    setErr("");
    setGateErr("");
    setGateOpen(true);
  }

  async function generateVideoKit() {
    setErr("");
    setResult(null);
    setRateInfo(null);

    const cleanTopic = String(topic || "").trim();
    if (cleanTopic.length < 4) {
      setErr("Topic must be at least 4 characters.");
      return;
    }

    // Hard stop: gate must be satisfied
    if (!isGated) {
      setGateOpen(true);
      setErr("Email is required to generate a VideoKit.");
      return;
    }

    setBusy(true);
    try {
      const payload = {
        topic: cleanTopic,
        platform,
        duration,
        audience,
        style,
        email: String(email).trim().toLowerCase(),
        lead_id: leadId,
      };

      const r = await fetch("/api/videokit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const rl = {
        minuteLimit: r.headers.get("x-ratelimit-limit-minute"),
        minuteRemaining: r.headers.get("x-ratelimit-remaining-minute"),
        hourLimit: r.headers.get("x-ratelimit-limit-hour"),
        hourRemaining: r.headers.get("x-ratelimit-remaining-hour"),
      };
      setRateInfo(rl);

      const data = await r.json().catch(() => ({}));

      if (!r.ok) {
        const msg = data?.message || data?.error || "Request failed.";
        if (String(data?.error || "").toLowerCase().includes("email_required")) {
          setGateOpen(true);
        }
        throw new Error(msg);
      }

      setResult(data);
    } catch (e2) {
      setErr(e2?.message || "Failed to generate VideoKit.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.h1}>VideoKit</h1>
            <p style={styles.sub}>
              Generate a scene plan (SceneX), voiceover (VoxX), thumbnail prompt (PixX), and publish pack.
            </p>
          </div>

          <div style={styles.identityBox}>
            {isGated ? (
              <>
                <div style={styles.identityLine}>
                  <strong>Saved Email:</strong> <span style={styles.mono}>{email}</span>
                </div>
                <div style={styles.identityLine}>
                  <strong>Lead ID:</strong> <span style={styles.mono}>{String(leadId)}</span>
                </div>
                <button type="button" onClick={clearIdentity} style={styles.linkBtn}>
                  Change email
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setGateOpen(true)}
                style={styles.primaryBtn}
              >
                Enter Email to Use VideoKit
              </button>
            )}
          </div>
        </header>

        <section style={styles.card}>
          <h2 style={styles.h2}>Inputs</h2>

          <div style={styles.grid}>
            <div style={styles.field}>
              <label style={styles.label}>Topic</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder='e.g., "Kubernetes basics"'
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Platform</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)} style={styles.input}>
                <option>YouTube</option>
                <option>TikTok</option>
                <option>Instagram Reels</option>
                <option>LinkedIn</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} style={styles.input}>
                <option>30 seconds</option>
                <option>60 seconds</option>
                <option>90 seconds</option>
                <option>3 minutes</option>
                <option>5 minutes</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Audience</label>
              <select value={audience} onChange={(e) => setAudience(e.target.value)} style={styles.input}>
                <option>Beginners</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>IT Pros</option>
                <option>Business</option>
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Style</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)} style={styles.input}>
                <option>Explainer</option>
                <option>Story</option>
                <option>Listicle</option>
                <option>Case Study</option>
                <option>Whiteboard</option>
              </select>
            </div>
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={generateVideoKit}
              disabled={busy}
              style={{ ...styles.primaryBtn, opacity: busy ? 0.7 : 1 }}
            >
              {busy ? "Generating..." : "Generate VideoKit"}
            </button>

            {rateInfo && (rateInfo.minuteLimit || rateInfo.hourLimit) ? (
              <div style={styles.rateBox}>
                <div style={styles.rateLine}>
                  <strong>Rate limits:</strong>{" "}
                  <span style={styles.mono}>
                    {rateInfo.minuteRemaining ?? "?"}/{rateInfo.minuteLimit ?? "?"} per minute •{" "}
                    {rateInfo.hourRemaining ?? "?"}/{rateInfo.hourLimit ?? "?"} per hour
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          {err ? <div style={styles.error}>{err}</div> : null}
        </section>

        {result ? (
          <section style={styles.card}>
            <h2 style={styles.h2}>Output</h2>

            <div style={styles.outputGrid}>
              <OutputBlock title="SceneX" text={result?.scenex || ""} />
              <OutputBlock title="VoxX" text={result?.voxx || ""} />
              <OutputBlock title="PixX" text={result?.pixx || ""} />
              <OutputBlock title="Publish Pack" text={result?.publishPack || ""} />
              <OutputBlock title="Full Pack (packText)" text={result?.packText || ""} />
            </div>
          </section>
        ) : null}
      </div>

      {gateOpen ? (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.h3}>Enter your email to use VideoKit</h3>
              <button
                type="button"
                onClick={() => setGateOpen(false)}
                style={styles.xBtn}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p style={styles.modalText}>
              We use this to save your generated packs and to share updates about NerdNest AI tools. You can change this
              anytime.
            </p>

            <form onSubmit={submitGate}>
              <div style={styles.field}>
                <label style={styles.label}>Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={styles.input}
                  type="email"
                  autoComplete="email"
                />
              </div>

              <div style={styles.consentRow}>
                <span style={styles.consentText}>
                  By continuing, you consent to receive product updates. Consent version: <span style={styles.mono}>v1</span>
                </span>
              </div>

              {gateErr ? <div style={styles.error}>{gateErr}</div> : null}

              <div style={styles.modalActions}>
                <button
                  type="submit"
                  disabled={gateBusy}
                  style={{ ...styles.primaryBtn, width: "100%", opacity: gateBusy ? 0.7 : 1 }}
                >
                  {gateBusy ? "Saving..." : "Continue"}
                </button>

                <button type="button" onClick={clearIdentity} style={styles.secondaryBtn}>
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function OutputBlock({ title, text }) {
  return (
    <div style={styles.outputCard}>
      <div style={styles.outputHeader}>
        <strong>{title}</strong>
        <button
          type="button"
          style={styles.copyBtn}
          onClick={() => {
            try {
              navigator.clipboard.writeText(String(text || ""));
            } catch {}
          }}
        >
          Copy
        </button>
      </div>
      <pre style={styles.pre}>{String(text || "").trim()}</pre>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1220",
    color: "#e7eefc",
    padding: "28px 16px",
  },
  container: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    marginBottom: 18,
  },
  h1: { margin: 0, fontSize: 28, letterSpacing: 0.2 },
  h2: { margin: "0 0 12px 0", fontSize: 18 },
  h3: { margin: 0, fontSize: 18 },
  sub: { margin: "6px 0 0 0", color: "#b8c7ee", maxWidth: 720 },
  identityBox: {
    minWidth: 280,
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 14,
    padding: 12,
    background: "rgba(255,255,255,0.04)",
  },
  identityLine: { fontSize: 12, color: "#cfe0ff", marginBottom: 6 },
  mono: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" },

  card: {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 16,
    padding: 16,
    background: "rgba(255,255,255,0.04)",
    marginBottom: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr",
    gap: 12,
  },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 12, color: "#b8c7ee" },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(0,0,0,0.25)",
    color: "#e7eefc",
    outline: "none",
  },
  actions: { display: "flex", gap: 12, alignItems: "center", marginTop: 14, flexWrap: "wrap" },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.18)",
    background: "linear-gradient(135deg, rgba(64,128,255,0.8), rgba(160,88,255,0.8))",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#e7eefc",
    cursor: "pointer",
    width: "100%",
    marginTop: 10,
  },
  linkBtn: {
    padding: 0,
    marginTop: 6,
    background: "transparent",
    border: "none",
    color: "#a9c7ff",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 12,
  },
  rateBox: {
    padding: "8px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.20)",
  },
  rateLine: { fontSize: 12, color: "#cfe0ff" },
  error: {
    marginTop: 12,
    padding: "10px 12px",
    borderRadius: 12,
    background: "rgba(255,0,0,0.12)",
    border: "1px solid rgba(255,0,0,0.25)",
    color: "#ffd2d2",
    fontSize: 13,
  },

  outputGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 12,
  },
  outputCard: {
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 14,
    background: "rgba(0,0,0,0.20)",
    overflow: "hidden",
  },
  outputHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  copyBtn: {
    padding: "6px 10px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#e7eefc",
    cursor: "pointer",
    fontSize: 12,
  },
  pre: {
    margin: 0,
    padding: 12,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontSize: 12,
  },

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 9999,
  },
  modal: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "#0d1730",
    padding: 16,
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  xBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(255,255,255,0.06)",
    color: "#e7eefc",
    cursor: "pointer",
    fontSize: 22,
    lineHeight: "22px",
  },
  modalText: { margin: "6px 0 14px 0", color: "#b8c7ee", fontSize: 13 },
  modalActions: { marginTop: 12 },
  consentRow: {
    marginTop: 10,
    padding: 10,
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(0,0,0,0.20)",
  },
  consentText: { fontSize: 12, color: "#cfe0ff" },
};

