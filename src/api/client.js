import axios from "axios";
import { getToken } from "../auth/auth";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://workintech-fe-ecommerce.onrender.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setClientAuthToken(token) {
  if (!token) return;
  client.defaults.headers.common.Authorization = token;
}

export function clearClientAuthToken() {
  delete client.defaults.headers.common.Authorization;
}

client.interceptors.request.use((config) => {
  const token = getToken();
  const headers = config.headers || (config.headers = {});
  const hasAuth = Boolean(headers.Authorization || headers.authorization);
  if (!hasAuth && token) headers.Authorization = token;
  return config;
});

export default client;
