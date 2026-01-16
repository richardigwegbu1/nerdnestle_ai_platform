export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "method_not_allowed" });

  try {
    const base = process.env.BACKEND_URL || "http://127.0.0.1:8000";
    const r = await fetch(`${base}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const text = await r.text();
    res.status(r.status);

    try {
      return res.json(JSON.parse(text));
    } catch {
      return res.send(text);
    }
  } catch (e) {
    return res.status(500).json({ error: "leads_proxy_failed", detail: String(e) });
  }
}
