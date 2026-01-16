import { useMemo, useState } from "react";
import Link from "next/link";

const PLATFORMS = ["YouTube", "TikTok", "Instagram Reels", "Facebook", "LinkedIn"];
const VOICES = ["Male - calm", "Male - energetic", "Female - calm", "Female - energetic", "Neutral"];
const TONES = ["Clear & professional", "Beginner-friendly", "Casual & friendly", "Direct & punchy", "Storytelling"];
const PACES = ["Slow", "Medium", "Fast"];

const PRESETS = [
  {
    id: "yt-devops-60",
    label: "YouTube: DevOps (60s)",
    values: {
      topic: "What is DevOps?",
      platform: "YouTube",
      voice: "Male - calm",
      tone: "Clear & professional",
      pace: "Medium",
      duration: "60 seconds",
      audience: "Beginners",
      callToAction: "Subscribe for more DevOps lessons",
      notes: "Keep it simple and confident. Use short sentences and clear pauses.",
    },
  },
  {
    id: "tt-linux-30",
    label: "TikTok: Linux (30s)",
    values: {
      topic: "Linux in 30 seconds",
      platform: "TikTok",
      voice: "Female - energetic",
      tone: "Direct & punchy",
      pace: "Fast",
      duration: "30 seconds",
      audience: "Beginners",
      callToAction: "Follow for more quick tech lessons",
      notes: "Fast hook, high energy, big keywords. Avoid long explanations.",
    },
  },
  {
    id: "ig-automation-45",
    label: "Reels: Automation (45s)",
    values: {
      topic: "One automation workflow that saves hours each week",
      platform: "Instagram Reels",
      voice: "Neutral",
      tone: "Casual & friendly",
      pace: "Medium",
      duration: "45 seconds",
      audience: "Creators and professionals",
      callToAction: "Try NerdNest AI tools for faster creation",
      notes: "Friendly tone. Include one quick example and a final takeaway line.",
    },
  },
];

export default function VoxXPage() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [voice, setVoice] = useState(VOICES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [pace, setPace] = useState(PACES[1]);
  const [duration, setDuration] = useState("60 seconds");
  const [audience, setAudience] = useState("Beginners");
  const [callToAction, setCallToAction] = useState("Subscribe for more");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const canGenerate = useMemo(() => topic.trim().length >= 2 && !loading, [topic, loading]);

  function applyPreset(p) {
    setError("");
    setCopied(false);
    setResult("");

    setTopic(p.values.topic);
    setPlatform(p.values.platform);
    setVoice(p.values.voice);
    setTone(p.values.tone);
    setPace(p.values.pace);
    setDuration(p.values.duration);
    setAudience(p.values.audience);
    setCallToAction(p.values.callToAction);
    setNotes(p.values.notes);
  }

  async function handleGenerate() {
    setError("");
    setCopied(false);
    setResult("");

    if (topic.trim().length < 2) {
      setError("Please enter a topic (at least 2 characters).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/voxx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          platform,
          voice,
          tone,
          pace,
          duration: duration.trim(),
          audience: audience.trim(),
          callToAction: callToAction.trim(),
          notes: notes.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Request failed");

      setResult(data?.text || "");
      if (!data?.text) setError("No output returned. Please try again.");
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setError("Copy failed. Select the text and copy manually.");
    }
  }

  return (
    <div className="sx-page">
      <div className="sx-container">
        <div className="sx-top">
          <div>
            <p className="sx-kicker">Tools</p>
            <h1 className="sx-h1">VoxX</h1>
            <p className="sx-sub">Create voiceover scripts with tone control, pacing, and clear delivery notes.</p>
          </div>

          <div className="sx-breadcrumb">
            <Link href="/products" className="sx-link">← Back to Tools</Link>
          </div>
        </div>

        <div className="sx-grid">
          {/* LEFT */}
          <section className="sx-card">
            <h2 className="sx-h2">Your input</h2>

            {/* PRESETS */}
            <div className="sx-presets">
              <div className="sx-presets-head">
                <span className="sx-presets-title">Presets</span>
                <span className="sx-presets-sub">Click one to auto-fill.</span>
              </div>
              <div className="sx-presets-row">
                {PRESETS.map((p) => (
                  <button key={p.id} type="button" className="sx-preset" onClick={() => applyPreset(p)} disabled={loading}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sx-form">
              <label className="sx-label">
                Topic
                <input
                  className="sx-input"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder='e.g., "What is DevOps?"'
                />
                <small className="sx-hint">
                  Example: “Explain IAM permissions for beginners in 60 seconds.”
                </small>
              </label>

              <div className="sx-row">
                <label className="sx-label">
                  Platform
                  <select className="sx-select" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </label>

                <label className="sx-label">
                  Voice
                  <select className="sx-select" value={voice} onChange={(e) => setVoice(e.target.value)}>
                    {VOICES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="sx-row">
                <label className="sx-label">
                  Tone
                  <select className="sx-select" value={tone} onChange={(e) => setTone(e.target.value)}>
                    {TONES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <label className="sx-label">
                  Pace
                  <select className="sx-select" value={pace} onChange={(e) => setPace(e.target.value)}>
                    {PACES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="sx-row">
                <label className="sx-label">
                  Duration
                  <input
                    className="sx-input"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder='e.g., "60 seconds"'
                  />
                </label>

                <label className="sx-label">
                  Audience
                  <input
                    className="sx-input"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g., Beginners, Students, Creators"
                  />
                </label>
              </div>

              <label className="sx-label">
                Call to action
                <input
                  className="sx-input"
                  value={callToAction}
                  onChange={(e) => setCallToAction(e.target.value)}
                  placeholder='e.g., "Subscribe for more tech lessons"'
                />
              </label>

              <label className="sx-label">
                Extra notes (optional)
                <textarea
                  className="sx-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Keep it confident and simple; pause after key terms."
                />
              </label>

              {error ? <div className="sx-error">{error}</div> : null}

              <button className="sx-btn" type="button" disabled={!canGenerate} onClick={handleGenerate}>
                {loading ? "Generating…" : "Generate"}
              </button>
            </div>
          </section>

          {/* RIGHT */}
          <section className="sx-card">
            <div className="sx-output-head">
              <h2 className="sx-h2">Output</h2>
              <div className="sx-actions">
                <button className="sx-btn-secondary" onClick={handleCopy} disabled={!result || loading} type="button">
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  className="sx-btn-secondary"
                  onClick={() => { setResult(""); setError(""); setCopied(false); }}
                  disabled={loading}
                  type="button"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="sx-output">
              {!result && !loading ? (
                <div className="sx-empty">
                  <p className="sx-empty-title">No output yet.</p>
                  <p className="sx-empty-sub">Enter a topic and click Generate.</p>
                </div>
              ) : null}

              {loading ? (
                <div className="sx-skel">
                  <div className="sx-line w80" />
                  <div className="sx-line w72" />
                  <div className="sx-line w64" />
                  <div className="sx-line w56" />
                  <div className="sx-line w80" />
                  <div className="sx-line w72" />
                </div>
              ) : null}

              {result ? <pre className="sx-pre">{result}</pre> : null}
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        .sx-page {
          min-height: 100vh;
          background: radial-gradient(1200px 500px at 20% -10%, rgba(236, 72, 153, 0.16), transparent 60%),
            radial-gradient(900px 420px at 95% 0%, rgba(99, 102, 241, 0.14), transparent 55%),
            #0b1020;
          color: #fff;
          padding: 2.25rem 0 3rem;
        }
        .sx-container { max-width: 1300px; margin: 0 auto; padding: 0 1.5rem; }
        .sx-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1.4rem; }
        .sx-kicker { margin: 0 0 0.35rem 0; color: rgba(203, 213, 245, 0.85); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; font-size: 0.78rem; }
        .sx-h1 { margin: 0; font-size: 2.2rem; letter-spacing: -0.02em; }
        .sx-sub { margin: 0.6rem 0 0 0; color: rgba(203, 213, 245, 0.82); line-height: 1.55; max-width: 52rem; }
        .sx-link { color: rgba(203, 213, 245, 0.85); text-decoration: none; border-bottom: 1px solid rgba(203, 213, 245, 0.25); }
        .sx-link:hover { color: #fff; border-bottom-color: rgba(255, 255, 255, 0.35); }

        .sx-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .sx-card { border-radius: 18px; border: 1px solid rgba(148, 163, 184, 0.22); background: rgba(15, 23, 42, 0.55); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22); padding: 1.1rem; }
        .sx-h2 { margin: 0 0 0.9rem 0; font-size: 1.15rem; letter-spacing: -0.01em; }

        .sx-presets { border: 1px solid rgba(148, 163, 184, 0.18); background: rgba(2, 6, 23, 0.22); border-radius: 14px; padding: 0.85rem; margin-bottom: 0.9rem; }
        .sx-presets-head { display: flex; align-items: baseline; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.7rem; }
        .sx-presets-title { font-weight: 700; color: rgba(255, 255, 255, 0.92); }
        .sx-presets-sub { color: rgba(203, 213, 245, 0.72); font-size: 0.85rem; }
        .sx-presets-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .sx-preset { border-radius: 999px; border: 1px solid rgba(148, 163, 184, 0.25); background: rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.92); padding: 0.55rem 0.85rem; cursor: pointer; transition: transform 0.15s ease, background 0.15s ease; font-size: 0.9rem; white-space: nowrap; }
        .sx-preset:disabled { opacity: 0.55; cursor: not-allowed; }
        .sx-preset:hover:not(:disabled) { transform: translateY(-1px); background: rgba(255, 255, 255, 0.11); }

        .sx-form { display: grid; gap: 0.85rem; }
        .sx-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .sx-label { display: grid; gap: 0.4rem; color: rgba(203, 213, 245, 0.9); font-size: 0.9rem; }
        .sx-hint { color: rgba(203, 213, 245, 0.7); font-size: 0.82rem; }
        .sx-input, .sx-select, .sx-textarea { width: 100%; border-radius: 12px; border: 1px solid rgba(148, 163, 184, 0.22); background: rgba(2, 6, 23, 0.35); color: rgba(255, 255, 255, 0.92); padding: 0.7rem 0.8rem; outline: none; }
        .sx-textarea { min-height: 110px; resize: vertical; }
        .sx-input:focus, .sx-select:focus, .sx-textarea:focus { border-color: rgba(236, 72, 153, 0.55); }

        .sx-error { border: 1px solid rgba(239, 68, 68, 0.35); background: rgba(239, 68, 68, 0.08); padding: 0.7rem 0.8rem; border-radius: 12px; font-size: 0.9rem; }

        .sx-btn { border: 0; border-radius: 999px; background: #fff; color: #0b1020; font-weight: 700; padding: 0.75rem 1rem; cursor: pointer; transition: transform 0.15s ease, opacity 0.15s ease; }
        .sx-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .sx-btn:hover:not(:disabled) { transform: translateY(-1px); opacity: 0.95; }

        .sx-output-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.85rem; }
        .sx-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .sx-btn-secondary { border-radius: 999px; border: 1px solid rgba(148, 163, 184, 0.25); background: rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.92); padding: 0.55rem 0.85rem; cursor: pointer; transition: transform 0.15s ease, background 0.15s ease; }
        .sx-btn-secondary:disabled { opacity: 0.55; cursor: not-allowed; }
        .sx-btn-secondary:hover:not(:disabled) { transform: translateY(-1px); background: rgba(255, 255, 255, 0.11); }

        .sx-output { border-radius: 14px; border: 1px solid rgba(148, 163, 184, 0.18); background: rgba(2, 6, 23, 0.22); min-height: 420px; padding: 0.9rem; overflow: auto; }
        .sx-empty-title { margin: 0 0 0.25rem 0; font-weight: 650; }
        .sx-empty-sub { margin: 0; color: rgba(203, 213, 245, 0.78); }
        .sx-pre { margin: 0; white-space: pre-wrap; word-wrap: break-word; line-height: 1.6; color: rgba(255, 255, 255, 0.92); font-size: 0.95rem; }

        .sx-skel { display: grid; gap: 0.65rem; }
        .sx-line { height: 10px; border-radius: 999px; background: linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.08)); }
        .w80 { width: 80%; } .w72 { width: 72%; } .w64 { width: 64%; } .w56 { width: 56%; }

        @media (max-width: 980px) { .sx-grid { grid-template-columns: 1fr; } }
        @media (max-width: 520px) { .sx-container { padding: 0 1rem; } .sx-top { flex-direction: column; } .sx-row { grid-template-columns: 1fr; } .sx-presets-head { flex-direction: column; align-items: flex-start; } }
      `}</style>
    </div>
  );
}

