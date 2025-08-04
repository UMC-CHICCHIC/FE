import type { CommonResponse, PaginatedResponse } from "./common";
import type { PostCategory } from "./enums/postCategory";

// 추천 게시글 정보
export type ConsultPost = {
  memberId: number;
  nickname: string;
  consultId: number;
  postType: PostCategory;
  title: string;
  imageUrl?: string;
  dateTime: string;
};

// 추천 게시글 미리보기 정보
export type ConsultPostPrev = {
  consultId: number;
  postType: PostCategory;
  title: string;
  content: string;
  imageUrl?: string;
};

// 추천 게시글 카테고리 enum 타입
export const POST_CATEGORY: Record<PostCategory, string> = {
  GIVE: "추천해요!",
  RECEIVE: "추천 받아요!",
};

// 추천 게시글 작성 요청
export type RequestCreatePostDto = {
  postType: PostCategory;
  title: string;
  content: string;
  imageUrl: string;
};

// /consult-posts에 대한 ResponseDto
export type ResponseConsultLPostistDto = PaginatedResponse<ConsultPost[]>;

// /consult-posts/home에 대한 ResponseDto
export type ResponseConsultPostPrevDto = CommonResponse<{
  receivePost: ConsultPostPrev;
  givePost: ConsultPostPrev;
}>;
