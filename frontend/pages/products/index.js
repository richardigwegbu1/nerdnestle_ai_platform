import Link from "next/link";
import NavBar from "../../components/NavBar";
import { PRODUCTS } from "../../lib/products";

export default function ProductsPage() {
  return (
    <>
      <NavBar />
      <main className="nn-main">
        <section className="nn-page-width">
          <h1 style={{ fontSize: 28, marginBottom: 6, textAlign: "center" }}>
            AI Tools Marketplace
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: 14,
              maxWidth: 560,
              margin: "0 auto 22px",
            }}
          >
            Explore powerful AI tools built for businesses, creators, and
            professionals.
          </p>

          <div className="nn-card-grid">
            {PRODUCTS.map((product) => (
              <article key={product.id} className="nn-card">
                <div className="nn-card-header-row">
                  <div className="nn-card-title">{product.name}</div>
                  {product.badge && (
                    <span className="nn-pill-soft">{product.badge}</span>
                  )}
                </div>

                {product.tagline && (
                  <p
                    style={{
                      fontSize: 13,
                      color: "#6b7280",
                      marginTop: 2,
                      marginBottom: 8,
                    }}
                  >
                    {product.tagline}
                  </p>
                )}

                <p className="nn-card-body">
                  {product.shortDescription || product.longDescription}
                </p>

                <div className="nn-card-footer">
                  <span className="nn-price-pill">
                    {product.priceMonthly
                      ? `$${product.priceMonthly}/month`
                      : product.priceOnce
                      ? `$${product.priceOnce} one-time`
                      : "Custom pricing"}
                  </span>
                  <Link href={`/products/${product.slug}`}>
                    <button className="nn-btn nn-btn-primary">
                      View Details →
                    </button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

