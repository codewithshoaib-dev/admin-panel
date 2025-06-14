import { useQuery } from "@tanstack/react-query";
import apiClient from "../configs/axios";



export const useNotifications = (ordering) => {
  
  return useQuery({

    queryKey: ["notifications", ordering],
    queryFn: async () => {
      const res = await apiClient.get("notifications", {
        params: {
          ordering,
        },
      });
      
      return res.data;
      
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
