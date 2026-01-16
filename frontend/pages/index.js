import Link from "next/link";

const tools = [
  {
    name: "ScriptX",
    desc: "Write blogs, ads, emails, and YouTube scripts in seconds.",
    href: "/tools/scriptx",
  },
  {
    name: "SceneX",
    desc: "Turn ideas into AI-ready video scene prompts for Veo, Pictory, Runway.",
    href: "/tools/scenex",
  },
  {
    name: "PixX",
    desc: "Generate high-quality image prompts for logos, thumbnails, and creatives.",
    href: "/tools/pixx",
  },
  {
    name: "VoxX",
    desc: "Create voiceover scripts with tone control and pacing.",
    href: "/tools/voxx",
  },
  {
    name: "ChatX",
    desc: "Build simple AI assistants for customer support and workflows.",
    href: "/tools/chatx",
  },
];

export default function HomePage() {
  return (
    <div className="nn-page">
      {/* HERO */}
      <section className="nn-hero">
        <div className="nn-container">
          <div className="nn-hero-grid">
            <div>
              <p className="nn-kicker">NerdNest AI</p>
              <h1 className="nn-h1">Practical AI tools that help you ship faster.</h1>
              <p className="nn-subtitle">
                Generate content, prompts, and assistants in minutes. Clean, simple, and built
                for creators, teams, and small businesses.
              </p>

              <div className="nn-cta-row">
                <Link href="/signup" className="nn-btn-primary">
                  Start Free
                </Link>
                <Link href="/products" className="nn-btn-secondary">
                  Explore Tools
                </Link>
              </div>

              <div className="nn-trust">
                <span className="nn-pill">Fast outputs</span>
                <span className="nn-pill">Minimal UI</span>
                <span className="nn-pill">Made for execution</span>
              </div>
            </div>

            {/* Right-side preview card */}
            <div className="nn-preview">
              <div className="nn-preview-card">
                <div className="nn-preview-top">
                  <div className="nn-dot" />
                  <div className="nn-dot" />
                  <div className="nn-dot" />
                </div>

                <div className="nn-preview-body">
                  <p className="nn-preview-label">Example</p>
                  <h3 className="nn-preview-title">YouTube Script (3 minutes)</h3>
                  <p className="nn-preview-text">
                    Topic: “What is DevOps?” Tone: clear, beginner-friendly. Include hook,
                    3 key points, and a strong CTA.
                  </p>

                  <div className="nn-preview-output">
                    <div className="nn-skel-line w-80" />
                    <div className="nn-skel-line w-72" />
                    <div className="nn-skel-line w-64" />
                    <div className="nn-skel-line w-56" />
                  </div>

                  <div className="nn-preview-actions">
                    <span className="nn-chip">ScriptX</span>
                    <span className="nn-chip">Ready to copy</span>
                    <span className="nn-chip">Optimized</span>
                  </div>
                </div>
              </div>

              <p className="nn-preview-note">
                Keep it simple at launch: one strong homepage + one polished tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="nn-section">
        <div className="nn-container">
          <div className="nn-section-head">
            <h2 className="nn-h2">Start with the MVP tools</h2>
            <p className="nn-muted">
              Launch with 5 high-impact tools. Expand into a directory later—without rebuilding.
            </p>
          </div>

          <div className="nn-grid">
            {tools.map((t) => (
              <Link key={t.name} href={t.href} className="nn-card">
                <div className="nn-card-top">
                  <span className="nn-card-title">{t.name}</span>
                  <span className="nn-arrow">→</span>
                </div>
                <p className="nn-card-desc">{t.desc}</p>
              </Link>
            ))}
          </div>

          <div className="nn-mini-cta">
            <Link href="/products" className="nn-btn-secondary">
              View all tools
            </Link>
          </div>
        </div>
      </section>

      {/* WHY STRIP */}
      <section className="nn-strip">
        <div className="nn-container nn-strip-grid">
          <div className="nn-strip-item">
            <h3 className="nn-h3">Clean by design</h3>
            <p className="nn-muted">Minimal interface, focused outputs, no clutter.</p>
          </div>
          <div className="nn-strip-item">
            <h3 className="nn-h3">Built for speed</h3>
            <p className="nn-muted">Fast generation, easy copy, quick iteration loops.</p>
          </div>
          <div className="nn-strip-item">
            <h3 className="nn-h3">Evolves into a directory</h3>
            <p className="nn-muted">Your tools become the featured listings later.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="nn-section">
        <div className="nn-container">
          <div className="nn-final">
            <div>
              <h2 className="nn-h2">Ready to launch NerdNest AI?</h2>
              <p className="nn-muted">
                Start free today. Then we polish one tool end-to-end and ship the MVP.
              </p>
            </div>
            <div className="nn-cta-row">
              <Link href="/signup" className="nn-btn-primary">
                Start Free
              </Link>
              <Link href="/dashboard" className="nn-btn-secondary">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Page styles (scoped) */}
      <style jsx>{`
        .nn-page {
          min-height: 100vh;
          background: radial-gradient(1200px 500px at 20% -10%, rgba(99, 102, 241, 0.25), transparent 60%),
            radial-gradient(900px 420px at 95% 0%, rgba(236, 72, 153, 0.2), transparent 55%),
            #0b1020;
          color: #fff;
        }

        .nn-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .nn-hero {
          padding: 4.5rem 0 2.5rem;
        }

        .nn-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2.25rem;
          align-items: start;
        }

        .nn-kicker {
          color: rgba(203, 213, 245, 0.9);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.8rem;
          margin-bottom: 0.8rem;
        }

        .nn-h1 {
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          line-height: 1.08;
          margin: 0 0 1rem 0;
          letter-spacing: -0.02em;
        }

        .nn-subtitle {
          color: rgba(203, 213, 245, 0.85);
          font-size: 1.05rem;
          line-height: 1.55;
          max-width: 42rem;
          margin: 0 0 1.5rem 0;
        }

        .nn-cta-row {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1.2rem;
        }

        .nn-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.1rem;
          border-radius: 999px;
          background: #fff;
          color: #0b1020;
          font-weight: 650;
          text-decoration: none;
          transition: transform 0.15s ease, opacity 0.15s ease;
        }
        .nn-btn-primary:hover {
          transform: translateY(-1px);
          opacity: 0.92;
        }

        .nn-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.65rem 1.1rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(148, 163, 184, 0.25);
          color: rgba(255, 255, 255, 0.92);
          font-weight: 550;
          text-decoration: none;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .nn-btn-secondary:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.11);
        }

        .nn-trust {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.25rem;
        }

        .nn-pill {
          font-size: 0.82rem;
          color: rgba(203, 213, 245, 0.92);
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(255, 255, 255, 0.06);
          padding: 0.35rem 0.65rem;
          border-radius: 999px;
        }

        .nn-preview {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .nn-preview-card {
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(15, 23, 42, 0.55);
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        .nn-preview-top {
          display: flex;
          gap: 0.4rem;
          padding: 0.7rem 0.85rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.18);
        }

        .nn-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
        }

        .nn-preview-body {
          padding: 1.05rem 1.1rem 1.15rem;
        }

        .nn-preview-label {
          margin: 0 0 0.35rem 0;
          font-size: 0.8rem;
          color: rgba(203, 213, 245, 0.8);
        }

        .nn-preview-title {
          margin: 0 0 0.55rem 0;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
        }

        .nn-preview-text {
          margin: 0 0 0.85rem 0;
          color: rgba(203, 213, 245, 0.86);
          line-height: 1.55;
          font-size: 0.95rem;
        }

        .nn-preview-output {
          display: grid;
          gap: 0.5rem;
          margin: 0.9rem 0 0.9rem 0;
        }

        .nn-skel-line {
          height: 10px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.08),
            rgba(255, 255, 255, 0.14),
            rgba(255, 255, 255, 0.08)
          );
        }

        .w-80 { width: 80%; }
        .w-72 { width: 72%; }
        .w-64 { width: 64%; }
        .w-56 { width: 56%; }

        .nn-preview-actions {
          display: flex;
          gap: 0.45rem;
          flex-wrap: wrap;
          margin-top: 0.25rem;
        }

        .nn-chip {
          font-size: 0.78rem;
          padding: 0.3rem 0.55rem;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(203, 213, 245, 0.92);
        }

        .nn-preview-note {
          margin: 0;
          color: rgba(203, 213, 245, 0.75);
          font-size: 0.9rem;
        }

        .nn-section {
          padding: 2.75rem 0;
        }

        .nn-section-head {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1.3rem;
        }

        .nn-h2 {
          margin: 0;
          font-size: 1.8rem;
          letter-spacing: -0.02em;
        }

        .nn-muted {
          margin: 0;
          color: rgba(203, 213, 245, 0.8);
          line-height: 1.55;
        }

        .nn-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .nn-card {
          display: block;
          padding: 1.1rem 1.05rem;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: rgba(15, 23, 42, 0.5);
          text-decoration: none;
          transition: transform 0.15s ease, background 0.15s ease, border-color 0.15s ease;
        }

        .nn-card:hover {
          transform: translateY(-2px);
          background: rgba(15, 23, 42, 0.65);
          border-color: rgba(148, 163, 184, 0.3);
        }

        .nn-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }

        .nn-card-title {
          font-weight: 650;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.92);
        }

        .nn-arrow {
          color: rgba(203, 213, 245, 0.8);
        }

        .nn-card-desc {
          margin: 0;
          color: rgba(203, 213, 245, 0.82);
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .nn-mini-cta {
          margin-top: 1.25rem;
          display: flex;
          justify-content: flex-start;
        }

        .nn-strip {
          padding: 2.25rem 0;
          border-top: 1px solid rgba(148, 163, 184, 0.14);
          border-bottom: 1px solid rgba(148, 163, 184, 0.14);
          background: rgba(15, 23, 42, 0.35);
        }

        .nn-strip-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
        }

        .nn-strip-item {
          padding: 0.85rem 0.2rem;
        }

        .nn-h3 {
          margin: 0 0 0.4rem 0;
          font-size: 1.05rem;
          letter-spacing: -0.01em;
        }

        .nn-final {
          border-radius: 18px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: rgba(15, 23, 42, 0.55);
          padding: 1.4rem 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 980px) {
          .nn-hero-grid {
            grid-template-columns: 1fr;
          }
          .nn-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .nn-strip-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .nn-container {
            padding: 0 1rem;
          }
          .nn-grid {
            grid-template-columns: 1fr;
          }
          .nn-h2 {
            font-size: 1.55rem;
          }
        }
      `}</style>
    </div>
  );
}

