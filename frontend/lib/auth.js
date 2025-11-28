// lib/auth.js
export function saveToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("nn_token", token);
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("nn_token");
  }
  return null;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("nn_token");
    window.location.href = "/login";
  }
}

