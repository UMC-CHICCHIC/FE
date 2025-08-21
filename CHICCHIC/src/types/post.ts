import type { CommonResponse, PaginatedResponse } from "./common";
import type { PostCategory } from "./enums/category";

// 추천 게시글 정보
export type ConsultPost = {
  memberId: number;
  nickname: string;
  profile: string;
  consultPostId: number;
  postType: PostCategory;
  title: string;
  imageUrl?: string;
  dateTime: string;
  content?: string;
};

// 추천 게시글 미리보기 정보
export type ConsultPostPrev = {
  consultPostId: number;
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

// 추천 게시글 댓글
export type Consult = {
  memberId: number;
  nickname: string;
  profile?: string;
  content: string;
  hierarchy: number;
  order: number;
  group: number;
  dateTime: string;
};

// 한 부모 댓글과 그에 속한 답글들
export type ConsultCommentGroup = {
  groupId: number;
  parent: Consult;
  replies: Consult[];
};

// 댓글, 대댓글 Post 요청
export type RequestConsultCommentDto = {
  content: string;
};

// 댓글 Get 응답
export type ResponseConsultCommentsDto = CommonResponse<{
  content: ConsultCommentGroup[];
}>;

// 댓글, 대댓글 Post 응답
export type ResponseConsultReplyDto = CommonResponse<{
  commentId: number;
  groupId: number;
}>;

// /consult-posts에 대한 GetResponseDto
export type ResponseConsultListDto = PaginatedResponse<ConsultPost[]>;

// /consult-posts에 대한 PostResponseDto
export type ResponseConsultCreateDto = CommonResponse<ConsultPost>;

// /consult-posts/home에 대한 ResponseDto
export type ResponseConsultPostPrevDto = CommonResponse<{
  receivePosts: ConsultPost[];
  givePosts: ConsultPost[];
}>;

// /consult-posts/{consultPostId}에 대한 ResponseDto
export type ResponseConsultDetailDto = CommonResponse<ConsultPost>;

// 일기 게시글 정보
export type DiaryPost = {
  id: number;
  title: string;
  content: string;
  nickName: string;
  imageUrl?: string;
  createdAt: string;
  isPublic: boolean;
};

// /diary/{id}에 대한 ResponseDto
export type ResponseDiaryDetailDto = CommonResponse<DiaryPost>;

// 일기 댓글 작성 요청
export type RequestCreateDiaryCommentDto = {
  content: string;
  parentCommentId?: number;
};

// 일기 댓글 작성 응답
export type ResponseCreateDiaryCommentDto = CommonResponse<{
  commentId: number;
  diaryId: number;
  content: string;
  nickName: string;
  createdAt: string;
  parentCommentId?: number;
}>;

// 일기 댓글 정보
export type DiaryComment = {
  commentId: number;
  content: string;
  nickName: string;
  createdAt: string;
  parentCommentId?: number;
  profileImageUrl: string;
  replies?: DiaryComment[];
};

// 일기 댓글 목록 조회 응답
export type ResponseDiaryCommentsDto = CommonResponse<DiaryComment[]>;

// /consult-posts/preivew에 대한 ResponseDto
export type ResponseConsultPreviewDto = CommonResponse<{
  receivePost: ConsultPostPrev;
  givePost: ConsultPostPrev;
}>;
