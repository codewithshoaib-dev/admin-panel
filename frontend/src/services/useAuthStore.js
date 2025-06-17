import { create } from "zustand";
import apiClient from "../configs/axios";
import axios from "axios";

const useAuthStore = create((set) => {
  const fetchUser = async () => {
    console.log("fetchUser called");
    try {
      const response = await apiClient.get("user-info");
      set({ user: response.data });
    } catch(err) {
      console.error('error', err)
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  };

  const clearUser = () => set({ user: null, loading: false });

  return {
    user: null,
    loading: true,
    fetchUser,
    clearUser,
  };
});



export default useAuthStore;
