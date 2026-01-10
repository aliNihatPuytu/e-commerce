import axios from "axios";
import mockAdapter from "./mockAdapter";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL || "",
  adapter: baseURL ? undefined : mockAdapter,
});

export default api;
