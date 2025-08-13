import { create } from "zustand";

interface AuthState {
  isRefreshing: boolean;
  setIsRefreshing: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isRefreshing: false,
  
  setIsRefreshing: (value: boolean) => set({ isRefreshing: value }),
}));