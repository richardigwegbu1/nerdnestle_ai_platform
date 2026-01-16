// frontend/pages/storefront/[id].js

import Head from "next/head";
import {
  fetchStorefrontPublic,
  fetchPublicProduct,
} from "../../lib/api";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    // 1. Fetch storefront metadata
    const storefront = await fetchStorefrontPublic(id);

    // 2. Expand storefront.tools array → load each product by slug
    const expandedTools = [];

    if (Array.isArray(storefront.tools)) {
      for (const slug of storefront.tools) {
        try {
          const product = await fetchPublicProduct(slug);
          if (product?.product) {
            expandedTools.push(product.product);
          }
        } catch (e) {
          console.error(`Failed loading product: ${slug}`, e.message);
        }
      }
    }

    storefront.expandedTools = expandedTools;

    return {
      props: {
        storefront,
        error: null,
      },
    };
  } catch (err) {
    console.error("Error fetching storefront:", err.message);

    if (err.message.includes("404")) {
      return { notFound: true };
    }

    return {
      props: {
        storefront: null,
        error: "This storefront is currently unavailable.",
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

  const { brand, theme, created_at, expandedTools = [] } = storefront;

  return (
    <>
      <Head>
        <title>{brand ? `${brand} | NerdNest AI Store` : "NerdNest AI Store"}</title>
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

          {/* ------------------------------------------------- */}
          {/* PRODUCT GRID */}
          {/* ------------------------------------------------- */}
          {expandedTools.length === 0 ? (
            <p style={styles.emptyText}>This storefront does not have any tools yet.</p>
          ) : (
            <section>
              <h2 style={styles.sectionTitle}>Available Tools</h2>

              <div style={styles.toolGrid}>
                {expandedTools.map((tool) => (
                  <article key={tool.slug} style={styles.toolCard}>
                    <div style={styles.toolHeader}>
                      <h3 style={styles.toolName}>{tool.title}</h3>
                      {tool.status && <span style={styles.badge}>{tool.status}</span>}
                    </div>

                    <p style={styles.toolDescription}>{tool.description}</p>

                    <div style={styles.toolMeta}>
                      <span style={styles.metaPill}>${tool.price}</span>
                      <span style={styles.metaPill}>{tool.commission_pct}% commission</span>
                    </div>

                    <div style={styles.toolFooter}>
                      <a
                        href={`/products/${tool.slug}`}
                        style={styles.primaryButton}
                      >
                        View Tool
                      </a>
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

// ------------------------------------------------------------
// INLINE STYLES (Same structure as earlier but updated)
// ------------------------------------------------------------
const styles = {
  main: {
    padding: "40px 0",
    background: "#f7f7f9",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "0 20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
  },
  brand: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "14px",
    color: "#666",
  },
  backLink: {
    fontSize: "14px",
    color: "#0070f3",
    textDecoration: "none",
    marginTop: "8px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  toolGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "22px",
  },
  toolCard: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  toolHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  toolName: {
    fontSize: "18px",
    fontWeight: "600",
  },
  badge: {
    background: "#10b981",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    height: "fit-content",
  },
  toolDescription: {
    fontSize: "14px",
    color: "#555",
  },
  toolMeta: {
    marginTop: "10px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  metaPill: {
    background: "#eef2ff",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
  },
  toolFooter: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryButton: {
    padding: "10px 16px",
    background: "#4f46e5",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
  },
  emptyText: {
    padding: "20px 0",
    color: "#777",
  },
  footer: {
    marginTop: "40px",
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid #ddd",
  },
  footerText: {
    color: "#777",
  },
};

