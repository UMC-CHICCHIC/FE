import { axiosInstance } from "./axiosInstance";
import type { PostCategory } from "../types/enums/postCategory";
import type {
  ResponseConsultListDto,
  RequestCreatePostDto,
  ResponseConsultCreateDto,
  ResponseConsultDetailDto,
} from "../types/post";
import type { ResponseUploadImg } from "../types/img";

// 향수 추천 상담소 게시글 리스트 조회
export const getConsultPostList = async (
  category: PostCategory
): Promise<ResponseConsultListDto> => {
  try {
    console.log("요청 카테고리", category);
    const { data } = await axiosInstance.get("/consult-posts", {
      params: { type: category, page: 0, size: 5 },
    });
    console.log("요청보냄");
    return data;
  } catch (e) {
    console.error("요청 실패", e);
    throw e;
  }
};

// 향수 추천 상담소 게시글 상세
export const getConsultPostDetail = async (
  consultPostId: number
): Promise<ResponseConsultDetailDto> => {
  try {
    console.log("게시글 상세", consultPostId);
    const { data } = await axiosInstance.get(
      `/consult-posts/${consultPostId}`,
      {
        params: consultPostId,
      }
    );
    console.log("요청보냄");
    return data;
  } catch (e) {
    console.error("요청 실패", e);
    throw e;
  }
};

// 향수 추천 상담소 게시글 포스트
export const createConsultPost = async (
  body: RequestCreatePostDto
): Promise<ResponseConsultCreateDto> => {
  try {
    const { data } = await axiosInstance.post("/consult-posts", body);
    return data;
  } catch (e) {
    console.error("게시글 작성 에러", e);
    throw e;
  }
};

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
  return upLoadImg(file, "/images/upload");
};
// 프로필 아바타 설정에 대한 이미지 업로드
export const uploadProfileImg = (file: File) => {
  return upLoadImg(file, "/users/me");
};
