import apiClient from "../configs/axios";
import toast from "react-hot-toast";

let isTokenRefreshing = false;
let refreshPromise = null;
let requestQueue = [];

export const logout = async (navigate) => {
  try {
    await apiClient.post("logout");
    toast.success("Logged out successfully");
    navigate("/login");
  } catch (err) {
    console.error(err);
    toast.error("Failed to logout. Please try again");
  }
};

const processQueue = (error = null) => {
  requestQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  requestQueue = [];
};

export const refreshAccessToken = () => {
  if (isTokenRefreshing) {
    return refreshPromise;
  }

  isTokenRefreshing = true;

  refreshPromise = apiClient
    .post("token/refresh", {}, { withCredentials: true })
    .then(() => {
      processQueue();
    })
    .catch((err) => {
      console.error("Token refresh failed:", err);
      processQueue(err);
    })
    .finally(() => {
      isTokenRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
};
