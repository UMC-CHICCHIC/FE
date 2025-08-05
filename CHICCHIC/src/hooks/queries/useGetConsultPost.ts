import { useQuery } from "@tanstack/react-query";
import type { PostCategory } from "../../types/enums/postCategory";
import type { ResponseConsultListDto } from "../../types/post";
import { QUERY_KEY } from "../../constants/key";
import { getConsultPostList } from "../../apis/postApi";

// 추천 게시물 GET 훅
export const useGetConsultPost = (category: PostCategory) => {
  return useQuery<ResponseConsultListDto, Error>({
    queryKey: [QUERY_KEY.post, category],
    queryFn: () => getConsultPostList(category),
    // 3분간 캐시 유지
    staleTime: 1000 * 60 * 3,
  });
};
