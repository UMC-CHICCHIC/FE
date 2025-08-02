export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  password: string;
  passwordConfirm: string;
  email: string;
  phoneNumber: string;
  nickname: string;
}

export interface UserInfo {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  nickname: string;
}