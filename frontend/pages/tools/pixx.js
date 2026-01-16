import { useMemo, useState } from "react";
import Link from "next/link";

const USE_CASES = [
  "YouTube Thumbnail",
  "Logo / Brand Mark",
  "Instagram Post",
  "Website Hero Image",
  "Flyer / Poster",
  "Product Mockup",
];

const STYLES = [
  "Clean & modern",
  "Cinematic",
  "Minimalist",
  "Futuristic neon",
  "Bold & colorful",
  "Professional corporate",
];

const ASPECTS = ["16:9", "1:1", "9:16", "4:5", "3:2"];

const PRESETS = [
  {
    id: "yt-linux-thumb",
    label: "YouTube: Linux Thumbnail",
    values: {
      idea: "A YouTube thumbnail for 'What is Linux?' with a penguin mascot and a glowing terminal",
      useCase: "YouTube Thumbnail",
      style: "Clean & modern",
      aspectRatio: "16:9",
      brandColors: "teal + purple",
      textOverlay: "LINUX IN 60 SECONDS",
      mustInclude: "penguin, terminal glow, bold readable title",
      avoid: "blurry, watermark, unreadable text",
    },
  },
  {
    id: "logo-nerdnest",
    label: "Logo: NerdNest AI",
    values: {
      idea: "A modern tech logo for NerdNest AI using a minimal nest + circuit motif",
      useCase: "Logo / Brand Mark",
      style: "Minimalist",
      aspectRatio: "1:1",
      brandColors: "teal + purple",
      textOverlay: "NERDNEST AI",
      mustInclude: "simple shapes, clean lines, high contrast",
      avoid: "complex gradients, clutter, watermark",
    },
  },
  {
    id: "hero-ai-tools",
    label: "Hero: AI Tools Website",
    values: {
      idea: "A website hero image showing abstract AI workflow + creator tools, sleek dark background",
      useCase: "Website Hero Image",
      style: "Cinematic",
      aspectRatio: "16:9",
      brandColors: "teal + purple",
      textOverlay: "",
      mustInclude: "clean composition, negative space for headline",
      avoid: "busy background, watermark, noisy textures",
    },
  },
];

export default function PixXPage() {
  const [idea, setIdea] = useState("");
  const [useCase, setUseCase] = useState(USE_CASES[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState(ASPECTS[0]);
  const [brandColors, setBrandColors] = useState("teal + purple");
  const [textOverlay, setTextOverlay] = useState("");
  const [mustInclude, setMustInclude] = useState("");
  const [avoid, setAvoid] = useState("blurry, watermark");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const canGenerate = useMemo(() => idea.trim().length >= 4 && !loading, [idea, loading]);

  function applyPreset(p) {
    setError("");
    setCopied(false);
    setResult("");

    setIdea(p.values.idea);
    setUseCase(p.values.useCase);
    setStyle(p.values.style);
    setAspectRatio(p.values.aspectRatio);
    setBrandColors(p.values.brandColors);
    setTextOverlay(p.values.textOverlay);
    setMustInclude(p.values.mustInclude);
    setAvoid(p.values.avoid);
  }

  async function handleGenerate() {
    setError("");
    setCopied(false);
    setResult("");

    if (idea.trim().length < 4) {
      setError("Please enter an idea (at least 4 characters).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/pixx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: idea.trim(),
          useCase,
          style,
          aspectRatio,
          brandColors: brandColors.trim(),
          textOverlay: textOverlay.trim(),
          mustInclude: mustInclude.trim(),
          avoid: avoid.trim(),
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
            <h1 className="sx-h1">PixX</h1>
            <p className="sx-sub">Generate high-quality image prompts for thumbnails, logos, and creatives.</p>
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
                Idea / Description
                <input
                  className="sx-input"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder='e.g., "YouTube thumbnail: What is Linux? Penguin + glowing terminal"'
                />
                <small className="sx-hint">Example: “A cinematic AI robot typing code in a dark room.”</small>
              </label>

              <div className="sx-row">
                <label className="sx-label">
                  Use case
                  <select className="sx-select" value={useCase} onChange={(e) => setUseCase(e.target.value)}>
                    {USE_CASES.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </label>

                <label className="sx-label">
                  Style
                  <select className="sx-select" value={style} onChange={(e) => setStyle(e.target.value)}>
                    {STYLES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="sx-row">
                <label className="sx-label">
                  Aspect ratio
                  <select className="sx-select" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                    {ASPECTS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </label>

                <label className="sx-label">
                  Brand colors
                  <input
                    className="sx-input"
                    value={brandColors}
                    onChange={(e) => setBrandColors(e.target.value)}
                    placeholder='e.g., "teal + purple"'
                  />
                </label>
              </div>

              <label className="sx-label">
                Text overlay (optional)
                <input
                  className="sx-input"
                  value={textOverlay}
                  onChange={(e) => setTextOverlay(e.target.value)}
                  placeholder='e.g., "LINUX IN 60 SECONDS"'
                />
              </label>

              <label className="sx-label">
                Must include (optional)
                <input
                  className="sx-input"
                  value={mustInclude}
                  onChange={(e) => setMustInclude(e.target.value)}
                  placeholder='e.g., "penguin, terminal glow, bold title"'
                />
              </label>

              <label className="sx-label">
                Avoid (optional)
                <input
                  className="sx-input"
                  value={avoid}
                  onChange={(e) => setAvoid(e.target.value)}
                  placeholder='e.g., "blurry, watermark, unreadable text"'
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
                  <p className="sx-empty-sub">Enter an idea and click Generate.</p>
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
          background: radial-gradient(1200px 500px at 20% -10%, rgba(99, 102, 241, 0.18), transparent 60%),
            radial-gradient(900px 420px at 95% 0%, rgba(236, 72, 153, 0.14), transparent 55%),
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
        .sx-input:focus, .sx-select:focus, .sx-textarea:focus { border-color: rgba(99, 102, 241, 0.6); }

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

