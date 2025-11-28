import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateSite() {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [toolsText, setToolsText] = useState("");
  const [theme, setTheme] = useState("neon");

  const tools = toolsText
    .split("\n")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  // --- THEME COLORS ---
  const THEMES = {
    neon: {
      header: "from-fuchsia-500 to-cyan-400",
      card: "bg-[#0A0F1F] border-cyan-400/30",
      badge: "bg-cyan-400 text-black",
      button: "bg-cyan-400 text-black hover:bg-cyan-300",
    },
    modern: {
      header: "from-indigo-500 to-blue-400",
      card: "bg-gray-900 border-indigo-400/30",
      badge: "bg-indigo-400 text-black",
      button: "bg-indigo-400 text-black hover:bg-indigo-300",
    },
    dark: {
      header: "from-gray-800 to-gray-900",
      card: "bg-gray-800 border-gray-700",
      badge: "bg-gray-600 text-white",
      button: "bg-gray-600 text-white hover:bg-gray-500",
    },
    minimal: {
      header: "from-white to-gray-200 text-black",
      card: "bg-white border-gray-300 text-black",
      badge: "bg-black text-white",
      button: "bg-black text-white hover:bg-gray-800",
    },
    royal: {
      header: "from-purple-700 to-purple-400",
      card: "bg-purple-900 border-purple-300",
      badge: "bg-purple-300 text-black",
      button: "bg-purple-300 text-black hover:bg-purple-200",
    },
  };

  const T = THEMES[theme];

  async function generateStorefront(e) {
    e.preventDefault();

    const res = await fetch("https://api.nerdnest.ai/api/storefront/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, tools, theme }),
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/storefront/${data.storefront.id}`);
    } else {
      alert("Error creating storefront");
    }
  }

  return (
    <div className="min-h-screen bg-[#05070F] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: FORM */}
        <div className="bg-[#0A0F1F] p-8 rounded-2xl border border-white/10 shadow-xl">
          <h1 className="text-3xl font-bold mb-6">
            Create Your AI Storefront
          </h1>

          <form onSubmit={generateStorefront}>
            <label className="block mb-2 font-semibold">Brand or Project Name</label>
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/30 border border-white/20"
              placeholder="My AI Tools"
              required
            />

            <label className="block mt-6 mb-2 font-semibold">List of AI Tools</label>
            <textarea
              value={toolsText}
              onChange={(e) => setToolsText(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/30 border border-white/20 h-32"
              placeholder="One tool per line"
              required
            />

            <label className="block mt-6 mb-2 font-semibold">Choose Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/30 border border-white/20"
            >
              <option value="neon">Neon</option>
              <option value="modern">Modern</option>
              <option value="dark">Dark</option>
              <option value="minimal">Minimal</option>
              <option value="royal">Royal Purple</option>
            </select>

            <button
              type="submit"
              className="w-full mt-8 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold shadow-lg"
            >
              Generate Storefront
            </button>
          </form>
        </div>

        {/* MIDDLE: DESKTOP PREVIEW */}
        <div className="col-span-1 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Live Storefront Preview</h2>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0F1F] shadow-2xl">
            <div className={`p-6 bg-gradient-to-r ${T.header}`}>
              <h1 className="text-2xl font-bold">{brand || "Your Brand"}</h1>
              <p className="opacity-80">
                Your curated AI tools, bundled in one place.
              </p>
            </div>

            <div className="p-6 space-y-4">
              {tools.length === 0 ? (
                <p className="text-white/60">Add tools to see preview…</p>
              ) : (
                tools.map((t, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border ${T.card}`}
                  >
                    <h3 className="font-semibold">{t}</h3>
                    <p className="text-sm opacity-70">
                      Smart automation built to save you time and grow your revenue.
                    </p>
                    <button className={`mt-3 px-4 py-2 rounded-lg text-sm ${T.button}`}>
                      Learn More
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: MOBILE PREVIEW */}
        <div className="hidden lg:block">
          <h2 className="text-xl font-semibold mb-4">Mobile View</h2>

          <div className="w-[320px] h-[640px] bg-black rounded-[40px] border-4 border-gray-700 mx-auto relative overflow-hidden shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-black rounded-b-3xl"></div>

            {/* Screen */}
            <div className="px-4 py-6">
              <div className={`p-4 rounded-xl bg-gradient-to-r ${T.header}`}>
                <h2 className="text-lg font-bold">
                  {brand || "Your Brand"}
                </h2>
              </div>

              <div className="mt-4 space-y-3">
                {tools.map((t, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${T.card}`}>
                    <h3 className="font-semibold text-sm">{t}</h3>
                    <p className="text-xs opacity-70">
                      Smart automation for your business.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

