
import { useQuery } from "@tanstack/react-query";
import apiClient from "../configs/axios";


export const useSubscriptionPlans = (page, search) =>
  useQuery({
    queryKey: ["page", "search"],
    queryFn: async () => {
      const res = await apiClient.get("subscription/plans", {
        params: {
          page,
          search,
        },
      });
      return res.data;
    },
    keepPreviousData : true,
  });
