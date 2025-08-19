import { useQuery } from "@tanstack/react-query";
import type { PostCategory } from "../../types/enums/category";
import type {
  ResponseConsultDetailDto,
  ResponseConsultListDto,
  ResponseConsultPostPrevDto,
  ResponseConsultPreviewDto,
} from "../../types/post";
import { QUERY_KEY } from "../../constants/key";
import {
  getConsultPostDetail,
  getConsultPostHome,
  getConsultPostList,
  getConsultPostPreview,
} from "../../apis/posts";

// 추천 상담소 페이지 게시글 리스트 (리스트 더보기)
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

// 추천 상담소 페이지 게시글 디테일 (글쓰기)
export const useGetConsultDetail = (consultPostId: number | undefined) => {
  return useQuery<ResponseConsultDetailDto, Error>({
    queryKey: [QUERY_KEY.consultPosts, consultPostId],
    queryFn: () => getConsultPostDetail(consultPostId as number),
    enabled: !!consultPostId,
    staleTime: 60_000,
  });
};

// 추천 상담소 페이지 게시글 미리보기 (커뮤니티 홈)
export const useGetConsultComHome = () => {
  return useQuery<ResponseConsultPreviewDto, Error>({
    queryKey: [QUERY_KEY.consultPosts, "preview"],
    queryFn: getConsultPostPreview,
    staleTime: 1000 * 60,
  });
};

// 추천 상담소 페이지 게시글 (추천상담소 홈)
export const useGetConsultHome = () => {
  return useQuery<ResponseConsultPostPrevDto, Error>({
    queryKey: [QUERY_KEY.consultPosts, "home"],
    queryFn: getConsultPostHome,
    staleTime: 1000 * 60,
  });
};
