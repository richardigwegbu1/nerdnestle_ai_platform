import Link from "next/link";
import NavBar from "../components/NavBar";
import { PRODUCTS } from "../lib/products";

export default function Home() {
  const popular = PRODUCTS.slice(0, 3);

  return (
    <>
      <NavBar />
      <main className="nn-main">
        <section className="nn-page-width">
          <div className="nn-hero-card">
            <div className="nn-hero-badge">
              <span>New</span>
              <span>AI Tools Marketplace</span>
            </div>

            <h1 className="nn-hero-heading">NerdNest AI Marketplace</h1>

            <p className="nn-hero-text">
              Launch AI-powered tools, automation agents, and intelligent
              services. Earn commissions, sell your own tools, and deploy apps
              in minutes — all powered by NerdNest AI.
            </p>

            <div className="nn-hero-actions">
              <Link href="/products">
                <button className="nn-btn nn-btn-primary">View Products</button>
              </Link>
              <Link href="/create-site">
                <button className="nn-btn nn-btn-outline">
                  Create AI Storefront
                </button>
              </Link>
            </div>
          </div>

          <div style={{ marginTop: 36 }}>
            <div className="nn-section-heading">Popular AI Tools</div>
            <div className="nn-section-caption">
              Start with one of our proven tools and plug it into your
              storefront.
            </div>

            <div className="nn-card-grid">
              {popular.map((product) => (
                <article key={product.id} className="nn-card">
                  <div className="nn-card-header-row">
                    <div className="nn-card-title">{product.name}</div>
                    {product.badge && (
                      <span className="nn-pill">{product.badge}</span>
                    )}
                  </div>

                  <div className="nn-card-body">
                    {product.shortDescription ||
                      product.tagline ||
                      "Plug-and-play AI automation for your workflow."}
                  </div>

                  <div className="nn-card-footer">
                    <span className="nn-price-pill">
                      {product.priceMonthly
                        ? `$${product.priceMonthly}/month`
                        : product.priceOnce
                        ? `$${product.priceOnce} one-time`
                        : "Custom pricing"}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <button className="nn-btn nn-btn-outline">
                        Learn More →
                      </button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

