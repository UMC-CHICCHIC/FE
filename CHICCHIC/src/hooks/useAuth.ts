import { useAuthStore } from "../store/useAuthStore";
import { getAccessToken, getRefreshToken } from "../utils/authStorage";

export function useAuth() {
  const isRefreshing = useAuthStore((state) => state.isRefreshing);
  
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  const isLoggedIn = !!accessToken || !!refreshToken || isRefreshing;
  
  return { isLoggedIn, isRefreshing };
}