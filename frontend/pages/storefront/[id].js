// frontend/pages/storefront/[id].js

import Head from "next/head";
import { fetchStorefrontPublic } from "../../lib/api";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const storefront = await fetchStorefrontPublic(id);

    // If API returns null/undefined, treat as 404
    if (!storefront) {
      return { notFound: true };
    }

    return {
      props: {
        storefront,
        error: null,
      },
    };
  } catch (err) {
    console.error("Error fetching storefront:", err);

    // If backend returns 404, surface Next.js 404 page
    if (err.message && err.message.includes("404")) {
      return { notFound: true };
    }

    return {
      props: {
        storefront: null,
        error: "Unable to load this storefront. Please try again later.",
      },
    };
  }
}

export default function StorefrontPage({ storefront, error }) {
  if (error) {
    return (
      <>
        <Head>
          <title>NerdNest AI Storefront</title>
        </Head>
        <main style={styles.main}>
          <div style={styles.container}>
            <h1 style={styles.brand}>Storefront Unavailable</h1>
            <p>{error}</p>
            <a href="/" style={styles.backLink}>
              ← Back to NerdNest
            </a>
          </div>
        </main>
      </>
    );
  }

  if (!storefront) return null;

  const { brand, theme, tools = [], created_at } = storefront;

  return (
    <>
      <Head>
        <title>
          {brand ? `${brand} | NerdNest AI Store` : "NerdNest AI Store"}
        </title>
        <meta
          name="description"
          content={
            brand
              ? `Browse AI tools from ${brand} on the NerdNest AI Marketplace.`
              : "Browse AI tools on the NerdNest AI Marketplace."
          }
        />
      </Head>

      <main style={styles.main} data-theme={theme || "default"}>
        <div style={styles.container}>
          <header style={styles.header}>
            <div>
              <h1 style={styles.brand}>{brand || "NerdNest AI Storefront"}</h1>

              {theme && (
                <p style={styles.subText}>
                  Theme: <strong>{theme}</strong>
                </p>
              )}

              {created_at && (
                <p style={styles.subText}>
                  Created:{" "}
                  {new Date(created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            <a href="/" style={styles.backLink}>
              ← Back to NerdNest
            </a>
          </header>

          {tools.length === 0 ? (
            <p style={styles.emptyText}>
              This storefront does not have any tools yet.
            </p>
          ) : (
            <section>
              <h2 style={styles.sectionTitle}>Featured Tools</h2>

              <div style={styles.toolGrid}>
                {tools.map((tool) => (
                  <article key={tool.slug || tool.id} style={styles.toolCard}>
                    <div style={styles.toolHeader}>
                      <h3 style={styles.toolName}>{tool.name}</h3>
                      {tool.badge && (
                        <span style={styles.badge}>{tool.badge}</span>
                      )}
                    </div>

                    {tool.tagline && (
                      <p style={styles.toolTagline}>{tool.tagline}</p>
                    )}

                    {tool.shortDescription && (
                      <p style={styles.toolDescription}>
                        {tool.shortDescription}
                      </p>
                    )}

                    <div style={styles.toolMeta}>
                      {tool.category && (
                        <span style={styles.metaPill}>{tool.category}</span>
                      )}
                      {tool.level && (
                        <span style={styles.metaPill}>{tool.level}</span>
                      )}
                      {tool.status && (
                        <span style={styles.metaPill}>{tool.status}</span>
                      )}
                    </div>

                    <div style={styles.toolFooter}>
                      <div style={styles.pricing}>
                        {tool.priceMonthly ? (
                          <span style={styles.price}>
                            ${tool.priceMonthly}/mo
                          </span>
                        ) : tool.priceOnce ? (
                          <span style={styles.price}>
                            ${tool.priceOnce} one-time
                          </span>
                        ) : (
                          <span style={styles.priceMuted}>Pricing TBA</span>
                        )}
                      </div>

                      <button
                        type="button"
                        style={styles.primaryButton}
                        onClick={() =>
                          alert(
                            `In Milestone 3, this will take users to the detail page for "${tool.name}".`
                          )
                        }
                      >
                        View Tool
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          <footer style={styles.footer}>
            <p style={styles.footerText}>
              Powered by <strong>NerdNest AI Marketplace</strong>
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}

// styles – same as your original, included fully for safety
const styles = {
  main: {
    minHeight: "100vh",
    background: "#050816",
    color: "#f9fafb",
    padding: "32px 16px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  container: {
    maxWidth: "1120px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "32px",
  },
  brand: {
    fontSize: "2rem",
    fontWeight: 700,
    margin: 0,
  },
  subText: {
    margin: "4px 0",
    color: "#9ca3af",
    fontSize: "0.9rem",
  },
  backLink: {
    fontSize: "0.9rem",
    color: "#a5b4fc",
    textDecoration: "none",
    border: "1px solid #4f46e5",
    padding: "6px 10px",
    borderRadius: "999px",
  },
  emptyText: {
    marginTop: "24px",
    color: "#9ca3af",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: "8px 0 16px",
  },
  toolGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
  toolCard: {
    background:
      "linear-gradient(135deg, rgba(79,70,229,0.2), rgba(17,24,39,0.95))",
    borderRadius: "16px",
    padding: "16px",
    border: "1px solid rgba(148,163,184,0.3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "8px",
  },
  toolHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },
  toolName: {
    margin: 0,
    fontSize: "1.1rem",
    fontWeight: 600,
  },
  badge: {
    fontSize: "0.75rem",
    padding: "2px 8px",
    borderRadius: "999px",
    background: "#22c55e",
    color: "#022c22",
    fontWeight: 600,
  },
  toolTagline: {
    margin: "4px 0",
    fontSize: "0.95rem",
    color: "#e5e7eb",
  },
  toolDescription: {
    margin: "4px 0 0",
    fontSize: "0.85rem",
    color: "#9ca3af",
  },
  toolMeta: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "8px",
  },
  metaPill: {
    fontSize: "0.7rem",
    padding: "3px 8px",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.5)",
    color: "#e5e7eb",
  },
  toolFooter: {
    marginTop: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },
  pricing: {
    fontSize: "0.9rem",
  },
  price: {
    fontWeight: 700,
  },
  priceMuted: {
    color: "#9ca3af",
    fontSize: "0.85rem",
  },
  primaryButton: {
    border: "none",
    cursor: "pointer",
    padding: "8px 14px",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg, #4f46e5, #6366f1, #22c55e)",
    color: "#f9fafb",
    fontSize: "0.85rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
  },
  footerText: {
    color: "#6b7280",
    fontSize: "0.85rem",
  },
};

