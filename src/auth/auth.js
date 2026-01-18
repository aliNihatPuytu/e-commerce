const TOKEN_KEY = "wt_token";
const USER_KEY = "wt_user";
const BYPASS_KEY = "wt_bypass";

let SESSION_TOKEN = "";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

export function getToken() {
  return getStoredToken() || SESSION_TOKEN || "";
}

export function setSessionToken(token) {
  SESSION_TOKEN = String(token || "");
}

export function setStoredToken(token) {
  localStorage.setItem(TOKEN_KEY, String(token || ""));
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user || {}));
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
}

export function isAuthed() {
  return Boolean(getToken() || localStorage.getItem(BYPASS_KEY));
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
  clearStoredToken();
  clearStoredUser();
  localStorage.removeItem(BYPASS_KEY);
  setSessionToken("");
  window.dispatchEvent(new Event("auth"));
}
