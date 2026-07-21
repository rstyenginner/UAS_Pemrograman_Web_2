const API_BASE_URL = "/api";

export function getToken() { return localStorage.getItem("token"); }
export function getUser() { const u = localStorage.getItem("user"); return u ? JSON.parse(u) : null; }
export function isLoggedIn() { return Boolean(getToken()); }
export function logout() { localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/login"; }
export function assetUrl(path) { if (!path) return ""; if (path.startsWith("http")) return path; return `/${path.replace(/^\/+/, "")}`; }

export async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  let result;
  try { result = await response.json(); }
  catch { result = { status: false, message: "Response backend tidak valid atau server tidak aktif." }; }
  if (response.status === 401) { alert(result.message || "Sesi login habis. Silakan login ulang."); logout(); }
  return result;
}
