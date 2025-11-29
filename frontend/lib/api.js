// frontend/lib/api.js

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

/**
 * Fetch a public storefront by ID or key from the FastAPI backend.
 * Calls: GET /api/storefront/public/{idOrKey}
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

  // Expecting JSON like:
  // { id, brand, theme, tools: [...], created_at, user_id }
  return res.json();
}

/**
 * Fetch a public product by slug from the FastAPI backend.
 * Calls: GET /api/products/public/{slug}
 *
 * Backend response shape:
 * { success: true, product: { id, slug, title, description, price, commission_pct, status } }
 */
export async function fetchPublicProduct(slug) {
  if (!slug) {
    throw new Error("Product slug is required");
  }

  const url = `${API_BASE_URL}/api/products/public/${encodeURIComponent(slug)}`;

  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const message = `Failed to fetch product (${res.status}): ${text}`;
    throw new Error(message);
  }

  const data = await res.json();

  if (!data || !data.product) {
    throw new Error("Malformed product response from API");
  }

  return data.product;
}

