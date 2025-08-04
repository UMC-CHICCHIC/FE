import { axiosInstance } from "./axios";
import type { PostCategory } from "../types/enums/postCategory";
import type { ResponsePostListDto } from "../types/post";
import type { ResponseUploadImg } from "../types/img";

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

// 게시글 포스트에 대한 이미지 업로드
export const uploadPostImg = async (file: File): Promise<ResponseUploadImg> => {
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

// 프로필 아바타 설정에 대한 이미지 업로드
export const uploadProfileImg = async (
  file: File
): Promise<ResponseUploadImg> => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await axiosInstance.post("/users/me", formData);
    return data;
  } catch (e) {
    console.error("이미지 업로드 실패", e);
    throw e;
  }
};
