import axios from "axios";
import { refreshAccessToken} from "../services/AuthService";

const apiClient = axios.create({
  baseURL: "/api/",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    if (
      response?.status !== 401 ||
      config._retry ||
      config.isRefreshCall
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    try {
      await refreshAccessToken(apiClient);
      return apiClient(config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);


export default apiClient;
