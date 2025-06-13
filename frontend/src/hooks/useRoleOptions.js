import { useQuery } from "@tanstack/react-query";
import apiClient from "../configs/axios";


const fetchroleOptions = async () => {
  const res = await apiClient.get("roles");
  return res.data;
 
};

export const useroleOptions = () =>
  useQuery({
    queryKey: ["roleOptions"],
    queryFn: fetchroleOptions,
    keepPreviousData: true,
  });
