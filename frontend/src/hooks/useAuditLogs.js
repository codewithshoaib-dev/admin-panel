import { useQuery } from "@tanstack/react-query";
import apiClient from "../configs/axios";


const fetchAuditLogs = async () => {
  const res = await apiClient.get("audit/logs");
   console.log(res.data)
  
  
  return res.data;
 
};

export const useAuditLogs = () =>
  useQuery({
    queryKey: ["auditlogs"],
    queryFn: fetchAuditLogs,
    keepPreviousData: true,
  });
