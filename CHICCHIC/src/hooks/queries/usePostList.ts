import { useQuery } from "@tanstack/react-query";
import type { PostCategory } from "../../types/enums/postCategory";
import type { ResponseConsultPostistDto } from "../../types/post";
import { QUERY_KEY } from "../../constants/key";
import { getConsultPostList } from "../../apis/postApi";

export const usePostList = (category: PostCategory) => {
  return useQuery<ResponseConsultPostistDto, Error>({
    queryKey: [QUERY_KEY.post, category],
    queryFn: () => getConsultPostList(category),
    // 3분간 캐시 유지
    staleTime: 1000 * 60 * 3,
  });
};
