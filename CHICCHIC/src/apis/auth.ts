import { axiosInstance } from "./axiosInstance";
import type { PostCategory } from "../types/enums/postCategory";
import type { ResponsePostListDto } from "../types/post";
import type { ResponseUploadImg } from "../types/img";
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

// 향수 추천 상담소 게시글 리스트 조회
export const getPostList = async (
  category: PostCategory
): Promise<ResponsePostListDto> => {
  const { data } = await axiosInstance.get("/consult-posts", {
    params: { category },
  });
  console.log("요청보냄");
  return data.data;
};

// 향수 디테일
// export const getPostDetail = async ({
//   consultId,
// }): Promise<>

// 이미지 업로드
export const uploadImg = async (file: File): Promise<ResponseUploadImg> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post("/images/upload", formData);
    return data;
  } catch (e) {
    console.error("이미지 업로드 실패", e);
    throw e;
  }
};
