import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignupPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://api.nerdnestle.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Signup failed.");
      }

      setSuccessMsg(
        "Account created! Check your email for a welcome message, then log in."
      );

      // Small delay then redirect to login
      setTimeout(() => {
        router.push("/login?new=true");
      }, 1500);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up | NerdNestle AI Marketplace</title>
      </Head>

      <div className="min-h-screen bg-nerdBg flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT SIDE – Marketing / Hero */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-nerdCard/70 border border-nerdPrimary/40 w-fit">
              <span className="text-xs text-nerdPrimary">NEW</span>
              <span className="text-xs text-gray-300">
                Build your own AI Marketplace in minutes
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Join <span className="text-nerdPrimary">NerdNestle</span> and
              sell high-converting{" "}
              <span className="underline decoration-nerdPrimary/70">
                AI tools
              </span>{" "}
              without writing a backend.
            </h1>

            <p className="text-gray-300 text-sm md:text-base max-w-lg">
              Create and sell AI assistants, writers, receptionists, and more —
              all powered by OpenAI and NerdNestle infrastructure. You focus on
              ideas, we handle the tech.
            </p>

            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-3">
                <span className="mt-1 h-5 w-5 rounded-full bg-nerdPrimary/15 text-nerdPrimary flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>
                  Launch your first AI product in under an hour — templates
                  included.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="mt-1 h-5 w-5 rounded-full bg-nerdPrimary/15 text-nerdPrimary flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>
                  Hybrid monetization: one-time tools + recurring subscription
                  plans.
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="mt-1 h-5 w-5 rounded-full bg-nerdPrimary/15 text-nerdPrimary flex items-center justify-center text-xs">
                  ✓
                </span>
                <span>
                  Stripe-ready checkout and affiliate-friendly commissions.
                </span>
              </li>
            </ul>

            <div className="text-xs text-gray-500">
              Powered by Unix Training Academy • NerdNestle.com
            </div>
          </div>

          {/* RIGHT SIDE – Signup Card */}
          <div className="bg-nerdCard/90 rounded-2xl shadow-xl border border-white/5 p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Create your NerdNestle account
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Start with free access. You can upgrade to Basic or Pro later.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-nerdPrimary focus:border-nerdPrimary"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Richard"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-nerdPrimary focus:border-nerdPrimary"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Igwegbu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Work email
                </label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-nerdPrimary focus:border-nerdPrimary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@business.com"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-red-400 bg-red-950/40 border border-red-500/40 rounded-md px-3 py-2">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="text-xs text-emerald-300 bg-emerald-900/30 border border-emerald-500/40 rounded-md px-3 py-2">
                  {successMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-nerdPrimary hover:bg-pink-500 transition px-4 py-2.5 text-sm font-semibold shadow-lg shadow-nerdPrimary/30 disabled:opacity-60"
              >
                {loading ? "Creating your account..." : "Create account"}
              </button>
            </form>

            <div className="mt-6 text-xs text-gray-400">
              By continuing, you agree to the{" "}
              <span className="text-nerdPrimary cursor-pointer">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="text-nerdPrimary cursor-pointer">
                Privacy Policy
              </span>
              .
            </div>

            <div className="mt-4 text-xs text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-nerdPrimary hover:underline"
              >
                Log in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

