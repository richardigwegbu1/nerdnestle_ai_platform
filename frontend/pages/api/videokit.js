// /home/ec2-user/nerdnest_ai_platform/frontend/pages/api/videokit.js

/**
 * VideoKit API (Next.js API route)
 * Option A gating: free public access BUT require email capture (no login).
 *
 * Behavior:
 * - If missing email AND missing lead_id -> 403 { error: "email_required" }
 * - Basic rate limit (in-memory per instance):
 *     - 5 requests per minute per IP
 *     - 30 requests per hour per IP
 *
 * Notes:
 * - In-memory rate limiting resets on process restart and does not share state across instances.
 * - Primary enforcement should be at Nginx edge; this is a safety net.
 */

const rlState = globalThis.__NN_VIDEOKIT_RL__ || {
  perMin: new Map(),
  perHour: new Map(),
};
globalThis.__NN_VIDEOKIT_RL__ = rlState;

function nowMs() {
  return Date.now();
}

function getClientIp(req) {
  // Prefer nginx forwarded header; fallback to socket
  const xf = (req.headers["x-forwarded-for"] || "").toString();
  if (xf) return xf.split(",")[0].trim();
  return (
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown"
  );
}

function rateLimit(req) {
  const ip = getClientIp(req);
  const t = nowMs();

  const minuteWindowMs = 60 * 1000;
  const hourWindowMs = 60 * 60 * 1000;

  // per minute
  const m = rlState.perMin.get(ip) || { reset: t + minuteWindowMs, count: 0 };
  if (t > m.reset) {
    m.reset = t + minuteWindowMs;
    m.count = 0;
  }
  m.count += 1;
  rlState.perMin.set(ip, m);

  // per hour
  const h = rlState.perHour.get(ip) || { reset: t + hourWindowMs, count: 0 };
  if (t > h.reset) {
    h.reset = t + hourWindowMs;
    h.count = 0;
  }
  h.count += 1;
  rlState.perHour.set(ip, h);

  const limitMin = 5;
  const limitHour = 30;

  const remainingMin = Math.max(0, limitMin - m.count);
  const remainingHour = Math.max(0, limitHour - h.count);

  return {
    ok: m.count <= limitMin && h.count <= limitHour,
    ip,
    limitMin,
    remainingMin,
    resetMin: Math.floor(m.reset / 1000),
    limitHour,
    remainingHour,
    resetHour: Math.floor(h.reset / 1000),
  };
}

function setRateHeaders(res, rl) {
  res.setHeader("X-RateLimit-Limit-Minute", String(rl.limitMin));
  res.setHeader("X-RateLimit-Remaining-Minute", String(rl.remainingMin));
  res.setHeader("X-RateLimit-Reset-Minute", String(rl.resetMin));
  res.setHeader("X-RateLimit-Limit-Hour", String(rl.limitHour));
  res.setHeader("X-RateLimit-Remaining-Hour", String(rl.remainingHour));
  res.setHeader("X-RateLimit-Reset-Hour", String(rl.resetHour));
}

/**
 * Resolve lead_id:
 * - If lead_id exists -> use it.
 * - Else if email exists -> create/upsert lead via /api/leads and return its lead_id.
 * This makes results consistent and gives you attribution even for direct API callers.
 */
async function resolveLead({ req, email, lead_id, source = "videokit" }) {
  if (lead_id != null && String(lead_id).trim() !== "") {
    const n = Number(lead_id);
    return Number.isFinite(n) ? n : lead_id;
  }

  const cleanEmail = String(email || "").trim().toLowerCase();
  if (!cleanEmail) return null;

  try {
    // Call your own Next API route so you get consistent behavior behind Nginx.
    // Use relative URL when possible; fallback to explicit base if needed.
    const proto =
      (req.headers["x-forwarded-proto"] || "").toString() ||
      (req.socket?.encrypted ? "https" : "http");
    const host = (req.headers["host"] || "").toString();
    const baseUrl = host ? `${proto}://${host}` : "";

    const r = await fetch(`${baseUrl}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: cleanEmail,
        source,
        consent: true,
        consent_version: "v1",
      }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      // Non-fatal: gating already passed by email; we just won't have lead_id.
      return null;
    }
    return data?.lead_id ?? null;
  } catch {
    // Non-fatal
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limit first
  const rl = rateLimit(req);
  setRateHeaders(res, rl);
  if (!rl.ok) {
    return res.status(429).json({
      error: "rate_limited",
      message: "Too many requests. Please try again later.",
    });
  }

  try {
    const body = req.body || {};

    const {
      // Gate inputs
      email = "",
      lead_id = null,

      // Shared
      topic = "",
      platform = "YouTube",
      duration = "60 seconds",
      audience = "Beginners",
      style = "Explainer",

      // VoxX
      voice = "Male - calm",
      tone = "Clear & professional",
      pace = "Medium",
      callToAction = "Subscribe for more tech lessons",
      notes = "",

      // PixX
      useCase = "YouTube Thumbnail",
      imageStyle = "Clean & modern",
      aspectRatio = "16:9",
      brandColors = "teal + purple",
      textOverlay = "",
      mustInclude = "high contrast, bold readable title",
      avoid = "blurry, watermark, unreadable text",

      // Publish Pack
      hook = "", // optional extra hook sentence
      keywords = "", // comma-separated keywords (optional)
      channelName = "NerdNest AI", // optional branding
      link = "https://nerdnest.ai", // optional CTA link
    } = body;

    if (String(topic).trim().length < 4) {
      return res.status(400).json({ error: "Topic must be at least 4 characters." });
    }

    const cleanEmail = String(email || "").trim().toLowerCase();
    const hasLead = lead_id != null && String(lead_id).trim() !== "";
    const hasEmail = !!cleanEmail;

    // Gate: require email OR lead_id
    if (!hasEmail && !hasLead) {
      return res.status(403).json({
        error: "email_required",
        message: "Email (or lead_id) is required to generate VideoKit.",
      });
    }

    // Resolve lead id (best-effort)
    const resolvedLeadId = await resolveLead({
      req,
      email: cleanEmail,
      lead_id,
      source: "videokit",
    });

    // Prefer env overrides, fall back to local backend
    const BASE =
      process.env.NERDNEST_BACKEND_URL ||
      process.env.API_BASE_URL ||
      "http://127.0.0.1:8000";

    const postJSON = async (path, payload) => {
      const r = await fetch(`${BASE}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json().catch(() => ({}));
      if (!r.ok) {
        throw new Error(data?.error || `Request failed: ${path}`);
      }
      return data;
    };

    // 1) SceneX
    const scenex = await postJSON("/api/scenex", {
      topic: String(topic).trim(),
      platform,
      style,
      duration,
      audience,
      notes: String(notes || "").trim(),
      email: cleanEmail || undefined,
      lead_id: resolvedLeadId || undefined,
    });

    // 2) VoxX
    const voxx = await postJSON("/api/voxx", {
      topic: String(topic).trim(),
      platform,
      voice,
      tone,
      pace,
      duration,
      audience,
      callToAction,
      notes: String(notes || "").trim(),
      email: cleanEmail || undefined,
      lead_id: resolvedLeadId || undefined,
    });

    // 3) PixX (thumbnail prompt)
    const pixxIdea =
      useCase === "YouTube Thumbnail"
        ? `A YouTube thumbnail for: "${String(topic).trim()}" (tech explainer)`
        : `An image for: "${String(topic).trim()}"`;

    const pixx = await postJSON("/api/pixx", {
      idea: pixxIdea,
      useCase,
      style: imageStyle,
      aspectRatio,
      brandColors,
      textOverlay: String(textOverlay || "").trim(),
      mustInclude,
      avoid,
      email: cleanEmail || undefined,
      lead_id: resolvedLeadId || undefined,
    });

    // 4) Publish Pack (local generation - no backend dependency)
    const publishPack = buildPublishPack({
      topic: String(topic).trim(),
      platform,
      duration,
      audience,
      style,
      tone,
      pace,
      callToAction,
      hook: String(hook || "").trim(),
      keywords: String(keywords || "").trim(),
      channelName: String(channelName || "NerdNest AI").trim(),
      link: String(link || "https://nerdnest.ai").trim(),
    });

    const packText =
      `NERDNEST VIDEO KIT\n` +
      `=================\n\n` +
      `TOPIC: ${String(topic).trim()}\n` +
      `PLATFORM: ${platform}\n` +
      `DURATION: ${duration}\n` +
      `AUDIENCE: ${audience}\n` +
      `STYLE: ${style}\n\n` +
      `---\n\n` +
      `1) SceneX (Scene Plan)\n` +
      `----------------------\n` +
      `${scenex?.text || ""}\n\n` +
      `---\n\n` +
      `2) VoxX (Voiceover)\n` +
      `-------------------\n` +
      `${voxx?.text || ""}\n\n` +
      `---\n\n` +
      `3) PixX (Thumbnail Prompt)\n` +
      `--------------------------\n` +
      `${pixx?.text || ""}\n\n` +
      `---\n\n` +
      `4) Publish Pack\n` +
      `--------------\n` +
      `${publishPack}\n`;

    return res.status(200).json({
      gated: true,
      email: cleanEmail || null,
      lead_id: resolvedLeadId ?? null,
      scenex: scenex?.text || "",
      voxx: voxx?.text || "",
      pixx: pixx?.text || "",
      publishPack,
      packText,
    });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Server error" });
  }
}

/**
 * Publish Pack generator (YouTube-first, works for other platforms too).
 * This is intentionally deterministic & safe—no external API needed.
 */
function buildPublishPack({
  topic,
  platform,
  duration,
  audience,
  style,
  tone,
  pace,
  callToAction,
  hook,
  keywords,
  channelName,
  link,
}) {
  const cleanTopic = topic.replace(/\s+/g, " ").trim();

  const kwList = keywords
    ? keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : [];

  const inferred = inferKeywords(cleanTopic);
  const allKeywords = dedupe([...kwList, ...inferred]).slice(0, 12);

  const isYouTube = platform.toLowerCase().includes("youtube");
  const isShort =
    String(duration).toLowerCase().includes("60") ||
    String(duration).toLowerCase().includes("short");

  const titleOptions = makeTitleOptions(cleanTopic, { isYouTube, isShort });
  const tags = makeTags(cleanTopic, allKeywords, { isYouTube });

  const description = makeDescription({
    topic: cleanTopic,
    audience,
    duration,
    style,
    tone,
    pace,
    callToAction,
    hook,
    channelName,
    link,
    isYouTube,
  });

  const pinnedComment = makePinnedComment({ topic: cleanTopic, callToAction, link });

  const chapters = isYouTube ? makeChapters(cleanTopic, { isShort }) : "";

  return (
    `TITLES (pick one)\n` +
    `-----------------\n` +
    titleOptions.map((t, i) => `${i + 1}. ${t}`).join("\n") +
    `\n\n` +
    `DESCRIPTION\n` +
    `-----------\n` +
    `${description}\n\n` +
    `TAGS / KEYWORDS\n` +
    `--------------\n` +
    `${tags.join(", ")}\n\n` +
    `PINNED COMMENT\n` +
    `-------------\n` +
    `${pinnedComment}\n` +
    (chapters ? `\nCHAPTERS / TIMESTAMPS\n---------------------\n${chapters}\n` : "")
  );
}

function makeTitleOptions(topic, { isYouTube, isShort }) {
  const base = topic.endsWith("?") ? topic.slice(0, -1) : topic;
  const shortBadge = isShort ? " (In 60 Seconds)" : "";
  const ytBadge = isYouTube ? "" : "";

  const options = [
    `What is ${base}?${shortBadge}${ytBadge}`,
    `${base} Explained Simply${shortBadge}`,
    `${base} for Beginners${shortBadge}`,
    `${base}: The Fast, Clear Explanation${shortBadge}`,
    `${base} in Plain English${shortBadge}`,
    `Stop Confusing ${base}: Here’s the Simple Truth${shortBadge}`,
    `${base} Basics: Everything You Need to Know${shortBadge}`,
    `Learn ${base} Fast: Beginner Guide${shortBadge}`,
    `${base} Made Easy (Real Example Included)${shortBadge}`,
    `${base} vs Everything Else: Quick Breakdown${shortBadge}`,
  ];

  return options.map((t) => t.replace(/\s+/g, " ").trim()).slice(0, 8);
}

function makeDescription({
  topic,
  audience,
  duration,
  style,
  tone,
  pace,
  callToAction,
  hook,
  channelName,
  link,
  isYouTube,
}) {
  const lines = [];

  if (hook) {
    lines.push(hook);
    lines.push("");
  } else {
    lines.push(`In this ${duration} ${style.toLowerCase()} video, we break down: ${topic}.`);
    lines.push(`This is built for ${audience.toLowerCase()}—clear, practical, and easy to follow.`);
    lines.push("");
  }

  lines.push(`What you’ll learn:`);
  lines.push(`- The core idea (simple definition)`);
  lines.push(`- A real-world example`);
  lines.push(`- A practical takeaway you can use today`);
  lines.push("");

  lines.push(`Style notes: ${tone} • Pace: ${pace}`);
  lines.push("");

  if (isYouTube) {
    lines.push(`Resources / Tools:`);
    lines.push(`- ${channelName}: ${link}`);
    lines.push("");
    lines.push(`If you found this helpful, ${callToAction}.`);
  } else {
    lines.push(`${callToAction}.`);
    lines.push(`${link}`);
  }

  if (isYouTube) {
    lines.push("");
    lines.push(`#tech #tutorial #beginners #devops #cloud #linux`);
  }

  return lines.join("\n");
}

function makePinnedComment({ topic, callToAction, link }) {
  const lines = [];
  lines.push(`Quick question: What part of “${topic}” should I explain next?`);
  lines.push(`Reply below and I’ll make a follow-up.`);
  lines.push("");
  lines.push(`${callToAction}.`);
  lines.push(link);
  return lines.join("\n");
}

function makeChapters(topic, { isShort }) {
  if (isShort) {
    return `0:00 Hook\n0:05 What it is\n0:20 Real example\n0:40 Key takeaway\n0:55 CTA`;
  }
  return `0:00 Hook\n0:12 Simple definition\n0:45 Why it matters\n1:25 Real-world example\n2:10 Common mistakes\n2:45 Quick recap\n3:05 CTA`;
}

function makeTags(topic, keywords, { isYouTube }) {
  const base = ["tech", "tutorial", "beginners", "how to", "explained", "guide"];

  const topicWords = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(" ")
    .filter(Boolean);

  const combined = dedupe([...base, ...keywords, ...topicWords]);
  return isYouTube ? combined.slice(0, 22) : combined.slice(0, 18);
}

function inferKeywords(topic) {
  const t = topic.toLowerCase();

  const inferred = [];
  if (t.includes("linux")) inferred.push("linux", "terminal", "bash", "shell");
  if (t.includes("devops")) inferred.push("devops", "ci/cd", "automation", "pipelines");
  if (t.includes("docker")) inferred.push("docker", "containers", "devops");
  if (t.includes("kubernetes") || t.includes("k8s")) inferred.push("kubernetes", "k8s", "containers");
  if (t.includes("aws")) inferred.push("aws", "cloud", "ec2", "s3");
  if (t.includes("terraform")) inferred.push("terraform", "iac", "infrastructure as code");
  if (t.includes("ansible")) inferred.push("ansible", "automation", "configuration management");
  if (t.includes("git")) inferred.push("git", "github", "version control");

  inferred.push("tech explained", "simple explanation", "for beginners");
  return inferred;
}

function dedupe(arr) {
  const seen = new Set();
  return arr.filter((x) => {
    const key = String(x).toLowerCase();
    if (!key) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

