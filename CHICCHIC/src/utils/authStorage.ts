import { LOCAL_STORAGE_KEY } from "../constants/key";

// accessToken
export const getAccessToken = (): string | null =>
  localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

export const setAccessToken = (token: string): void =>
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);

// refreshToken
export const getRefreshToken = (): string | null =>
  localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

export const setRefreshToken = (token: string): void =>
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);

// 둘 다 삭제 (로그아웃)
export const clearAuthTokens = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
};