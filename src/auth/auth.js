const TOKEN_KEY = "wt_token";
const SESSION_TOKEN_KEY = "wt_token_session";
const USER_KEY = "wt_user";
const BYPASS_KEY = "wt_bypass";
const REMEMBER_KEY = "wt_remember";

export function getToken() {
  return sessionStorage.getItem(SESSION_TOKEN_KEY) || localStorage.getItem(TOKEN_KEY) || "";
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthed() {
  return Boolean(getToken() || localStorage.getItem(BYPASS_KEY));
}

export function setAuth(payload, remember = false) {
  const token =
    payload?.token ||
    payload?.access_token ||
    payload?.accessToken ||
    payload?.jwt ||
    payload?.data?.token ||
    payload?.data?.access_token;

  if (token) {
    const t = String(token);
    if (remember) {
      localStorage.setItem(TOKEN_KEY, t);
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      localStorage.setItem(REMEMBER_KEY, "1");
    } else {
      sessionStorage.setItem(SESSION_TOKEN_KEY, t);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REMEMBER_KEY);
    }
  }

  localStorage.setItem(USER_KEY, JSON.stringify(payload || {}));
  localStorage.removeItem(BYPASS_KEY);
  window.dispatchEvent(new Event("auth"));
}

export function setRememberedToken(token) {
  const t = String(token || "");
  if (!t) return;
  localStorage.setItem(TOKEN_KEY, t);
  localStorage.setItem(REMEMBER_KEY, "1");
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  window.dispatchEvent(new Event("auth"));
}

export function clearRememberedToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REMEMBER_KEY);
}

export function hasRememberedToken() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}

export function setBypass(email) {
  localStorage.setItem(BYPASS_KEY, JSON.stringify({ email: String(email || "").trim(), ts: Date.now() }));
  window.dispatchEvent(new Event("auth"));
}

export function getBypass() {
  try {
    const raw = localStorage.getItem(BYPASS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(BYPASS_KEY);
  localStorage.removeItem(REMEMBER_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  window.dispatchEvent(new Event("auth"));
}
