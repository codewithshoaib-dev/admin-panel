import { useQuery } from "@tanstack/react-query";
import apiClient from "../configs/axios";



export const useAuditLogs = (ordering) => {
  
  return useQuery({
    queryKey: ["auditlogs", ordering],
    queryFn: async () => {
      const res = await apiClient.get("audit/logs", {
        params: {
          ordering,
        },
      });
      console.log(res.data)
      return res.data;
      
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
