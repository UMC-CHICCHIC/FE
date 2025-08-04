import { axiosInstance } from "./axiosInstance";
import type { PostCategory } from "../types/enums/postCategory";
import type { ResponsePostListDto, RequestCreatePostDto } from "../types/post";
import type { ResponseUploadImg } from "../types/img";

// 향수 추천 상담소 게시글 리스트 조회
export const getConsultPostList = async (
  category: PostCategory
): Promise<ResponsePostListDto> => {
  const { data } = await axiosInstance.get("/consult-posts", {
    params: { category },
  });
  console.log("요청보냄");
  return data;
};

// export const getPostDetail = async ({
//   consultId,
// }): Promise<Re>
// 향수 디테일
// export const getPostDetail = async ({
//   consultId,
// }): Promise<>

// 이미지 업로드 유틸
const upLoadImg = async (
  file: File,
  endpoint: string
): Promise<ResponseUploadImg> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post(endpoint, formData);
    return data;
  } catch (e) {
    console.error("이미지 업로드 실패", e);
    throw e;
  }
};

// 게시글 포스트에 대한 이미지 업로드
export const uploadPostImg = (file: File) => {
  upLoadImg(file, "/images/upload");
};
// 프로필 아바타 설정에 대한 이미지 업로드
export const uploadProfileImg = (file: File) => {
  upLoadImg(file, "/users/me");
};
