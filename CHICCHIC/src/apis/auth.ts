import { axiosInstance } from "./axiosInstance";
import type { LoginPayload, SignupPayload, UserInfo, UpdateUserInfoPayload } from "../types/authtypes";

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
  }>("/member/info");
};

export const putUserInfo = (data: UpdateUserInfoPayload) => {
  return axiosInstance.put("/member/info", data);
};

export const deleteUserInfo = () => {
  return axiosInstance.delete("/member/info");
};

export const getProfileImage = () => {
  return axiosInstance.get<{ result: string }>("/member/profile-image");
};

export const putProfileImage = (formData: FormData) => {
  return axiosInstance.put<{ result: string }>("/member/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
