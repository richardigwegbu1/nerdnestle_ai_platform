import { useEffect, useState } from "react";
import Link from "next/link";
import { getToken } from "../lib/auth";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [storefront, setStorefront] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getToken();

    if (!token) {
      // Redirect if not logged in
      window.location.href = "/login";
      return;
    }

    async function fetchStorefront() {
      try {
        const res = await fetch("https://api.nerdnest.ai/api/storefront/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.detail || "Failed to load dashboard");
        } else {
          setStorefront(data.storefronts || []);
        }
      } catch (err) {
        setError("Network error loading dashboard");
      }

      setLoading(false);
    }

    fetchStorefront();
  }, []);

  if (loading) {
    return (
      <main className="nn-main">
        <div style={{ padding: 40, textAlign: "center" }}>Loading...</div>
      </main>
    );
  }

  return (
    <main className="nn-main">
      <div className="nn-dashboard-container">
        {/* Sidebar */}
        <aside className="nn-sidebar">
          <div className="nn-sidebar-title">NerdNest AI</div>

          <div style={{ marginBottom: 18 }}>
            <div className="nn-sidebar-section-label">Overview</div>
            <div className="nn-sidebar-nav">
              <div className="nn-sidebar-link nn-sidebar-link-active">
                <span>Dashboard</span>
                <span>•</span>
              </div>

              <Link href="/products">
                <div className="nn-sidebar-link">
                  <span>Products</span>
                </div>
              </Link>

              <Link href="/create-site">
                <div className="nn-sidebar-link">
                  <span>Storefront</span>
                </div>
              </Link>
            </div>
          </div>

          <div>
            <div className="nn-sidebar-section-label">Account</div>
            <div className="nn-sidebar-nav">
              <div className="nn-sidebar-link">
                <span>Payouts</span>
              </div>
              <div className="nn-sidebar-link">
                <span>Settings</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="nn-dashboard-main">
          <div className="nn-dashboard-header-row">
            <div>
              <div className="nn-dashboard-title">Dashboard</div>
              <div className="nn-dashboard-subtitle">
                Your NerdNest earnings, storefront analytics, and stats.
              </div>
            </div>

            <Link href="/products">
              <button className="nn-btn nn-btn-primary">View Products</button>
            </Link>
          </div>

          {/* Storefront Summary */}
          <div className="nn-dashboard-grid">
            <div className="nn-dashboard-card">
              <h3>Your Storefronts</h3>

              {storefront?.length === 0 ? (
                <p style={{ fontSize: 13, color: "#9ca3af" }}>
                  You haven't created any storefront yet.
                </p>
              ) : (
                storefront.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px solid #eee",
                      fontSize: 13,
                    }}
                  >
                    <strong>{s.brand}</strong>
                    <div style={{ color: "#9ca3af", fontSize: 12 }}>
                      {s.tools.length} tools • {s.theme} theme
                    </div>
                  </div>
                ))
              )}

              <Link href="/create-site">
                <button
                  className="nn-btn nn-btn-outline"
                  style={{ marginTop: 12 }}
                >
                  Create New Storefront →
                </button>
              </Link>
            </div>

            <div className="nn-dashboard-card">
              <h3>Account Status</h3>

              <p style={{ fontSize: 13, color: "#9ca3af" }}>
                Your account is active and ready to earn commissions.
              </p>

              {error && (
                <p style={{ color: "red", marginTop: 10, fontSize: 12 }}>
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Overview Cards */}
          <div className="nn-dashboard-grid" style={{ marginTop: 18 }}>
            <div className="nn-dashboard-card">
              <h3>Sales Overview</h3>
              <div className="nn-stat-row">
                <span className="nn-stat-label">Total revenue</span>
                <span className="nn-stat-value">$0.00</span>
              </div>
              <div className="nn-stat-row">
                <span className="nn-stat-label">Total clicks</span>
                <span className="nn-stat-value">0</span>
              </div>
              <div className="nn-stat-row">
                <span className="nn-stat-label">Conversions</span>
                <span className="nn-stat-value">0</span>
              </div>
            </div>

            <div className="nn-dashboard-card">
              <h3>Next Payout</h3>
              <div className="nn-stat-row">
                <span className="nn-stat-label">Scheduled date</span>
                <span className="nn-stat-value">TBD</span>
              </div>
              <div className="nn-stat-row">
                <span className="nn-stat-label">Amount</span>
                <span className="nn-stat-value">$0.00</span>
              </div>
            </div>
          </div>

          <p
            style={{
              marginTop: 24,
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            Your NerdNest Dashboard will automatically update as new analytics go
            live.
          </p>
        </section>
      </div>
    </main>
  );
}

