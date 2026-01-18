import axios from "axios";
import { getToken } from "../auth/auth";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://workintech-fe-ecommerce.onrender.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = token;
  else if (config?.headers?.Authorization) delete config.headers.Authorization;
  return config;
});

export default client;
