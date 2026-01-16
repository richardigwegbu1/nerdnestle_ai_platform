import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <header className="nn-nav">
      <div className="nn-nav-inner">
        {/* LEFT — LOGO ONLY */}
        <Link href="/" className="nn-logo" aria-label="NerdNest AI Home">
          <Image
            src="/brand/nerdnest-wordmark.png"
            alt="NerdNest AI"
            width={240}
            height={48}
            priority
            // Prevent stretching/cropping and keep wordmark crisp
            style={{ width: "240px", height: "auto" }}
          />
        </Link>

        {/* RIGHT — NAVIGATION LINKS */}
        <nav className="nn-nav-links" aria-label="Primary navigation">
          <Link href="/" className="nn-nav-link">
            Home
          </Link>
          <Link href="/products" className="nn-nav-link">
            Products
          </Link>
          <Link href="/create-site" className="nn-nav-link">
            Create AI Storefront
          </Link>
          <Link href="/dashboard" className="nn-nav-link">
            Dashboard
          </Link>
          <Link href="/login" className="nn-nav-cta">
            Log in
          </Link>
        </nav>
      </div>

      <style jsx>{`
        .nn-nav {
          position: sticky;
          top: 0;
          z-index: 30;
          backdrop-filter: blur(10px);
          background: rgba(15, 23, 42, 0.85);
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }

        .nn-nav-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0.8rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem; /* prevents crowding between logo and links */
        }

        /* Ensure logo never gets clipped and stays far-left */
        .nn-logo {
          display: flex;
          align-items: center;
          flex: 0 0 auto;
          min-width: 240px; /* reserves space so links don’t crush the logo */
        }

        /* Links: allow wrapping on smaller widths instead of squeezing/cropping */
        .nn-nav-links {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1.5rem;
          flex: 1 1 auto;
          flex-wrap: wrap;
          row-gap: 0.75rem;
        }

        .nn-nav-link {
          color: rgba(203, 213, 245, 0.92);
          text-decoration: none;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .nn-nav-link:hover {
          color: #fff;
        }

        .nn-nav-cta {
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          color: white;
          font-size: 0.9rem;
          text-decoration: none;
          font-weight: 600;
          white-space: nowrap;
        }

        /* Mobile tuning */
        @media (max-width: 768px) {
          .nn-nav-inner {
            padding-inline: 1rem;
          }

          /* Allow the logo to shrink slightly on mobile */
          .nn-logo {
            min-width: 180px;
          }

          /* Reduce spacing and font size */
          .nn-nav-links {
            gap: 0.9rem;
          }

          .nn-nav-link,
          .nn-nav-cta {
            font-size: 0.82rem;
          }
        }

        /* Very small screens: stack links below the top row */
        @media (max-width: 520px) {
          .nn-nav-inner {
            flex-direction: column;
            align-items: stretch;
          }

          .nn-logo {
            min-width: 0;
            width: 100%;
          }

          .nn-nav-links {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </header>
  );
}

