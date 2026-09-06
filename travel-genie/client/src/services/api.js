import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://travelgenie-backend-fcvw.onrender.com";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
