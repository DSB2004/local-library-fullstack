import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_API;

export const BACKEND_API = axios.create({
  baseURL: URL,
});

BACKEND_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("AccessToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

BACKEND_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("AccessToken");
      window.location.href = "/login?error=token_expired";
    }
    return Promise.reject(error);
  }
);
