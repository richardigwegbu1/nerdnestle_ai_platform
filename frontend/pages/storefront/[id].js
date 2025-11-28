/* pages/storefront/[id].js */
import { THEMES } from "../../lib/themes";

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://nerdnest.ai/api/storefront/${params.id}`);
  const data = await res.json();

  return { props: { storefront: data } };
}

export default function StorefrontPage({ storefront }) {
  const theme = THEMES[storefront.theme] || THEMES.modern;

  const bg = theme.background || "radial-gradient(circle at top, #020617, #020617 40%, #020617 100%)";
  const headerGradient =
    theme.headerGradient || "linear-gradient(135deg, #6366f1, #a855f7)";
  const accent = theme.accent || "#6366f1";
  const textColor = theme.textColor || "#e5e7eb";
  const cardBg = theme.cardBg || "rgba(15,23,42,0.9)";
  const cardShadow =
    theme.cardShadow || "0 24px 60px rgba(15,23,42,0.9)";

  const tools = Array.isArray(storefront.tools) ? storefront.tools : [];
  const topTools = tools.slice(0, 3);

  return (
    <div className="page">
      {/* LEFT SIDE: HERO + DESKTOP GLASS PREVIEW */}
      <div className="left-column">
        <div className="hero">
          <span className="badge">Powered by NerdNest AI</span>
          <h1>
            {storefront.brand || "Your AI Storefront"}
          </h1>
          <p className="subtitle">
            Launch a curated stack of AI tools — branded for{" "}
            <span className="brand-name">
              {storefront.brand || "your business"}
            </span>
            .
          </p>

          {topTools.length > 0 && (
            <div className="tags">
              {topTools.map((tool) => (
                <span key={tool} className="tag">
                  {tool}
                </span>
              ))}
            </div>
          )}

          <div className="hero-actions">
            <button className="cta-primary">
              Explore {storefront.brand || "Storefront"}
            </button>
            <button className="cta-ghost">
              View all AI tools ({tools.length || 1})
            </button>
          </div>

          <p className="tiny-note">
            Built once. Reused forever. Earn revenue every time your tools are sold.
          </p>
        </div>

        {/* DESKTOP FLOATING GLASS PANEL */}
        <div className="desktop-wrapper">
          <div className="desktop-glass">
            <div className="desktop-header">
              <div className="traffic-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="desktop-url">
                nerdnest.ai/storefront/{storefront.id?.slice(0, 6) || "XXXXXX"}
              </div>
            </div>

            <div className="desktop-body">
              <div className="desktop-title-row">
                <div>
                  <h2>{storefront.brand || "AI Tool Stack"}</h2>
                  <p className="desktop-sub">
                    Smart automations, custom-branded landing page, and Stripe-powered checkout.
                  </p>
                </div>
                <button className="desktop-cta">Live Demo</button>
              </div>

              <div className="desktop-grid">
                {(tools.length ? tools : ["AI Chat Assistant", "AI Resume Analyzer", "AI Support Bot"])
                  .slice(0, 3)
                  .map((tool) => (
                    <div key={tool} className="desktop-card">
                      <div className="icon-pill">
                        <span className="icon-spark">⚡</span>
                      </div>
                      <h3>{tool}</h3>
                      <p>
                        Automate repetitive work, answer questions, and convert more visitors 24/7.
                      </p>
                      <button className="desktop-card-btn">
                        View Details
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: DARK iPHONE + GLASS PANEL STYLE */}
      <div className="right-column">
        <div className="phone-shell">
          <div className="phone-inner">
            {/* Notch */}
            <div className="notch" />

            <div className="phone-screen">
              <div className="phone-header">
                <span className="pill">AI Storefront</span>
                <h2>{storefront.brand || "Your Brand"}</h2>
                <p>Tap to explore your AI tool stack.</p>
              </div>

              <div className="phone-cards">
                {(tools.length ? tools : ["AI Chat Assistant", "AI Resume Analyzer"])
                  .slice(0, 2)
                  .map((tool) => (
                    <div key={tool} className="phone-card">
                      <div className="phone-icon">✨</div>
                      <div className="phone-text">
                        <h4>{tool}</h4>
                        <p>Instant deployment • Stripe ready</p>
                      </div>
                    </div>
                  ))}
              </div>

              <button className="phone-cta">Open Storefront</button>
            </div>
          </div>

          {/* Reflection glow */}
          <div className="phone-glow" />
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          display: flex;
          gap: 40px;
          padding: 60px 40px;
          background: ${bg};
          color: ${textColor};
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
            "Inter", sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background orbs */
        .page::before,
        .page::after {
          content: "";
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          opacity: 0.3;
          pointer-events: none;
        }

        .page::before {
          width: 420px;
          height: 420px;
          background: rgba(99, 102, 241, 0.75);
          top: -120px;
          left: -80px;
        }

        .page::after {
          width: 420px;
          height: 420px;
          background: rgba(147, 51, 234, 0.6);
          bottom: -140px;
          right: -100px;
        }

        .left-column,
        .right-column {
          position: relative;
          z-index: 1;
        }

        .left-column {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .right-column {
          flex: 0.9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* HERO */
        .hero {
          background: radial-gradient(circle at top left, rgba(148, 163, 253, 0.2), transparent 45%),
            radial-gradient(circle at top right, rgba(244, 114, 182, 0.18), transparent 55%),
            rgba(15, 23, 42, 0.85);
          border-radius: 28px;
          padding: 32px 30px;
          border: 1px solid rgba(148, 163, 253, 0.3);
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(18px);
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #e5e7eb;
          background: linear-gradient(
            90deg,
            rgba(79, 70, 229, 0.9),
            rgba(236, 72, 153, 0.9)
          );
        }

        .badge::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #bbf7d0;
          box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.25);
        }

        .hero h1 {
          margin: 16px 0 10px;
          font-size: 34px;
          line-height: 1.1;
        }

        .subtitle {
          margin: 0;
          font-size: 15px;
          color: #cbd5f5;
        }

        .brand-name {
          color: ${accent};
          font-weight: 600;
        }

        .tags {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tag {
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 253, 0.45);
          color: #e5e7eb;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 20px;
        }

        .cta-primary {
          padding: 11px 18px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          background: ${accent};
          color: white;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.5);
        }

        .cta-primary:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        .cta-ghost {
          padding: 11px 18px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 253, 0.5);
          background: transparent;
          color: #e5e7eb;
          cursor: pointer;
          font-size: 14px;
        }

        .tiny-note {
          margin-top: 14px;
          font-size: 11px;
          color: #9ca3af;
        }

        /* DESKTOP GLASS PANEL */
        .desktop-wrapper {
          margin-top: 22px;
        }

        .desktop-glass {
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 253, 0.4);
          background: linear-gradient(
              145deg,
              rgba(15, 23, 42, 0.9),
              rgba(39, 39, 42, 0.96)
            );
          box-shadow: 0 26px 90px rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(18px);
          overflow: hidden;
        }

        .desktop-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          border-bottom: 1px solid rgba(55, 65, 81, 0.7);
          background: linear-gradient(
            90deg,
            rgba(15, 23, 42, 0.9),
            rgba(30, 64, 175, 0.9)
          );
        }

        .traffic-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
        }

        .dot-red {
          background: #f87171;
        }

        .dot-yellow {
          background: #facc15;
        }

        .dot-green {
          background: #4ade80;
        }

        .desktop-url {
          flex: 1;
          margin-left: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 11px;
          color: #e5e7eb;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 253, 0.4);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .desktop-body {
          padding: 20px 20px 22px;
        }

        .desktop-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 16px;
        }

        .desktop-title-row h2 {
          margin: 0 0 4px;
          font-size: 18px;
        }

        .desktop-sub {
          margin: 0;
          font-size: 12px;
          color: #9ca3af;
        }

        .desktop-cta {
          padding: 9px 16px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          background: ${headerGradient};
          color: white;
        }

        .desktop-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          margin-top: 4px;
        }

        .desktop-card {
          background: ${cardBg};
          border-radius: 14px;
          padding: 12px;
          border: 1px solid rgba(55, 65, 81, 0.8);
          box-shadow: ${cardShadow};
        }

        .icon-pill {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #facc15, #f97316);
          margin-bottom: 6px;
        }

        .icon-spark {
          font-size: 16px;
        }

        .desktop-card h3 {
          margin: 0 0 4px;
          font-size: 13px;
        }

        .desktop-card p {
          margin: 0 0 8px;
          font-size: 11px;
          color: #9ca3af;
        }

        .desktop-card-btn {
          padding: 7px 10px;
          font-size: 11px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 253, 0.7);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          cursor: pointer;
        }

        /* RIGHT: DARK iPHONE + GLASS */
        .phone-shell {
          position: relative;
          width: 270px;
          height: 540px;
          border-radius: 48px;
          background: radial-gradient(circle at top, #111827, #020617);
          padding: 10px;
          box-shadow:
            0 40px 80px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(15, 23, 42, 0.9),
            0 0 40px rgba(59, 130, 246, 0.5);
        }

        .phone-inner {
          width: 100%;
          height: 100%;
          border-radius: 38px;
          background: linear-gradient(145deg, #020617, #020617);
          padding: 10px 8px 14px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 253, 0.6);
        }

        .notch {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 22px;
          background: #020617;
          border-radius: 999px;
          box-shadow: 0 0 0 1px rgba(30, 64, 175, 0.5);
        }

        .phone-screen {
          position: relative;
          margin-top: 40px;
          width: 100%;
          height: calc(100% - 40px);
          border-radius: 30px;
          background: radial-gradient(circle at top, #1e293b, #020617 65%);
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .phone-header .pill {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #e5e7eb;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 253, 0.7);
        }

        .phone-header h2 {
          margin: 10px 0 4px;
          font-size: 15px;
          color: #e5e7eb;
        }

        .phone-header p {
          margin: 0;
          font-size: 11px;
          color: #9ca3af;
        }

        .phone-cards {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .phone-card {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 8px 10px;
          border-radius: 16px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(55, 65, 81, 0.9);
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.9);
        }

        .phone-icon {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background: radial-gradient(circle at top, #facc15, #f97316);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .phone-text h4 {
          margin: 0 0 2px;
          font-size: 12px;
          color: #e5e7eb;
        }

        .phone-text p {
          margin: 0;
          font-size: 10px;
          color: #9ca3af;
        }

        .phone-cta {
          margin-top: 12px;
          width: 100%;
          padding: 9px 0;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
          background: ${headerGradient};
          color: white;
          box-shadow: 0 18px 40px rgba(79, 70, 229, 0.8);
        }

        .phone-glow {
          position: absolute;
          inset: 0;
          border-radius: 48px;
          pointer-events: none;
          box-shadow:
            0 0 60px rgba(59, 130, 246, 0.4),
            0 0 80px rgba(147, 51, 234, 0.3);
          opacity: 0.5;
        }

        /* RESPONSIVE */
        @media (max-width: 1100px) {
          .page {
            flex-direction: column;
            padding: 32px 20px 60px;
          }

          .left-column {
            order: 1;
          }

          .right-column {
            order: 2;
          }

          .desktop-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .phone-shell {
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .desktop-grid {
            grid-template-columns: 1fr;
          }

          .page {
            padding: 24px 16px 40px;
          }

          .hero {
            padding: 24px 20px;
          }

          .hero h1 {
            font-size: 26px;
          }

          .desktop-title-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .desktop-cta {
            width: 100%;
            text-align: center;
          }

          .phone-shell {
            transform: scale(0.95);
          }
        }
      `}</style>
    </div>
  );
}

