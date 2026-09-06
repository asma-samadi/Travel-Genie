import axios from "axios";

const api = axios.create({
  baseURL: "https://travelgenie-backend-fcvw.onrender.com/api/users/register/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
