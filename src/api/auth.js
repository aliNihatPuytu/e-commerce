import axios from "axios";

const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

function pickMessage(data) {
  if (!data) return "";
  if (typeof data === "string") return data;
  return data.message || data.error || data.detail || "";
}

export function isNotActivatedError(message) {
  const m = String(message || "").toLowerCase();
  return m.includes("not activated") || m.includes("activation");
}

export async function fetchRoles() {
  try {
    const res = await api.get("/roles");
    return { ok: true, data: res.data };
  } catch (e) {
    const msg = pickMessage(e?.response?.data);
    return { ok: false, status: e?.response?.status, message: msg || "Failed to load roles" };
  }
}

export async function signupUser(payload) {
  try {
    const res = await api.post("/signup", payload);
    return { ok: true, data: res.data };
  } catch (e) {
    const msg = pickMessage(e?.response?.data);
    return { ok: false, status: e?.response?.status, message: msg || "Signup failed" };
  }
}

export async function loginUser(payload) {
  try {
    const res = await api.post("/login", payload);
    return { ok: true, data: res.data };
  } catch (e) {
    const msg = pickMessage(e?.response?.data);
    return { ok: false, status: e?.response?.status, message: msg || "Unauthorized" };
  }
}
