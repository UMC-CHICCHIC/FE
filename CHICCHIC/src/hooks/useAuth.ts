import { useCallback } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { clearAuthTokens, getAccessToken, getRefreshToken } from "../utils/authStorage";

export function useAuth() {
  const {
    user,
    isRefreshing,
    isInitialized,
    setUser,
    setIsRefreshing,
    setIsInitialized,
    login: storeLogin,
    logout: storeLogout,
  } = useAuthStore();
  
  const logout = useCallback(() => {
    clearAuthTokens(); // 토큰 삭제
    storeLogout(); // 스토어 상태 초기화
  }, [storeLogout]);

  return {
    // 상태
    user,
    isRefreshing,
    isInitialized,
    isLoggedIn: !!getAccessToken() || !!getRefreshToken() || isRefreshing,
    
    // 액션
    login: storeLogin,
    logout,
    setUser,
    setIsRefreshing,
    setIsInitialized,
  };
}