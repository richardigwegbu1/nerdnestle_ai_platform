export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-20">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          NerdNest AI Marketplace
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Build and launch AI-powered storefronts. Sell automation tools. Earn commissions.  
          <span className="font-semibold text-indigo-600">All powered by NerdNest AI.</span>
        </p>

        <div className="flex gap-4">
          <a
            href="/products"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
          >
            View Products
          </a>

          <a
            href="/create-site"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900"
          >
            Create AI Storefront
          </a>

          <a
            href="/dashboard"
            className="px-6 py-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Dashboard
          </a>
        </div>
      </section>

      {/* Products Preview */}
      <section className="bg-white py-16 px-8 border-t">
        <h2 className="text-center text-3xl font-bold mb-10">Popular AI Tools</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Card 1 */}
          <a
            href="/products/ai-chat-assistant"
            className="p-6 rounded-xl border shadow hover:shadow-lg transition bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
            <p className="text-gray-600">
              Build a GPT-powered chat assistant for websites or businesses.
            </p>
          </a>

          {/* Card 2 */}
          <a
            href="/products/ai-resume-analyzer"
            className="p-6 rounded-xl border shadow hover:shadow-lg transition bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">AI Resume Analyzer</h3>
            <p className="text-gray-600">
              Automatically analyze resumes and generate job match reports.
            </p>
          </a>

          {/* Card 3 */}
          <a
            href="/products/ai-customer-support-assistant"
            className="p-6 rounded-xl border shadow hover:shadow-lg transition bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">AI Support Assistant</h3>
            <p className="text-gray-600">
              Automate customer support 24/7 with intelligent responses.
            </p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} NerdNest AI — Powered by Unix Training Academy
      </footer>
    </main>
  );
}

