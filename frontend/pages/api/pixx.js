export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const base = process.env.NERDNEST_API_BASE || "http://127.0.0.1:8000";

    const upstream = await fetch(`${base}/api/pixx`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const text = await upstream.text();

    // Try JSON parse; if not JSON, wrap it.
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { text };
    }

    return res.status(upstream.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Proxy error" });
  }
}

