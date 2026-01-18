import client, { clearClientAuthToken, setClientAuthToken } from "../../api/client";
import { setUser } from "./clientActions";
import {
  clearStoredToken,
  clearStoredUser,
  getStoredToken,
  setSessionToken,
  setStoredToken,
  setStoredUser,
} from "../../auth/auth";

function pickMessage(data) {
  if (!data) return "";
  if (typeof data === "string") return data;
  return data.message || data.error || data.detail || "";
}

function extractToken(payload) {
  return (
    payload?.token ||
    payload?.access_token ||
    payload?.accessToken ||
    payload?.jwt ||
    payload?.data?.token ||
    payload?.data?.access_token ||
    ""
  );
}

function normalizeUser(payload, emailFallback) {
  const raw = payload?.user || payload?.data?.user || payload?.data || payload || {};
  if (!raw || typeof raw !== "object") return { email: String(emailFallback || "") };
  const u = { ...raw };
  u.email = u.email || emailFallback || "";
  delete u.token;
  delete u.access_token;
  delete u.accessToken;
  delete u.jwt;
  return u;
}

function isNotActivated(status, message) {
  if (Number(status) !== 401) return false;
  const m = String(message || "").toLowerCase();
  return m.includes("not activated") || m.includes("activate");
}

export const loginThunk =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    try {
      const res = await client.post("/login", { email, password });
      const token = extractToken(res.data);
      const user = normalizeUser(res.data, email);

      if (!token) return { ok: false, status: 500, message: "Token missing" };

      setClientAuthToken(token);
      setSessionToken(token);

      if (rememberMe) {
        setStoredToken(token);
        setStoredUser(user);
      } else {
        clearStoredToken();
        clearStoredUser();
      }

      dispatch(setUser(user));
      window.dispatchEvent(new Event("auth"));
      return { ok: true, user, token };
    } catch (e) {
      const status = e?.response?.status;
      const msg = pickMessage(e?.response?.data) || "Unauthorized";
      return { ok: false, status, message: msg, notActivated: isNotActivated(status, msg) };
    }
  };

export const verifyTokenThunk = () => async (dispatch) => {
  const token = getStoredToken();
  if (!token) return { ok: false, skipped: true };

  setClientAuthToken(token);
  setSessionToken(token);

  try {
    const res = await client.get("/verify", { headers: { Authorization: token } });
    const nextToken = extractToken(res.data) || token;
    const user = normalizeUser(res.data, "");

    setClientAuthToken(nextToken);
    setSessionToken(nextToken);
    setStoredToken(nextToken);
    setStoredUser(user);

    dispatch(setUser(user));
    window.dispatchEvent(new Event("auth"));
    return { ok: true, user, token: nextToken };
  } catch (e) {
    clearStoredToken();
    clearStoredUser();
    clearClientAuthToken();
    setSessionToken("");
    dispatch(setUser({}));
    window.dispatchEvent(new Event("auth"));
    return { ok: false, status: e?.response?.status, message: pickMessage(e?.response?.data) || "Unauthorized" };
  }
};
