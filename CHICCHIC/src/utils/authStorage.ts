import { LOCAL_STORAGE_KEY } from "../constants/key";

// rememberMe 상태 관리
export const getRememberMe = (): boolean => {
  return localStorage.getItem("rememberMe") === "true";
};

export const setRememberMe = (remember: boolean): void => {
  localStorage.setItem("rememberMe", String(remember));
};

export const getAccessToken = (): string | null => {
  // localStorage 우선 확인, 없으면 sessionStorage 확인
  return localStorage.getItem(LOCAL_STORAGE_KEY.accessToken) ||
         sessionStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
};

export const setAccessToken = (token: string, rememberMe: boolean = getRememberMe()): void => {
  if (rememberMe) {
    localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
    sessionStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  } else {
    sessionStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);
    localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  }
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  sessionStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken) ||
         sessionStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
};

export const setRefreshToken = (token: string, rememberMe: boolean = getRememberMe()): void => {
  if (rememberMe) {
    localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
    sessionStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
  } else {
    sessionStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);
    localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
  }
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
  sessionStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
};

export const clearAuthTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
  localStorage.removeItem("rememberMe");
};

export const saveAuthTokens = (
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean
): void => {
  setRememberMe(rememberMe);
  setAccessToken(accessToken, rememberMe);
  setRefreshToken(refreshToken, rememberMe);
};