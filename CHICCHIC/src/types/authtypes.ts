export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  password: string;
  passwordConfirm: string;
  email: string;
  phoneNumber: string;
  nickname: string;
}

export interface UserInfo {
  email: string;
  phoneNumber: string;
  nickname: string;
}

export interface UpdateUserInfoPayload {
  nickname: string;
  phoneNumber: string;
}