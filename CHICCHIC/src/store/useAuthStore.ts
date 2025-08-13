import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getAccessToken, getRefreshToken } from "../utils/authStorage";
import type { UserInfo } from "../types/authtypes";

interface AuthState {
  user: UserInfo | null;
  isInitialized: boolean;
  isRefreshing: boolean;
  setUser: (user: UserInfo | null) => void;
  setIsInitialized: (value: boolean) => void;
  setIsRefreshing: (value: boolean) => void;
  login: (user: UserInfo) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isInitialized: false,
      isRefreshing: false,

      setUser: (user) => set({ user }),
      setIsInitialized: (value) => set({ isInitialized: value }),
      setIsRefreshing: (value) => set({ isRefreshing: value }),

      login: (user) => set({ user, isInitialized: true }),
      logout: () => set({ user: null, isRefreshing: false }),

      isLoggedIn: () => {
        const { user, isRefreshing } = get();
        return !!user && (!!getAccessToken() || !!getRefreshToken() || isRefreshing);
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isInitialized: state.isInitialized
      }),
    }
  )
);
