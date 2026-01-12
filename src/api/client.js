import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://workintech-fe-ecommerce.onrender.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !token.startsWith("dev-")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
