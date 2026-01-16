import { useRouter } from "next/router";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import { PRODUCTS } from "../../lib/products";

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <>
        <NavBar />
        <main className="nn-main">
          <section className="nn-page-width">
            <h1>Product not found</h1>
            <p style={{ color: "#6b7280", marginTop: 8 }}>
              We couldn’t find that AI tool. It may have been renamed or
              removed.
            </p>
            <p style={{ marginTop: 16 }}>
              <Link href="/products" className="nn-muted-link">
                ← Back to products
              </Link>
            </p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="nn-main">
        <section className="nn-product-layout">
          <article className="nn-product-main-card">
            <div className="nn-hero-badge">
              <span>AI Tool</span>
              {product.category && <span>{product.category}</span>}
            </div>
            <h1 style={{ fontSize: 26, margin: "16px 0 4px" }}>
              {product.name}
            </h1>
            {product.tagline && (
              <p className="nn-product-tagline">{product.tagline}</p>
            )}

            <p
              style={{
                fontSize: 14,
                color: "#4b5563",
                marginTop: 4,
                lineHeight: 1.6,
              }}
            >
              {product.longDescription || product.shortDescription}
            </p>
          </article>

          <aside className="nn-product-side-card">
            <div
              style={{
                fontSize: 13,
                color: "#4b5563",
                marginBottom: 12,
              }}
            >
              Pricing
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 24, fontWeight: 700 }}>
                {product.priceMonthly
                  ? `$${product.priceMonthly}`
                  : product.priceOnce
                  ? `$${product.priceOnce}`
                  : "Custom"}
              </span>
              <span style={{ fontSize: 13, color: "#6b7280" }}>
                {product.priceMonthly
                  ? "/month"
                  : product.priceOnce
                  ? " one-time"
                  : ""}
              </span>
            </div>

            <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 18 }}>
              You’ll configure billing and API keys inside the dashboard before
              going live.
            </p>

            <Link href="/dashboard">
              <button
                className="nn-btn nn-btn-primary"
                style={{ width: "100%", marginBottom: 10 }}
              >
                Go to Dashboard
              </button>
            </Link>

            <Link href="/products" className="nn-muted-link">
              ← Back to all tools
            </Link>
          </aside>
        </section>
      </main>
    </>
  );
}

