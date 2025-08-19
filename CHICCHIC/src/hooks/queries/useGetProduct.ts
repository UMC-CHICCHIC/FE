import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PostCategory } from "../../types/enums/category";
import {
  getPerfumeDetail,
  getProductReview,
  getCategories,
  getPerfumeList,
  getScrapList,
} from "../../apis/products";
import type {
  GetProductsParams,
  ProductCategory,
  ResponseProductDetailDto,
} from "../../types/products";
import { QUERY_KEY } from "../../constants/key";

// 향수 상품 카테고리 (노트, 가격대, 발향률)
export const useGetCategories = (type?: PostCategory) => {
  return useQuery<ProductCategory[], Error>({
    queryKey: [QUERY_KEY.categories, type ?? "ALL"],
    queryFn: () => getCategories(type),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000,
  });
};

// 향수 상품 상세
export function useGetProductDetail(id?: number) {
  return useQuery<ResponseProductDetailDto, Error>({
    queryKey: [QUERY_KEY.products, id],
    queryFn: () => getPerfumeDetail(id!),
    enabled: typeof id === "number",
  });
}

// 향수 상품 리뷰 조회
export function useGetProductReview(perfumeId: number, page = 1, size: number) {
  return useQuery({
    queryKey: [QUERY_KEY.reviews, perfumeId, page, size],
    queryFn: () => getProductReview(perfumeId, page, size),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 10,
  });
}

// 향수 상품 리스트 조회
export function useGetProductList(params: GetProductsParams) {
  return useQuery({
    queryKey: [QUERY_KEY.reviews, params],
    queryFn: () => getPerfumeList(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}

// 스크랩 상태 확인 (isScrapped)
export function useScrapStatus(perfumeId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.scraps],
    queryFn: getScrapList,
    select: (res) => res.result.some((i) => i.id === perfumeId),
    enabled: !!perfumeId,
  });
}
