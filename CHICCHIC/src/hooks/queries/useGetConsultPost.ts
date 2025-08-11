import { useQuery } from "@tanstack/react-query";
import type { PostCategory } from "../../types/enums/postCategory";
import type {
  ResponseConsultDetailDto,
  ResponseConsultListDto,
} from "../../types/post";
import { QUERY_KEY } from "../../constants/key";
import { getConsultPostDetail, getConsultPostList } from "../../apis/posts";

// 추천 상담소 페이지 게시글 리스트
export const useGetConsultPost = (
  category: PostCategory,
  page = 0,
  size = 5
) => {
  return useQuery<ResponseConsultListDto, Error>({
    queryKey: [QUERY_KEY.consultPosts, category, page, size],
    queryFn: () => getConsultPostList(category, page, size),
    // 3분간 캐시 유지
    staleTime: 1000 * 60 * 3,
  });
};

// 추천 상담소 페이지 게시글 디테일
export const useGetConsultDetail = (consultPostId: number | null) => {
  return useQuery<ResponseConsultDetailDto, Error>({
    queryKey: [QUERY_KEY.consultPosts, consultPostId],
    queryFn: () => getConsultPostDetail(consultPostId!),
    enabled: !!consultPostId,
  });
};
