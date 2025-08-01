import { axiosInstance } from "./axiosInstance";

interface UserInfo {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  nickname: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface SignupPayload {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phoneNumber: string;
  nickname: string;
}

export const getUserInfo = () => {
  return axiosInstance.get<{
    isSuccess: boolean;
    code: string;
    message: string;
    result: UserInfo;
  }>("/api/v1/auth/info");
};

export const postLogin = (data: LoginPayload) => {
  return axiosInstance.post("/api/v1/auth/login", data);
};

export const postSignup = (data: SignupPayload) => {
  return axiosInstance.post("/api/v1/auth/signup", data);
};
