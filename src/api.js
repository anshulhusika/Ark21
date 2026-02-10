import axios from "axios";

const api = axios.create({
  baseURL: "https://627e-202-173-124-100.ngrok-free.app/api",
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
