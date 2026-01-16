// frontend/lib/api.js

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Fetch a public product by slug from the FastAPI backend.
 */
export async function fetchPublicProduct(slug) {
  if (!slug) {
    throw new Error("Product slug is required");
  }

  const url = `${API_BASE_URL}/api/products/public/${encodeURIComponent(slug)}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to fetch product (${res.status}): ${text}`);
  }

  return res.json();
}

/**
 * Fetch a public storefront by ID or key from the FastAPI backend.
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
    throw new Error(`Failed to fetch storefront (${res.status}): ${text}`);
  }

  return res.json();
}

/**
 * Fetch affiliate stats for the logged-in user.
 */
export async function fetchAffiliateStats(token) {
  if (!token) {
    throw new Error("Missing auth token");
  }

  const res = await fetch(`${API_BASE_URL}/api/affiliate/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Failed to load affiliate stats (${res.status}): ${text}`
    );
  }

  return res.json();
}

