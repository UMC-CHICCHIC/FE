import { axiosInstance } from "./axiosInstance";
import type { PostCategory } from "../types/enums/category";
import type {
  ResponseConsultListDto,
  RequestCreatePostDto,
  ResponseConsultCreateDto,
  ResponseConsultDetailDto,
} from "../types/post";
import type { ResponseUploadImg } from "../types/img";

// 향수 추천 상담소 게시글 리스트 조회
export const getConsultPostList = async (
  category: PostCategory,
  page = 0,
  size = 5
): Promise<ResponseConsultListDto> => {
  try {
    console.log("요청 카테고리", category);
    const { data } = await axiosInstance.get<ResponseConsultListDto>(
      "/consult-posts",
      {
        params: { type: category, page, size },
      }
    );
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
  const { data } = await axiosInstance.get<ResponseConsultDetailDto>(
    `/consult-posts/${consultPostId}`
  );
  console.log("요청보냄");
  return data;
};

// 향수 추천 상담소 게시글 포스트
export const createConsultPost = async (
  body: RequestCreatePostDto
): Promise<ResponseConsultCreateDto> => {
  const { data } = await axiosInstance.post("/consult-posts", body);
  return data;
};

// 이미지 업로드 유틸
const upLoadImg = async (
  file: File,
  endpoint: string
): Promise<ResponseUploadImg> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axiosInstance.post(endpoint, formData);
  return data;
};

// 게시글 포스트에 대한 이미지 업로드
export const uploadPostImg = (file: File) => {
  return upLoadImg(file, "/images/upload");
};
// 프로필 아바타 설정에 대한 이미지 업로드
export const uploadProfileImg = (file: File) => {
  return upLoadImg(file, "/users/me");
};
