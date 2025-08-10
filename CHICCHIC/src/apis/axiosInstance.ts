import axios from "axios";
import { getAccessToken } from "../utils/authStorage";
//import axios { type InternalAxiosRequestConfig } from "axios";

// retry 플래그
// interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
//   _retry?: boolean;
// }

// 전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지
//let refreshPromise: Promise<string> | null = null;

// 모든 요청에 백엔드 주소 붙여줌
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL, // env 파일
  withCredentials: true,
});

// 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const noAuthPaths = [
      "/api/v1/auth/login",
      "/api/v1/auth/signup",
      // 필요시 소셜 로그인 등
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
