// frontend/pages/tools/[slug].js

import Head from "next/head";
import { fetchPublicProduct } from "../../lib/api";
import { PRODUCTS } from "../../lib/products";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const product = await fetchPublicProduct(slug);

    // Optional: enrich with frontend metadata (badge, tagline, category, etc.)
    const meta = PRODUCTS.find((p) => p.slug === slug) || null;

    return {
      props: {
        product,
        meta,
        error: null,
      },
    };
  } catch (err) {
    console.error("Error fetching product:", err.message);

    // If the backend gave a 404, we translated that to an error already.
    // We can show a friendly error page instead of Next's 404 for now.
    return {
      props: {
        product: null,
        meta: null,
        error:
          "This tool is not available or could not be loaded. Please try again later.",
      },
    };
  }
}

export default function ToolDetailPage({ product, meta, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>Tool Not Available | NerdNest AI Marketplace</title>
        </Head>
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.errorCard}>
              <h1 style={styles.errorTitle}>Tool Unavailable</h1>
              <p style={styles.errorText}>{error}</p>
              <div style={styles.errorActions}>
                <button
                  type="button"
                  style={styles.secondaryButton}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.history.back();
                    }
                  }}
                >
                  ← Go Back
                </button>
                <a href="/products" style={styles.primaryLinkButton}>
                  Browse All Tools
                </a>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (!product) return null;

  const title = meta?.name || product.title || "AI Tool";
  const slug = product.slug;
  const status = product.status || meta?.status || "available";
  const price = product.price ?? meta?.priceMonthly ?? meta?.priceOnce ?? null;
  const tagline =
    meta?.tagline || "AI-powered automation to level up your workflow.";
  const category = meta?.category || "AI Tools";
  const level = meta?.level || "Beginner friendly";
  const badge = meta?.badge || null;
  const longDescription =
    meta?.longDescription ||
    product.description ||
    "This AI tool helps you automate tasks, serve your customers faster, and scale your business with smart automation.";

  const headlineCta = "Get this tool through NerdNest AI Marketplace";
  const commission = product.commission_pct ?? meta?.commission_pct ?? null;

  return (
    <>
      <Head>
        <title>{`${title} | NerdNest AI Marketplace`}</title>
        <meta
          name="description"
          content={tagline || "Discover AI tools on NerdNest AI Marketplace."}
        />
      </Head>

      <main style={styles.main}>
        <div style={styles.gradientOrb} />
        <div style={styles.container}>
          {/* Top nav-ish breadcrumb */}
          <header style={styles.header}>
            <div style={styles.breadcrumbs}>
              <a href="/" style={styles.breadcrumbLink}>
                NerdNest AI Marketplace
              </a>
              <span style={styles.breadcrumbSeparator}>›</span>
              <a href="/products" style={styles.breadcrumbLink}>
                Tools
              </a>
              <span style={styles.breadcrumbSeparator}>›</span>
              <span style={styles.breadcrumbCurrent}>{title}</span>
            </div>
            <button
              type="button"
              style={styles.secondaryButtonGhost}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.history.back();
                }
              }}
            >
              ← Back
            </button>
          </header>

          {/* Main layout */}
          <section style={styles.layout}>
            {/* Left: Tool content */}
            <div style={styles.leftColumn}>
              <div style={styles.titleRow}>
                <div>
                  <h1 style={styles.title}>{title}</h1>
                  {tagline && <p style={styles.tagline}>{tagline}</p>}
                </div>
                {badge && <span style={styles.badge}>{badge}</span>}
              </div>

              <div style={styles.metaRow}>
                <span style={styles.metaPill}>{category}</span>
                <span style={styles.metaPill}>Level: {level}</span>
                <span style={styles.metaPill}>
                  Status:{" "}
                  <span
                    style={{
                      color:
                        status === "available"
                          ? "#4ade80"
                          : status === "coming-soon"
                          ? "#f97316"
                          : "#f97373",
                    }}
                  >
                    {status}
                  </span>
                </span>
                {commission != null && (
                  <span style={styles.metaPill}>
                    Commission: <strong>{commission}%</strong>
                  </span>
                )}
              </div>

              <div style={styles.bodyCard}>
                <h2 style={styles.sectionTitle}>What this tool does</h2>
                <p style={styles.bodyText}>{longDescription}</p>

                {/* Optional feature bullets from meta */}
                {meta?.longDescription && meta?.shortDescription && (
                  <ul style={styles.featureList}>
                    <li style={styles.featureItem}>
                      <span style={styles.featureDot} />
                      <span>Designed for: {category}</span>
                    </li>
                    <li style={styles.featureItem}>
                      <span style={styles.featureDot} />
                      <span>{meta.shortDescription}</span>
                    </li>
                    <li style={styles.featureItem}>
                      <span style={styles.featureDot} />
                      <span>Perfect for creators, founders, and consultants.</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {/* Right: Pricing / CTA */}
            <aside style={styles.rightColumn}>
              <div style={styles.pricingCard}>
                <div style={styles.pricingHeader}>
                  <p style={styles.pricingLabel}>NerdNest Listing</p>
                  <p style={styles.pricingTitle}>{title}</p>
                  {price != null ? (
                    <p style={styles.pricingPrice}>
                      <span style={styles.currency}>$</span>
                      {price}
                      <span style={styles.per}> one-time</span>
                    </p>
                  ) : (
                    <p style={styles.pricingMuted}>Pricing coming soon</p>
                  )}
                </div>

                <ul style={styles.pricingList}>
                  <li style={styles.pricingItem}>
                    <span style={styles.checkDot} />
                    Full access to this AI tool once activated.
                  </li>
                  <li style={styles.pricingItem}>
                    <span style={styles.checkDot} />
                    Hosted and managed via NerdNest AI Marketplace.
                  </li>
                  <li style={styles.pricingItem}>
                    <span style={styles.checkDot} />
                    Future support for affiliate links & payouts.
                  </li>
                </ul>

                <button
                  type="button"
                  style={styles.primaryButton}
                  onClick={() => {
                    alert(
                      `In a later milestone, this will launch checkout or affiliate link for "${title}".`
                    );
                  }}
                >
                  Get This Tool
                </button>

                <p style={styles.smallNote}>
                  {headlineCta}
                  <br />
                  <span style={{ opacity: 0.7 }}>
                    (This call-to-action will be wired to Stripe / your preferred
                    checkout in a future milestone.)
                  </span>
                </p>
              </div>

              <div style={styles.nerdnestBadge}>
                <p style={styles.nerdnestLabel}>Powered by</p>
                <p style={styles.nerdnestBrand}>NerdNest AI Marketplace</p>
              </div>
            </aside>
          </section>
        </div>
      </main>
    </>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top, #111827 0, #020617 40%, #020617 100%)",
    color: "#f9fafb",
    padding: "32px 16px 48px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    position: "relative",
    overflow: "hidden",
  },
  gradientOrb: {
    position: "absolute",
    inset: "auto",
    top: "-120px",
    right: "-80px",
    width: "320px",
    height: "320px",
    background:
      "conic-gradient(from 140deg at 50% 50%, rgba(79,70,229,0.8), rgba(236,72,153,0.75), rgba(56,189,248,0.7), rgba(79,70,229,0.8))",
    filter: "blur(60px)",
    opacity: 0.35,
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    maxWidth: "1120px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  breadcrumbs: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "6px",
    fontSize: "0.85rem",
    color: "#9ca3af",
  },
  breadcrumbLink: {
    color: "#e5e7eb",
    textDecoration: "none",
  },
  breadcrumbSeparator: {
    opacity: 0.6,
  },
  breadcrumbCurrent: {
    color: "#a5b4fc",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1.4fr)",
    gap: "24px",
  },
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  titleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    margin: 0,
    letterSpacing: "-0.03em",
  },
  tagline: {
    marginTop: "6px",
    marginBottom: 0,
    fontSize: "0.98rem",
    color: "#d1d5db",
  },
  badge: {
    alignSelf: "flex-start",
    padding: "4px 10px",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(16,185,129,0.35))",
    border: "1px solid rgba(52,211,153,0.7)",
    color: "#bbf7d0",
    fontSize: "0.75rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  metaPill: {
    padding: "4px 10px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.4)",
    fontSize: "0.75rem",
    color: "#e5e7eb",
  },
  bodyCard: {
    marginTop: "8px",
    borderRadius: "18px",
    padding: "18px 18px 20px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.9), rgba(17,24,39,1))",
    border: "1px solid rgba(148,163,184,0.4)",
    boxShadow: "0 18px 40px rgba(15,23,42,0.7)",
  },
  sectionTitle: {
    fontSize: "1.05rem",
    fontWeight: 600,
    margin: "0 0 8px",
    color: "#e5e7eb",
  },
  bodyText: {
    fontSize: "0.93rem",
    lineHeight: 1.6,
    color: "#d1d5db",
    margin: 0,
  },
  featureList: {
    listStyle: "none",
    margin: "14px 0 0",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    color: "#e5e7eb",
  },
  featureDot: {
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle, #4f46e5 0%, #a855f7 40%, #22c55e 100%)",
    flexShrink: 0,
  },
  pricingCard: {
    borderRadius: "20px",
    padding: "18px 18px 20px",
    background:
      "linear-gradient(150deg, rgba(15,23,42,0.95), rgba(30,64,175,0.9))",
    border: "1px solid rgba(129,140,248,0.7)",
    boxShadow: "0 20px 45px rgba(15,23,42,0.9)",
  },
  pricingHeader: {
    marginBottom: "14px",
  },
  pricingLabel: {
    margin: 0,
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#a5b4fc",
  },
  pricingTitle: {
    margin: "4px 0 2px",
    fontSize: "1.05rem",
    fontWeight: 600,
  },
  pricingPrice: {
    margin: "4px 0 0",
    fontSize: "1.6rem",
    fontWeight: 700,
  },
  currency: {
    fontSize: "1rem",
    opacity: 0.85,
    marginRight: "2px",
  },
  per: {
    fontSize: "0.85rem",
    fontWeight: 400,
    opacity: 0.8,
    marginLeft: "4px",
  },
  pricingMuted: {
    margin: "6px 0 0",
    fontSize: "0.9rem",
    color: "#e5e7eb",
    opacity: 0.8,
  },
  pricingList: {
    listStyle: "none",
    margin: "14px 0 0",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  pricingItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.9rem",
    color: "#e5e7eb",
  },
  checkDot: {
    width: "9px",
    height: "9px",
    borderRadius: "999px",
    border: "2px solid #22c55e",
    boxShadow: "0 0 0 2px rgba(34,197,94,0.25)",
    flexShrink: 0,
  },
  primaryButton: {
    marginTop: "16px",
    width: "100%",
    border: "none",
    cursor: "pointer",
    padding: "10px 16px",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg, #4f46e5, #6366f1, #22c55e, #14b8a6)",
    color: "#f9fafb",
    fontSize: "0.95rem",
    fontWeight: 600,
    boxShadow: "0 14px 30px rgba(15,23,42,0.9)",
    transition: "transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s",
  },
  secondaryButton: {
    border: "1px solid rgba(148,163,184,0.5)",
    background: "transparent",
    color: "#e5e7eb",
    padding: "6px 12px",
    fontSize: "0.85rem",
    borderRadius: "999px",
    cursor: "pointer",
  },
  secondaryButtonGhost: {
    border: "1px solid rgba(148,163,184,0.4)",
    background: "rgba(15,23,42,0.7)",
    color: "#e5e7eb",
    padding: "6px 12px",
    fontSize: "0.85rem",
    borderRadius: "999px",
    cursor: "pointer",
  },
  primaryLinkButton: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(129,140,248,0.8)",
    background: "rgba(15,23,42,0.85)",
    color: "#e5e7eb",
    fontSize: "0.85rem",
    textDecoration: "none",
  },
  smallNote: {
    marginTop: "10px",
    fontSize: "0.78rem",
    color: "#e5e7eb",
    opacity: 0.9,
  },
  nerdnestBadge: {
    marginTop: "8px",
    borderRadius: "14px",
    padding: "10px 14px",
    background: "rgba(15,23,42,0.85)",
    border: "1px dashed rgba(148,163,184,0.7)",
  },
  nerdnestLabel: {
    margin: 0,
    fontSize: "0.75rem",
    color: "#9ca3af",
  },
  nerdnestBrand: {
    margin: "2px 0 0",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#a5b4fc",
  },
  errorCard: {
    maxWidth: "480px",
    margin: "80px auto 0",
    padding: "22px 20px",
    borderRadius: "18px",
    background:
      "linear-gradient(140deg, rgba(15,23,42,0.95), rgba(127,29,29,0.9))",
    border: "1px solid rgba(248,113,113,0.7)",
    textAlign: "left",
  },
  errorTitle: {
    margin: "0 0 8px",
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  errorText: {
    margin: "0 0 14px",
    fontSize: "0.9rem",
    color: "#fee2e2",
  },
  errorActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
};

// Simple hover styles for primaryButton (handled in JS since no CSS file)
if (typeof window !== "undefined") {
  // no-op – Next.js will ignore this on server side
}

