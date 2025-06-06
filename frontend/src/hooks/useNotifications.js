import { useQuery } from "@tanstack/react-query";
import apiClient from "../configs/axios";


const fetchNotifications = async () => {
  console.log("fetch notification component mounted")
  const res = await apiClient.get("notifications");

  return res.data;
};

export const useNotifications = () =>
  useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    keepPreviousData: true,
  });
