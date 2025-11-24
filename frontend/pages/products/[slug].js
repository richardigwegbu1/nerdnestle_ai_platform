// pages/products/[slug].js
import Link from "next/link";
import { PRODUCTS, getProductBySlug } from "../../lib/products";

export default function ProductDetailPage({ product }) {
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product not found
          </h1>
          <p className="text-gray-500 mb-4">
            The tool you’re looking for doesn’t exist or has been removed.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-800"
          >
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    category,
    badge,
    tagline,
    longDescription,
    priceMonthly,
    priceOnce,
    level,
    idealFor,
    features,
    useCases,
    faqs,
    status
  } = product;

  const priceLabel =
    priceMonthly != null
      ? `$${priceMonthly}/month`
      : priceOnce != null
      ? `$${priceOnce} one-time`
      : "Contact for pricing";

  const live = status === "available";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* TOP BAR */}
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-gray-900 hover:text-black"
          >
            NerdNest
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-600">
            <Link href="/products" className="hover:text-gray-900">
              Marketplace
            </Link>
            <Link href="/create-site" className="hover:text-gray-900">
              Create AI Site
            </Link>
            <Link href="/login" className="hover:text-gray-900">
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-3 py-1.5 rounded-lg bg-black text-white font-semibold hover:bg-gray-800"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-10 md:py-14 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
          {/* LEFT: Info */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-gray-500 mb-3">
              <span className="px-2 py-0.5 rounded-full bg-gray-100">
                {category}
              </span>
              {badge && (
                <span className="px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 font-semibold">
                  {badge}
                </span>
              )}
              {status === "coming_soon" && (
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">
                  Coming soon
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              {name}
            </h1>
            <p className="mt-3 text-lg text-gray-600">{tagline}</p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              {longDescription}
            </p>

            {idealFor && idealFor.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                  Ideal for
                </h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  {idealFor.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Pricing Card */}
          <aside className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 shadow-lg">
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
              Launch this tool
            </h3>
            <p className="mt-2 text-3xl font-extrabold">{priceLabel}</p>
            <p className="mt-1 text-xs text-gray-400">
              {level || "All skill levels"}
            </p>

            <p className="mt-4 text-sm text-gray-300">
              You can plug this into your NerdNest AI site, or use it as a
              standalone internal tool for your team or clients.
            </p>

            <div className="mt-6 space-y-3">
              {live ? (
                <>
                  <Link
                    href="/signup"
                    className="block w-full text-center px-4 py-3 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-gray-200"
                  >
                    Start with this tool
                  </Link>
                  <Link
                    href="/login"
                    className="block w-full text-center px-4 py-2.5 rounded-xl border border-gray-600 text-sm text-gray-100 hover:bg-gray-800"
                  >
                    Already a user? Log in
                  </Link>
                </>
              ) : (
                <>
                  <div className="text-sm text-amber-300 bg-amber-950/40 border border-amber-700/40 rounded-lg px-3 py-2">
                    This tool is in active development. Join the waitlist and be
                    notified when it goes live.
                  </div>
                  <Link
                    href="/signup"
                    className="block w-full text-center px-4 py-3 rounded-xl bg-white text-gray-900 font-semibold text-sm hover:bg-gray-200 mt-2"
                  >
                    Join waitlist
                  </Link>
                </>
              )}
            </div>

            {/* Affiliate hint */}
            <div className="mt-6 border-t border-gray-700 pt-4 text-xs text-gray-400">
              <p className="font-semibold text-gray-300 mb-1">
                Affiliate earnings (coming soon)
              </p>
              <p>
                Invite other creators to sell this tool and earn recurring
                commissions from every subscription.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* FEATURES & USE CASES */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            What you get
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Built on top of GPT-style AI engines and a production-grade backend.
          </p>
          <ul className="space-y-3">
            {features && features.length > 0 ? (
              features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="mt-1 h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-600">
                Detailed feature list coming soon.
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Real-world use cases
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Practical ways you or your clients can profit from this tool.
          </p>
          <ul className="space-y-3">
            {useCases && useCases.length > 0 ? (
              useCases.map((uc) => (
                <li
                  key={uc}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="mt-1 h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px]">
                    •
                  </span>
                  <span>{uc}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-600">
                Use cases will be added as we roll out the beta.
              </li>
            )}
          </ul>
        </div>
      </section>

      {/* AFFILIATE & INTEGRATION SECTION (STATIC FOR NOW) */}
      <section className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Built for monetization
            </h2>
            <p className="text-sm text-gray-600">
              Use this as a standalone tool in your NerdNest storefront, bundle
              it into your membership, or white-label it for clients. Stripe
              integration and affiliate tracking will allow you to earn
              recurring revenue per user.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Integrations roadmap
            </h2>
            <p className="text-sm text-gray-600">
              Our backend is designed to connect with Stripe, webhooks, and
              third-party apps. For technical users, you’ll be able to trigger
              external automations from tool usage events.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      {faqs && faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 py-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <details
                key={idx}
                className="group bg-white border border-gray-200 rounded-lg p-4"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="text-sm font-medium text-gray-900">
                    {item.q}
                  </span>
                  <span className="text-xs text-gray-500 group-open:hidden">
                    +
                  </span>
                  <span className="text-xs text-gray-500 hidden group-open:inline">
                    –
                  </span>
                </summary>
                <p className="mt-3 text-sm text-gray-700">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="py-8 text-center text-xs text-gray-500">
        <p>
          © {new Date().getFullYear()} NerdNest — AI tools for creators, tech
          pros, and businesses.
        </p>
        <p className="mt-2">
          <Link href="/products" className="underline">
            ← Back to all products
          </Link>
        </p>
      </footer>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = PRODUCTS.map((product) => ({
    params: { slug: product.slug }
  }));

  return {
    paths,
    fallback: false // 404 for unknown products
  };
}

export async function getStaticProps({ params }) {
  const product = getProductBySlug(params.slug);
  return {
    props: {
      product: product || null
    }
  };
}

