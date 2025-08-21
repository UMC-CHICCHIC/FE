import axios from "axios";
import { 
  getAccessToken, 
  getRefreshToken, 
  setAccessToken, 
  setRefreshToken, 
  clearAuthTokens,
  getRememberMe 
} from "../utils/authStorage";
import { useAuthStore } from "../store/useAuthStore";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const noAuthPaths = [
      "/api/v1/auth/login",
      "/api/v1/auth/signup",
      "/member/reissue",
  // public API: 인기 상품은 토큰 불필요
  "/home/popular-products",
    ];
    
    if (noAuthPaths.some((path) => config.url?.includes(path))) {
      return config;
    }

    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearAuthTokens();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return refreshPromise?.then(() => axiosInstance(originalRequest));
    }

    isRefreshing = true;
    useAuthStore.getState().setIsRefreshing(true);
    console.log("재발급 시작");

    refreshPromise = axios.post(
      `${import.meta.env.VITE_SERVER_API_URL}/member/reissue`,
      { refreshToken }
    ).then((res) => {
      console.log("재발급 응답:", res.data);
      const { accessToken: newAT, refreshToken: newRT } = res.data.result ?? res.data;
      if (!newAT) throw new Error("No accessToken from reissue");

      // 기존 rememberMe 설정을 유지하여 토큰 저장
      const rememberMe = getRememberMe();
      setAccessToken(newAT, rememberMe);
      if (newRT) setRefreshToken(newRT, rememberMe);
      
      console.log("재발급 성공, 원요청 재시도");
      return res;
    }).catch((e) => {
      console.error("재발급 실패", e);
      clearAuthTokens();
      throw e;
    }).finally(() => {
      isRefreshing = false;
      refreshPromise = null;
      useAuthStore.getState().setIsRefreshing(false);
      console.log("재발급 끝");
    });

    try {
      await refreshPromise;
      originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
      return axiosInstance(originalRequest);
    } catch (e) {
      return Promise.reject(e);
    }
  }
);
