import { useAuthStore } from "../store/useAuthStore";
import { getAccessToken, getRefreshToken } from "../utils/authStorage";

export function useAuth() {
  const {
    user,
    isRefreshing,
    isInitialized,
    setUser,
    setIsRefreshing,
    setIsInitialized,
    login: storeLogin,
  } = useAuthStore();

  return {
    // 상태
    user,
    isRefreshing,
    isInitialized,
    isLoggedIn: !!getAccessToken() || !!getRefreshToken() || isRefreshing,
    
    // 액션
    login: storeLogin,
    setUser,
    setIsRefreshing,
    setIsInitialized,
  };
}