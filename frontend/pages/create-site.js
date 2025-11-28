// pages/create-site.js
import { useState } from "react";
import { useRouter } from "next/router";
import { THEMES } from "../lib/themes";

/**
 * Detect a rough "type" of tool based on its name.
 * This will drive which NerdNest icon + description we use.
 */
function detectToolType(name) {
  const lower = name.toLowerCase();

  if (lower.includes("chat") || lower.includes("assistant") || lower.includes("bot")) {
    return "chat";
  }
  if (lower.includes("resume") || lower.includes("cv") || lower.includes("job")) {
    return "resume";
  }
  if (lower.includes("voice") || lower.includes("audio") || lower.includes("podcast")) {
    return "voice";
  }
  if (lower.includes("video") || lower.includes("reel") || lower.includes("shorts")) {
    return "video";
  }
  if (lower.includes("image") || lower.includes("logo") || lower.includes("design")) {
    return "design";
  }
  if (lower.includes("email") || lower.includes("copy") || lower.includes("writer")) {
    return "copy";
  }
  if (lower.includes("analytics") || lower.includes("insight") || lower.includes("report")) {
    return "analytics";
  }
  return "generic";
}

/**
 * NerdNest-branded SVG icon pack.
 * Same style, same colors — different glyphs per tool type.
 */
function ToolIcon({ type }) {
  const gradientId = `nn-gradient-${type}`;

  // Shared NerdNest brand colors
  const teal = "#14b8a6";
  const purple = "#8b5cf6";

  return (
    <svg
      viewBox="0 0 48 48"
      className="tool-icon"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={teal} />
          <stop offset="100%" stopColor={purple} />
        </linearGradient>
      </defs>

      {/* Outer rounded container */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="14"
        fill="rgba(15,23,42,0.9)"
      />
      <rect
        x="4.5"
        y="4.5"
        width="39"
        height="39"
        rx="12.5"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        fill="transparent"
      />

      {/* Inner glyphs vary per type */}
      {type === "chat" && (
        <>
          <path
            d="M14 17c0-2 1.6-3.6 3.6-3.6h12.8c2 0 3.6 1.6 3.6 3.6v5.4c0 2-1.6 3.6-3.6 3.6H22l-3.5 3.4c-.6.6-1.5.1-1.5-.7V27"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="20" cy="20" r="1" fill="white" />
          <circle cx="24" cy="20" r="1" fill="white" />
          <circle cx="28" cy="20" r="1" fill="white" />
        </>
      )}

      {type === "resume" && (
        <>
          <rect
            x="15"
            y="11"
            width="18"
            height="26"
            rx="3"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
          />
          <circle cx="24" cy="17" r="3" fill={teal} />
          <line
            x1="19"
            y1="23"
            x2="29"
            y2="23"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="19"
            y1="27"
            x2="29"
            y2="27"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      )}

      {type === "voice" && (
        <>
          <rect
            x="18"
            y="13"
            width="12"
            height="18"
            rx="6"
            stroke={`url(#gradientId)`} // fallback, not critical
            strokeWidth="0"
            fill="none"
          />
          <path
            d="M19 18v4c0 2.8 2.2 5 5 5s5-2.2 5-5v-4"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 21c0 4 3.1 7 7 7s7-3 7-7"
            stroke={purple}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="24"
            y1="28"
            x2="24"
            y2="33"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      )}

      {type === "video" && (
        <>
          <rect
            x="13"
            y="15"
            width="22"
            height="16"
            rx="4"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
          />
          <polygon
            points="22,19 28,23 22,27"
            fill={teal}
          />
          <circle
            cx="18"
            cy="19"
            r="1"
            fill="white"
          />
        </>
      )}

      {type === "design" && (
        <>
          <circle
            cx="20"
            cy="20"
            r="4"
            fill={teal}
          />
          <rect
            x="24"
            y="24"
            width="8"
            height="8"
            rx="2"
            fill={purple}
          />
          <path
            d="M16 30c1.5-2 3.5-3 6-3 2.5 0 4.5 1 6 3"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {type === "copy" && (
        <>
          <rect
            x="15"
            y="13"
            width="18"
            height="22"
            rx="3"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="18"
            y1="18"
            x2="30"
            y2="18"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="22"
            x2="28"
            y2="22"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="26"
            x2="26"
            y2="26"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      )}

      {type === "analytics" && (
        <>
          <polyline
            points="15,28 20,22 25,26 31,18"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="22" r="1.6" fill={teal} />
          <circle cx="25" cy="26" r="1.6" fill={teal} />
          <circle cx="31" cy="18" r="1.6" fill={purple} />
          <rect
            x="16"
            y="30"
            width="2"
            height="4"
            rx="1"
            fill="white"
          />
          <rect
            x="22"
            y="28"
            width="2"
            height="6"
            rx="1"
            fill="white"
          />
          <rect
            x="28"
            y="26"
            width="2"
            height="8"
            rx="1"
            fill="white"
          />
        </>
      )}

      {type === "generic" && (
        <>
          <circle
            cx="24"
            cy="24"
            r="7"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2"
          />
          <path
            d="M24 18v12"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M18 24h12"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

/**
 * Auto-generate a short description based on tool type.
 */
function getToolDescription(name) {
  const type = detectToolType(name);

  switch (type) {
    case "chat":
      return "24/7 intelligent chat assistant trained on your content.";
    case "resume":
      return "Score resumes, match jobs, and optimize applications in seconds.";
    case "voice":
      return "Turn text into natural-sounding voice and audio content.";
    case "video":
      return "Generate engaging video content from scripts or prompts.";
    case "design":
      return "Create on-brand visuals, logos, and graphics with AI.";
    case "copy":
      return "Write high-converting emails, ads, and website copy.";
    case "analytics":
      return "Monitor performance and uncover insights with AI analytics.";
    default:
      return "Smart automation built to save you time and grow your revenue.";
  }
}

export default function CreateSite() {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [tools, setTools] = useState("");
  const [theme, setTheme] = useState("modern");

  const parsedTools = tools
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const selectedTheme = THEMES[theme] || THEMES.modern;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://nerdnest.ai/api/storefront/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand,
        tools: parsedTools,
        theme,
      }),
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/storefront/${data.storefront.id}`);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-wrapper">
        {/* LEFT: FORM */}
        <div className="form-card">
          <div className="brand-row">
            <img
              src="/nerdnest-logo.png"
              alt="NerdNest AI Marketplace"
              className="brand-logo"
            />
            <div>
              <h1>Create Your AI Storefront</h1>
              <p className="subtitle">
                Bundle your AI tools into a beautiful one-page microsite.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label>Brand or Project Name</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="ex: Richard AI Tools"
              required
            />

            <label>List of AI Tools</label>
            <textarea
              value={tools}
              onChange={(e) => setTools(e.target.value)}
              placeholder="Comma-separated, e.g. AI Chat Assistant, AI Resume Analyzer"
              required
            />

            <label>Choose Theme</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="modern">Modern</option>
              <option value="dark">Dark</option>
              <option value="neon">Neon</option>
              <option value="minimal">Minimal</option>
              <option value="royal">Royal Purple</option>
            </select>

            <button type="submit" className="btn-primary">
              Generate Storefront
            </button>
          </form>
        </div>

        {/* RIGHT: DESKTOP + MOBILE PREVIEW */}
        <div className="preview-column">
          <div className="preview-header-bar">
            <h2>Live Storefront Preview</h2>
            <span className="preview-note">
              Updates in real-time as you type
            </span>
          </div>

          <div className="preview-layout">
            {/* DESKTOP PREVIEW */}
            <div
              className="desktop-preview"
              style={{
                background: selectedTheme.background,
                color: selectedTheme.textColor,
              }}
            >
              <div
                className="preview-hero"
                style={{ background: selectedTheme.headerGradient }}
              >
                <div className="preview-hero-inner">
                  <div>
                    <p className="badge">AI Tool Bundle</p>
                    <h1>{brand || "Your AI Tool Brand"}</h1>
                    <p className="hero-sub">
                      {brand
                        ? "Your curated collection of AI tools in one clean storefront."
                        : "Showcase all your AI tools in one modern, shareable page."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="preview-tools-section">
                <div className="tools-header-row">
                  <h3>Included Tools</h3>
                  <span className="tools-count">
                    {parsedTools.length > 0
                      ? `${parsedTools.length} tools`
                      : "Add some tools to see them here"}
                  </span>
                </div>

                <div className="tools-grid">
                  {parsedTools.length === 0 && (
                    <>
                      {["AI Chat Assistant", "AI Resume Analyzer"].map(
                        (placeholder, idx) => {
                          const type = detectToolType(placeholder);
                          return (
                            <div
                              key={idx}
                              className="tool-card"
                              style={{
                                background: selectedTheme.cardBg,
                                boxShadow: selectedTheme.cardShadow,
                                borderColor: selectedTheme.accent,
                              }}
                            >
                              <div className="tool-header">
                                <div className="icon-wrap">
                                  <ToolIcon type={type} />
                                </div>
                                <div>
                                  <h4>{placeholder}</h4>
                                  <p className="tool-sub">
                                    {getToolDescription(placeholder)}
                                  </p>
                                </div>
                              </div>
                              <button
                                className="tool-btn"
                                style={{
                                  background: selectedTheme.accent,
                                }}
                              >
                                Learn more
                              </button>
                            </div>
                          );
                        }
                      )}
                    </>
                  )}

                  {parsedTools.map((toolName, idx) => {
                    const type = detectToolType(toolName);
                    return (
                      <div
                        key={idx}
                        className="tool-card"
                        style={{
                          background: selectedTheme.cardBg,
                          boxShadow: selectedTheme.cardShadow,
                          borderColor: selectedTheme.accent,
                        }}
                      >
                        <div className="tool-header">
                          <div className="icon-wrap">
                            <ToolIcon type={type} />
                          </div>
                          <div>
                            <h4>{toolName}</h4>
                            <p className="tool-sub">
                              {getToolDescription(toolName)}
                            </p>
                          </div>
                        </div>
                        <button
                          className="tool-btn"
                          style={{
                            background: selectedTheme.accent,
                          }}
                        >
                          Learn more
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MOBILE PREVIEW (iPhone-style) */}
            <div className="mobile-preview-wrapper">
              <div className="device-label">Mobile view</div>
              <div className="iphone-frame">
                <div className="iphone-notch" />
                <div className="iphone-screen">
                  <div
                    className="mobile-hero"
                    style={{
                      background: selectedTheme.headerGradient,
                    }}
                  >
                    <h3>{brand || "Your AI Brand"}</h3>
                    <p>
                      {parsedTools[0]
                        ? parsedTools[0]
                        : "Your AI tools in one link."}
                    </p>
                  </div>

                  <div className="mobile-tools">
                    {(parsedTools.length ? parsedTools : ["AI Chat Assistant", "AI Resume Analyzer"]).slice(0, 3).map(
                      (toolName, idx) => {
                        const type = detectToolType(toolName);
                        return (
                          <div key={idx} className="mobile-tool-row">
                            <div className="mobile-icon-small">
                              <ToolIcon type={type} />
                            </div>
                            <div className="mobile-text">
                              <div className="mobile-tool-name">
                                {toolName}
                              </div>
                              <div className="mobile-tool-desc">
                                {getToolDescription(toolName)}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className="iphone-home-bar" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .page-shell {
          min-height: 100vh;
          background: radial-gradient(circle at top, #020617, #020617 40%, #000);
          padding: 40px 30px;
          box-sizing: border-box;
        }

        .page-wrapper {
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }

        .form-card {
          width: 420px;
          padding: 32px 28px;
          background: rgba(15, 23, 42, 0.96);
          border-radius: 24px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: #e5e7eb;
        }

        .brand-row {
          display: flex;
          gap: 14px;
          align-items: center;
          margin-bottom: 18px;
        }

        .brand-logo {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          object-fit: cover;
          box-shadow: 0 10px 25px rgba(56, 189, 248, 0.4);
        }

        h1 {
          margin: 0;
          font-size: 22px;
          font-weight: 700;
        }

        .subtitle {
          margin: 4px 0 0 0;
          font-size: 13px;
          color: #9ca3af;
        }

        label {
          display: block;
          margin-top: 18px;
          margin-bottom: 6px;
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #9ca3af;
        }

        input,
        textarea,
        select {
          width: 100%;
          padding: 12px 13px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.5);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          font-size: 14px;
          outline: none;
        }

        input:focus,
        textarea:focus,
        select:focus {
          border-color: #22d3ee;
          box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.4);
        }

        textarea {
          height: 90px;
          resize: vertical;
        }

        .btn-primary {
          margin-top: 22px;
          width: 100%;
          padding: 13px 0;
          background: linear-gradient(to right, #22d3ee, #8b5cf6);
          color: white;
          font-size: 15px;
          font-weight: 600;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 18px 45px rgba(59, 130, 246, 0.6);
          transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 24px 60px rgba(59, 130, 246, 0.7);
          opacity: 0.96;
        }

        .preview-column {
          flex: 1;
          color: #e5e7eb;
        }

        .preview-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 12px;
        }

        .preview-header-bar h2 {
          margin: 0;
          font-size: 18px;
        }

        .preview-note {
          font-size: 12px;
          color: #9ca3af;
        }

        .preview-layout {
          display: flex;
          gap: 22px;
          align-items: stretch;
        }

        .desktop-preview {
          flex: 1.25;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.35);
          backdrop-filter: blur(12px);
        }

        .preview-hero {
          padding: 24px 26px;
        }

        .preview-hero-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .badge {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.6);
          color: #e5e7eb;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .preview-hero h1 {
          margin-top: 10px;
          font-size: 22px;
          color: #f9fafb;
        }

        .hero-sub {
          margin-top: 4px;
          font-size: 13px;
          color: rgba(241, 245, 249, 0.9);
          max-width: 420px;
        }

        .preview-tools-section {
          padding: 18px 20px 22px 20px;
        }

        .tools-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .tools-header-row h3 {
          margin: 0;
          font-size: 14px;
        }

        .tools-count {
          font-size: 12px;
          color: #6b7280;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
        }

        .tool-card {
          border-radius: 18px;
          padding: 14px;
          border: 1px solid;
          position: relative;
          overflow: hidden;
        }

        .tool-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top left, rgba(148, 163, 253, 0.25), transparent 55%);
          opacity: 0.7;
          pointer-events: none;
        }

        .tool-header {
          display: flex;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .icon-wrap {
          width: 46px;
          height: 46px;
          border-radius: 16px;
          background: radial-gradient(circle at top, rgba(15, 23, 42, 1), rgba(15, 23, 42, 0.85));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.9);
        }

        .tool-icon {
          width: 34px;
          height: 34px;
        }

        .tool-header h4 {
          margin: 0 0 4px 0;
          font-size: 14px;
        }

        .tool-sub {
          margin: 0;
          font-size: 12px;
          color: #6b7280;
        }

        .tool-btn {
          position: relative;
          z-index: 1;
          margin-top: 12px;
          padding: 8px 12px;
          border-radius: 999px;
          border: none;
          color: #f9fafb;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-preview-wrapper {
          flex: 0.8;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .device-label {
          font-size: 12px;
          color: #9ca3af;
        }

        .iphone-frame {
          width: 220px;
          height: 430px;
          border-radius: 38px;
          background: radial-gradient(circle at top left, #e5e7eb, #020617);
          padding: 7px;
          box-shadow: 0 30px 80px rgba(15, 23, 42, 1);
          position: relative;
        }

        .iphone-notch {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 92px;
          height: 18px;
          border-radius: 999px;
          background: #020617;
        }

        .iphone-screen {
          width: 100%;
          height: 100%;
          border-radius: 32px;
          background: #020617;
          overflow: hidden;
          padding-top: 34px;
          display: flex;
          flex-direction: column;
        }

        .iphone-home-bar {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.9);
        }

        .mobile-hero {
          padding: 12px 14px;
          color: #f9fafb;
        }

        .mobile-hero h3 {
          margin: 0 0 2px 0;
          font-size: 14px;
        }

        .mobile-hero p {
          margin: 0;
          font-size: 11px;
          opacity: 0.9;
        }

        .mobile-tools {
          padding: 8px 8px 40px 8px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mobile-tool-row {
          display: flex;
          gap: 8px;
          padding: 8px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.5);
        }

        .mobile-icon-small {
          width: 26px;
          height: 26px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .mobile-icon-small .tool-icon {
          width: 26px;
          height: 26px;
        }

        .mobile-text {
          flex: 1;
        }

        .mobile-tool-name {
          font-size: 11px;
          font-weight: 600;
        }

        .mobile-tool-desc {
          font-size: 10px;
          color: #9ca3af;
        }

        @media (max-width: 1024px) {
          .page-wrapper {
            flex-direction: column;
          }

          .form-card {
            width: 100%;
          }

          .preview-layout {
            flex-direction: column;
          }

          .mobile-preview-wrapper {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

