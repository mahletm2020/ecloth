//base axios config

import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api", // Laravel backend API
});

// Attach token if exists
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
