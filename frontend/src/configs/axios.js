import axios from "axios";
import { handleTokenRefresh } from "../services/AuthService";

const apiClient = axios.create({
  baseURL: "/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    const shouldAttemptRefresh =
      response?.status === 401 &&
      !config._retry &&
      !config.url.includes("/token/refresh") &&
      !config.url.includes("/logout");

    if (!shouldAttemptRefresh) {
      return Promise.reject(error);
    }

    config._retry = true;

    try {
      await handleTokenRefresh(apiClient, config);
      return apiClient(config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export default apiClient;
