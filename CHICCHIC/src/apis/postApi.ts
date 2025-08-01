import { axiosInstance } from "./axios";
import type { PostCategory } from "../types/enums/postCategory";
import type { ResponsePostListDto } from "../types/post";
import type { RequestImgDto, ResponseUploadImg } from "../types/img";

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

export const uploadImg = async (
  file: RequestImgDto
): Promise<ResponseUploadImg> => {
  try {
    const { data } = await axiosInstance.post("/images/upload", file);
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
