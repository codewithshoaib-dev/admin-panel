import { useEffect } from "react";
import useAuthStore from "./useAuthStore";

const useAuthOnLoad = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
 

  useEffect(() => {
    fetchUser();
    
  }, [fetchUser]);
};

export default useAuthOnLoad;
