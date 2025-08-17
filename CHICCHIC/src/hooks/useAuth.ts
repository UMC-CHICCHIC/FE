import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { getAccessToken, getRefreshToken } from "../utils/authStorage";
import { getUserInfo } from "../apis/auth";

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

  const [loading, setLoading] = useState(true);

  // 토큰 재발급 받을 때 로그인 페이지로 리다이렉트 막기 위함(protectedroute 때문에)
  const isLoggedIn = !!getAccessToken() || !!getRefreshToken() || isRefreshing;

  useEffect(() => {
    if (isInitialized) {
      setLoading(false);
      return;
    }

    const verifyAndInitialize = async () => {
      setLoading(true);
      
      const hasAccessToken = !!getAccessToken();
      const hasRefreshToken = !!getRefreshToken();

      // 토큰이 아예 없으면 바로 초기화 완료
      if (!hasAccessToken && !hasRefreshToken) {
        setIsInitialized(true);
        setLoading(false);
        return;
      }

      // accessToken 있으면 유효성 검증
      if (hasAccessToken) {
        try {
          const response = await getUserInfo();
          if (response.data.isSuccess && response.data.result) {
            setUser(response.data.result);
          } else {
            // accessToken 만료, refreshToken이 있으면 갱신 시도
            if (hasRefreshToken) {
              console.log("AccessToken 무효, RefreshToken으로 갱신 시도");
              // 여기서 토큰 갱신 로직 실행 (axiosInstance에서 처리)
            } else {
              storeLogout();
            }
          }
        } catch (error) {
          console.error("토큰 검증 실패:", error);
          // refreshToken이 있으면 갱신 시도, 없으면 로그아웃
          if (!hasRefreshToken) {
            storeLogout();
          }
        }
      }

      setIsInitialized(true);
      setLoading(false);
    };

    verifyAndInitialize();
  }, [isInitialized, setUser, setIsInitialized, storeLogout]);

  // 🔥 다중 탭 동기화
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken" || e.key === "refreshToken") {
        // 토큰 변화 시 상태 업데이트 트리거
        const hasToken = !!getAccessToken() || !!getRefreshToken();
        if (!hasToken) {
          storeLogout();
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storeLogout]);

  return {
    // 상태
    user,
    loading,
    isRefreshing,
    isInitialized,
    isLoggedIn,
    
    // 액션
    login: storeLogin,
    logout: storeLogout,
    setUser,
    setIsRefreshing,
    setIsInitialized,
  };
}