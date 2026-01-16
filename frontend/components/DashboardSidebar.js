// frontend/components/DashboardSidebar.js
import Link from "next/link";
import Image from "next/image";

export default function DashboardSidebar({ active = "dashboard" }) {
  return (
    <aside className="nn-dash-sidebar">
      {/* Logo + brand */}
      <div className="nn-dash-logo">
        <Link href="/dashboard" className="nn-dash-logo-link">
          <div className="nn-dash-logo-mark">
            <Image
              src="/nerdnest-logo.png"
              alt="NerdNest AI Logo"
              width={32}
              height={32}
            />
          </div>
          <div className="nn-dash-logo-text">
            <span className="nn-dash-brand">NerdNest AI</span>
            <span className="nn-dash-sub">Creator Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="nn-dash-nav">
        <DashboardLink href="/dashboard" label="Dashboard" active={active === "dashboard"} />
        <DashboardLink href="/storefront" label="Storefront" active={active === "storefront"} />
        <DashboardLink href="/products" label="Products" active={active === "products"} />
        <DashboardLink href="/payouts" label="Payouts" active={active === "payouts"} />
        <DashboardLink href="/settings" label="Settings" active={active === "settings"} />
      </nav>

      <style jsx>{`
        .nn-dash-sidebar {
          width: 240px;
          min-height: 100vh;
          padding: 1.25rem 1rem;
          background: radial-gradient(circle at 0 0, #020617, #020617 35%, #020617);
          border-right: 1px solid rgba(148, 163, 184, 0.25);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .nn-dash-logo-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .nn-dash-logo-mark {
          border-radius: 0.9rem;
          padding: 2px;
          background: radial-gradient(circle at 0 0, #22d3ee, #6366f1, #f97316);
        }

        .nn-dash-logo-mark :global(img) {
          border-radius: 0.8rem;
          background: #020617;
        }

        .nn-dash-brand {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
          color: #e5e7eb;
        }

        .nn-dash-sub {
          display: block;
          font-size: 0.75rem;
          color: #9ca3af;
        }

        .nn-dash-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        @media (max-width: 900px) {
          .nn-dash-sidebar {
            display: none; /* you can add a mobile menu later */
          }
        }
      `}</style>
    </aside>
  );
}

function DashboardLink({ href, label, active }) {
  return (
    <>
      <Link href={href} className={`nn-dash-link ${active ? "active" : ""}`}>
        {label}
      </Link>
      <style jsx>{`
        .nn-dash-link {
          display: block;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.88rem;
          color: #9ca3af;
          text-decoration: none;
        }

        .nn-dash-link:hover {
          background: rgba(148, 163, 184, 0.1);
          color: #e5e7eb;
        }

        .nn-dash-link.active {
          background: linear-gradient(90deg, #4f46e5, #ec4899);
          color: #f9fafb;
        }
      `}</style>
    </>
  );
}

