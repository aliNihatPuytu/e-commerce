import client from "./client";

function pickMessage(data) {
  if (!data) return "";
  if (typeof data === "string") return data;
  return data.message || data.error || data.detail || "";
}

function pickToken(data) {
  return (
    data?.token ||
    data?.access_token ||
    data?.accessToken ||
    data?.jwt ||
    data?.data?.token ||
    data?.data?.access_token ||
    ""
  );
}

export async function fetchRoles() {
  try {
    const res = await client.get("/roles");
    return { ok: true, data: res.data };
  } catch (e) {
    return { ok: false, status: e?.response?.status, message: pickMessage(e?.response?.data) || "Roles failed" };
  }
}

export async function signupUser(payload) {
  try {
    const res = await client.post("/signup", payload);
    return { ok: true, data: res.data };
  } catch (e) {
    return { ok: false, status: e?.response?.status, message: pickMessage(e?.response?.data) || "Signup failed" };
  }
}

export async function loginUser(payload) {
  try {
    const res = await client.post("/login", payload);
    return { ok: true, data: res.data };
  } catch (e) {
    return { ok: false, status: e?.response?.status, message: pickMessage(e?.response?.data) || "Unauthorized" };
  }
}

export async function verifyToken() {
  try {
    const res = await client.get("/verify");
    const token = pickToken(res.data);
    return { ok: true, data: res.data, token };
  } catch (e) {
    return { ok: false, status: e?.response?.status, message: pickMessage(e?.response?.data) || "Verify failed" };
  }
}

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  const list = data?.categories || data?.data || data?.result || [];
  return Array.isArray(list) ? list : [];
}

export async function fetchCategories() {
  try {
    const res = await client.get("/categories");
    return { ok: true, data: normalizeList(res.data) };
  } catch (e) {
    return { ok: false, status: e?.response?.status, message: pickMessage(e?.response?.data) || "Categories failed" };
  }
}
