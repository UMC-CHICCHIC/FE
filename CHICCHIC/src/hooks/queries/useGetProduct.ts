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
import type { ProductReview } from "../../types/perfumes";

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
export function useGetProductReview(perfumeId: number, page = 1, size = 10) {
  return useQuery<ProductReview[], Error>({
    queryKey: [QUERY_KEY.perfumes, perfumeId, page, size],
    queryFn: async () => {
      const res = await getProductReview(perfumeId, page, size);
      return res.result ?? []; // 배열만 반환
    },
    staleTime: 1000 * 60,
  });
}
// 향수 상품 리스트 조회
export function useGetProductList(params: GetProductsParams) {
  return useQuery({
    queryKey: [QUERY_KEY.products, params],
    queryFn: () => getPerfumeList(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 3,
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
