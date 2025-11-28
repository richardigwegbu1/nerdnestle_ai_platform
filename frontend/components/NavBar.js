import Link from "next/link";

export default function NavBar() {
  return (
    <header className="nn-nav">
      <div className="nn-nav-left">
        <div className="nn-nav-logo" />
        <div className="nn-nav-title">NerdNest AI</div>
      </div>

      <nav className="nn-nav-links">
        <Link href="/">
          <button className="nn-pill-link">Home</button>
        </Link>
        <Link href="/products">
          <button className="nn-pill-link">Products</button>
        </Link>
        <Link href="/create-site">
          <button className="nn-pill-link">Create AI Storefront</button>
        </Link>
        <Link href="/dashboard">
          <button className="nn-pill-link">Dashboard</button>
        </Link>
        <Link href="/login">
          <button className="nn-btn nn-btn-outline">Log in</button>
        </Link>
      </nav>
    </header>
  );
}

