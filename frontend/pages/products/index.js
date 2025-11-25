import Link from "next/link";

export default function Products() {
  const products = [
    {
      slug: "ai-chat-assistant",
      name: "AI Chat Assistant",
      description: "A GPT-powered chat assistant that you can embed into websites.",
    },
    {
      slug: "ai-resume-analyzer",
      name: "AI Resume Analyzer",
      description: "Analyze resumes and generate actionable job-fit reports.",
    },
    {
      slug: "ai-customer-support-assistant",
      name: "AI Support Assistant",
      description: "Automate customer support with intelligent AI responses.",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">AI Tools Marketplace</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="p-6 bg-white rounded-xl shadow hover:shadow-xl border transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-4 text-indigo-600 font-medium">View Details →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

