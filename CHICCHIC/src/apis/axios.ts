import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

// retry 플래그
interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// refresh의 중복 요청 방지
let refreshPromise: Promise<string | null> | null = null;

// axiosInstance 생성
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

    // accessToken Bearer 토큰 형식으로 추가
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.warn("acceessToken이 없습니다.");
    }
    return config;
  },
  // 에러처리
  (error) => Promise.reject(error)
);

// 응답 인터셉터 : 401 에러 refreshToken으로 갱신 처리
axiosInstance.interceptors.response.use(
  // 정상 응답
  (response) => response,
  async (error) => {
    const originalRequest: RetryableAxiosRequestConfig = error.config;

    if (
      error.response &&
      // 401 에러 처리
      error.response.status === 401 &&
      // 재시도 하지 않은 경우 처리
      !originalRequest._retry
    ) {
      if (originalRequest.url == "/auth/token/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = async () => {
          const { getItem: getRefreshToken } = useLocalStorage();
        };
      }
    }
  }
);
