import { axiosInstance } from "./axiosInstance";
import type {
  LoginPayload,
  SignupPayload,
  UserInfo,
  UpdateUserInfoPayload,
} from "../types/authtypes";
import type { CommonResponse } from "../types/common";

export const postLogin = (data: LoginPayload) => {
  return axiosInstance.post("/api/v1/auth/login", data);
};

export const postSignup = (data: SignupPayload) => {
  return axiosInstance.post("/api/v1/auth/signup", data);
};

export const deleteLogout = () => {
  return axiosInstance.delete<CommonResponse<string>>("/member/logout");
};

export const getUserInfo = () => {
  return axiosInstance.get<CommonResponse<UserInfo>>("/member/info");
};

export const putUserInfo = (data: UpdateUserInfoPayload) => {
  return axiosInstance.put<CommonResponse<UserInfo>>("/member/info", data);
};

export const deleteUserInfo = () => {
  return axiosInstance.delete<CommonResponse<string>>("/member/info");
};

export const getProfileImage = () => {
  return axiosInstance.get<CommonResponse<string>>("/member/profile-image");
};

export const putProfileImage = (formData: FormData) => {
  return axiosInstance.put<CommonResponse<string>>(
    "/member/profile-image",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const deleteProfileImage = () => {
  return axiosInstance.delete<CommonResponse<string>>("/member/profile-image");
};
