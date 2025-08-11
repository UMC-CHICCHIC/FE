import { LOCAL_STORAGE_KEY } from "../constants/key";

// accessToken
export const getAccessToken = (): string | null =>
  localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

export const setAccessToken = (token: string): void =>
  localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, token);

export const removeAccessToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
};

// refreshToken
export const getRefreshToken = (): string | null =>
  localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);

export const setRefreshToken = (token: string): void =>
  localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, token);

export const removeRefreshToken = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
};

// 둘 다 삭제 (로그아웃)
export const clearAuthTokens = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
};