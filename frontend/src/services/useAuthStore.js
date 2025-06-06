import { create } from "zustand";
import apiClient from "../configs/axios";

const useAuthStore = create((set) => {
    
  return {
    user: null,
    loading: true,

    fetchUser: async () => {
      try {
        const response = await apiClient.get("/user-info");
        set({ user: response.data });
      } catch {
        set({ user: null });
      } finally {
        set({ loading: false });
      }
    },

    clearUser: () => set({ user: null, loading: false }),
  };
});


export default useAuthStore;
