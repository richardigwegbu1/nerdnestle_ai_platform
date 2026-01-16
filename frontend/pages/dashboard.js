// frontend/pages/dashboard.js
import Head from "next/head";
import DashboardSidebar from "../components/DashboardSidebar";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>NerdNest AI – Dashboard</title>
      </Head>

      <main className="nn-dash-root">
        <DashboardSidebar active="dashboard" />

        <section className="nn-dash-main">
          <header className="nn-dash-header">
            <h1>Dashboard</h1>
            <p>Your NerdNest earnings, storefront analytics, and stats.</p>
          </header>

          {/* Cards row */}
          <div className="nn-dash-grid">
            <div className="nn-dash-card">
              <h2>Your Storefronts</h2>
              <p>You haven’t created any storefront yet.</p>
              <button
                className="nn-dash-btn"
                onClick={() => (window.location.href = "/create-site")}
              >
                Create New Storefront →
              </button>
            </div>

            <div className="nn-dash-card">
              <h2>Account Status</h2>
              <p>Your account is active and ready to earn commissions.</p>
              <p className="nn-dash-status-ok">Connected</p>
            </div>
          </div>

          {/* Sales row */}
          <div className="nn-dash-grid">
            <div className="nn-dash-card">
              <h2>Sales Overview</h2>
              <p>Total revenue: <strong>$0.00</strong></p>
              <p>Total clicks: <strong>0</strong></p>
              <p>Conversions: <strong>0</strong></p>
            </div>

            <div className="nn-dash-card">
              <h2>Next Payout</h2>
              <p>Scheduled date: <strong>TBD</strong></p>
              <p>Amount: <strong>$0.00</strong></p>
            </div>
          </div>
        </section>

        <style jsx>{`
          .nn-dash-root {
            display: flex;
            min-height: 100vh;
            background: radial-gradient(circle at top left, #020617, #020617 40%, #020617);
            color: #e5e7eb;
          }

          .nn-dash-main {
            flex: 1;
            padding: 1.5rem 2rem;
          }

          .nn-dash-header h1 {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
          }

          .nn-dash-header p {
            font-size: 0.9rem;
            color: #9ca3af;
          }

          .nn-dash-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .nn-dash-card {
            background: radial-gradient(circle at top left, rgba(148, 163, 184, 0.18), rgba(15, 23, 42, 0.95));
            border-radius: 1rem;
            border: 1px solid rgba(148, 163, 184, 0.25);
            padding: 1.2rem 1.3rem;
            box-shadow: 0 18px 45px rgba(15, 23, 42, 0.8);
          }

          .nn-dash-card h2 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }

          .nn-dash-card p {
            font-size: 0.9rem;
            color: #cbd5f5;
          }

          .nn-dash-status-ok {
            margin-top: 0.4rem;
            font-size: 0.8rem;
            font-weight: 600;
            color: #22c55e;
          }

          .nn-dash-btn {
            margin-top: 0.75rem;
            padding: 0.5rem 0.9rem;
            border-radius: 999px;
            border: none;
            background: linear-gradient(90deg, #6366f1, #ec4899);
            color: white;
            font-size: 0.85rem;
            cursor: pointer;
          }

          .nn-dash-btn:hover {
            opacity: 0.9;
          }

          @media (max-width: 900px) {
            .nn-dash-main {
              padding: 1rem;
            }
          }
        `}</style>
      </main>
    </>
  );
}

