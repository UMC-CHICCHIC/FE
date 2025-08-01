import { axiosInstance } from "./axiosInstance";

export interface LoginPayload {
  username: string;
  password: string;
}

export const postLogin = (data: LoginPayload) => {
  return axiosInstance.post("/api/v1/auth/login", data);
};

export interface SignupPayload {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phoneNumber: string;
  nickname: string;
}

export const postSignup = (data: SignupPayload) => {
  return axiosInstance.post("/api/v1/auth/signup", data);
};

export interface UserInfo {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  nickname: string;
}

export const getUserInfo = () => {
  return axiosInstance.get<{ isSuccess: boolean; code: string; message: string; result: UserInfo }>(
    "/api/v1/auth/info"
  );
};