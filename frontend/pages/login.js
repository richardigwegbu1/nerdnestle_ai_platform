import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email"); // "email" | "code"
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");

  useEffect(() => {
    if (router.query.new === "true") {
      setInfoMsg("Account created! Use your email to request a login code.");
    }
  }, [router.query.new]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    if (!email) {
      setErrorMsg("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.nerdnestle.com/auth/request-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Could not send login code.");
      }

      setInfoMsg(
        "We sent a 6-digit code to your email. Enter it below to continue."
      );
      setStep("code");

      // Small UX: focus first digit after a short delay
      setTimeout(() => {
        const el = document.getElementById("code-0");
        if (el) el.focus();
      }, 200);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDigitChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...codeDigits];
    updated[index] = value;
    setCodeDigits(updated);

    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    const code = codeDigits.join("");
    if (code.length !== 6) {
      setErrorMsg("Please enter all 6 digits of the code.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://api.nerdnestle.com/auth/verify-code",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Invalid or expired code.");
      }

      // If backend returns a session token, store it in a cookie
      const token = data.session_token || data.token;
      if (token) {
        document.cookie = `nn_session=${token}; path=/; secure; samesite=lax`;
      }

      setInfoMsg("Login successful! Redirecting to your dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Log In | NerdNestle</title>
      </Head>

      <div className="min-h-screen bg-nerdBg flex items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full bg-nerdCard/90 border border-white/10 rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-2xl font-semibold mb-2">
            Welcome back to <span className="text-nerdPrimary">NerdNestle</span>
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            Log in with a secure 6-digit code — just like ChatGPT. No password
            needed.
          </p>

          {infoMsg && (
            <div className="text-xs text-emerald-300 bg-emerald-900/30 border border-emerald-500/40 rounded-md px-3 py-2 mb-4">
              {infoMsg}
            </div>
          )}

          {errorMsg && (
            <div className="text-xs text-red-300 bg-red-900/30 border border-red-500/40 rounded-md px-3 py-2 mb-4">
              {errorMsg}
            </div>
          )}

          {step === "email" && (
            <form className="space-y-4" onSubmit={handleSendCode}>
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Email address
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

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-lg bg-nerdPrimary hover:bg-pink-500 transition px-4 py-2.5 text-sm font-semibold shadow-lg shadow-nerdPrimary/30 disabled:opacity-60"
              >
                {loading ? "Sending code..." : "Send login code"}
              </button>
            </form>
          )}

          {step === "code" && (
            <form className="space-y-5" onSubmit={handleVerifyCode}>
              <div>
                <p className="text-xs text-gray-300 mb-2">
                  We sent a 6-digit code to:
                </p>
                <p className="text-sm font-medium text-white mb-4">{email}</p>
                <p className="text-xs text-gray-400 mb-3">
                  Enter the code below to complete login.
                </p>

                <div className="flex justify-between gap-2 md:gap-3">
                  {codeDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`code-${idx}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-10 h-12 md:w-12 md:h-14 text-center text-lg md:text-xl bg-black/40 border border-white/15 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-nerdPrimary focus:border-nerdPrimary"
                      value={digit}
                      onChange={(e) =>
                        handleDigitChange(idx, e.target.value.trim())
                      }
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center rounded-lg bg-nerdPrimary hover:bg-pink-500 transition px-4 py-2.5 text-sm font-semibold shadow-lg shadow-nerdPrimary/30 disabled:opacity-60"
              >
                {loading ? "Verifying code..." : "Log in"}
              </button>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <button
                  type="button"
                  onClick={handleSendCode}
                  className="text-nerdPrimary hover:underline"
                  disabled={loading}
                >
                  Resend code
                </button>
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="hover:underline"
                >
                  Use a different email
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-xs text-gray-400">
            Don&apos;t have an account yet?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-nerdPrimary hover:underline"
            >
              Create one now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

