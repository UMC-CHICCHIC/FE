import { axiosInstance } from "./axiosInstance";
import type { LoginPayload, SignupPayload, UserInfo } from "../types/authtypes";

export const postLogin = (data: LoginPayload) => {
  return axiosInstance.post("/api/v1/auth/login", data);
};

export const postSignup = (data: SignupPayload) => {
  return axiosInstance.post("/api/v1/auth/signup", data);
};

export const getUserInfo = () => {
  return axiosInstance.get<{
    isSuccess: boolean;
    code: string;
    message: string;
    result: UserInfo;
  }>("/api/v1/auth/info");
};
