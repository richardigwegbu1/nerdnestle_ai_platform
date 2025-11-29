// frontend/lib/api.js

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Fetch a public storefront by ID or key from the FastAPI backend.
 * For now this calls /api/storefront/public/{idOrKey}.
 * Backend can treat the param as a Mongo ObjectId OR a custom handle later.
 */
export async function fetchStorefrontPublic(idOrKey) {
  if (!idOrKey) {
    throw new Error("Storefront idOrKey is required");
  }

  const url = `${API_BASE_URL}/api/storefront/public/${encodeURIComponent(
    idOrKey
  )}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const message = `Failed to fetch storefront (${res.status}): ${text}`;
    throw new Error(message);
  }

  // Expecting JSON like: { brand, theme, created_at, tools: [...] }
  return res.json();
}

