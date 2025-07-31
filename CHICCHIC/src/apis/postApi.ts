import axios from "axios";
import { axiosInstance } from "./axiosInstance";

interface LoginPayload {
  username: string;
  password: string;
}

export const postLogin = (data: LoginPayload) => {
  return axiosInstance.post("/api/v1/auth/login", data);
};

interface SignupPayload {
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