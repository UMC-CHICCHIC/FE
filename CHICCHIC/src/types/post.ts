import type { CommonResponse, PaginatedResponse } from "./common";
import type { PostCategory } from "./enums/postCategory";

export type Post = {
  memberId: number;
  nickname: string;
  consultId: number;
  postType: PostCategory;
  title: string;
  imageUrl?: string;
  dateTime: string;
};

// 게시글 미리보기 정보
export type PostPrev = {
  consultId: number;
  postType: PostCategory;
  title: string;
  content: number;
  imageUrl?: string;
};

// 게시글 카테고리 enum 타입
export const POST_CATEGORY: Record<PostCategory, string> = {
  GIVE: "추천해요!",
  RECEIVE: "추천 받아요!",
};

// 향수 추천 게시글 작성 요청
export type RequestCreatePostDto = {
  postType: PostCategory;
  title: string;
  content: string;
  imageUrl: string;
};

// export type CategoryPost = {
//   recievePost: PostPrev;
//   givePost: PostPrev;
// };

// /consult-posts에 대한 ResponseDto
export type ResponsePostListDto = PaginatedResponse<Post[]>;

// /consult-posts/home에 대한 ResponseDto
export type ResponsePostPrevDto = CommonResponse<{
  recievePost: Post;
  givePost: Post;
}>;

// export type ResponseDetailPostDto =
