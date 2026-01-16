export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const upstream = await fetch("http://127.0.0.1:8000/api/voxx", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: data?.error || "Upstream request failed" });
    }

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}

