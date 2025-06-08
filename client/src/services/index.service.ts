import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_API;

export const BACKEND_API = axios.create({
  baseURL: URL,
  headers: {
    Authorization: localStorage.getItem("AccessToken"),
  },
});


BACKEND_API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login?error=token_expired";
    }
    return Promise.reject(error);
  }
);
