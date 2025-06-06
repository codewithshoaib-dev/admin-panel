import apiClient from "../configs/axios";
import toast  from "react-hot-toast";


let isTokenRefreshing = false;
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
}

const resolveQueuedRequests = (error = null) => {
  requestQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve();
  });
  requestQueue = [];
};

export const handleTokenRefresh = async (apiClient, originalConfig) => {
  if (isTokenRefreshing) {
    return new Promise((resolve, reject) => {
      requestQueue.push({
        resolve: () => resolve(),
        reject,
      });
    });
  }

  isTokenRefreshing = true;

  try {
    await apiClient.post("token/refresh", {}, { withCredentials: true });
    resolveQueuedRequests();
  } catch (error) {
    resolveQueuedRequests(error);
    throw error;
  } finally {
    isTokenRefreshing = false;
  }
};


