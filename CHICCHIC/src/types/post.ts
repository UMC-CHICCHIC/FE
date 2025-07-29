// 게시글 정보
export type PostPrev = {
  postId: number;
  title: string;
  writer: string;
  createdAt: string;
  commentCount?: number;
  image?: string;
};

export type PostCategory = "RECOMMEND" | "RECOMMENDED";

// 게시글 카테고리 enum 타입
export const POST_CATEGORY: Record<PostCategory, string> = {
  RECOMMEND: "추천해요!",
  RECOMMENDED: "추천 받아요!",
};
