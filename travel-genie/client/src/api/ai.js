import axios from "axios";

const api = axios.create({
  baseURL: "https://travelgenie-backend-fcvw.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
