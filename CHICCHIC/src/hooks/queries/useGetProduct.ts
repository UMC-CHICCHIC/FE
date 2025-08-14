import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PerfumeCategory } from "../../types/enums/category";
import {
  getPerfumeCategory,
  getPerfumeDetail,
  getPerfumeList,
  getProductReview,
} from "../../apis/products";
import type {
  GetProductsParams,
  ResponseProductCategoryDto,
  ResponseProductDetailDto,
} from "../../types/products";
import { QUERY_KEY } from "../../constants/key";
import type { ProductReview } from "../../types/perfumes";

// 향수 상품 카테고리 (노트, 가격대, 발향률)
export function useGetProductCategory(type: PerfumeCategory) {
  return useQuery<ResponseProductCategoryDto, Error>({
    queryKey: [QUERY_KEY.categories, type],
    queryFn: () => getPerfumeCategory(type),
    staleTime: 1000 * 60 * 3,
  });
}

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
    queryFn: () => getProductReview(perfumeId, page, size),
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
