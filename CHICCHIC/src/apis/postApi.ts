import { axiosInstance } from "./axios";
import type { PostCategory } from "../types/enums/postCategory";
import type { ResponsePostListDto, RequestCreatePostDto } from "../types/post";

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

// export const getPostDetail = async ({
//   consultId,
// }): Promise<Re>
