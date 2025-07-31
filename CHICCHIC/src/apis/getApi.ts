import { axiosInstance } from "./axiosInstance";

interface UserInfo {
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