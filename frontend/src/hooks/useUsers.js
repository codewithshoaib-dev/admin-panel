import { useQuery } from "@tanstack/react-query";
import apiClient from "../configs/axios";

export const useUsers = (page, search) => {
  console.log(`Hook called: ${page} ${search}`)
  return useQuery({
    queryKey: ["users", page, search],
    queryFn: async () => {
      const res = await apiClient.get("users", {
        params: {
          page,
          search,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
