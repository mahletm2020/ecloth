import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // allow cookies (important for Sanctum)
});

export default api;
