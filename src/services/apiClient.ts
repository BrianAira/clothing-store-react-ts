import axios from "axios";
// import { store } from "../store/store";
import { logout } from "../features/Auth/redux/authSlice";
import { store } from "../store/store";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
// "https://uncontemptuously-cartographical-bobbye.ngrok-free.dev"
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    let token = store.getState().auth.token;
    if (!token) {
      token = localStorage.getItem("token");
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    const status=error.response?.status;
    
    if (status===401||!error.response){
      store.dispatch(logout())
    }
    return Promise.reject(error);
  }
);
