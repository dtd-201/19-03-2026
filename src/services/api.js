import axios from "axios";

const api = axios.create({
  baseURL: "http://103.166.183.82:4040/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 luôn lấy token mới nhất
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;