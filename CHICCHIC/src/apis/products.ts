import type { PerfumeCategory } from "../types/enums/category";
import type {
  ProductReview,
  RequestProductReviewDto,
  ResponseProductReviewDto,
  ResponseScrapDto,
  ResponseScrapListDto,
  ResponseUpdateReviewDto,
} from "../types/perfumes";
import type {
  GetProductsParams,
  ProductCategory,
  ResponseProductDetailDto,
  ResponseProductListDto,
} from "../types/products";
import { axiosInstance } from "./axiosInstance";

// 향수 카테고리 조회 (가격대, 발향률)
export const getCategories = async (
  type?: PerfumeCategory
): Promise<ProductCategory[]> => {
  const { data } = await axiosInstance.get<ProductCategory[]>("/categories", {
    params: type ? { type } : undefined,
  });
  return data;
};

// 향수 카테고리 조회 (인기순, 낮은 가격순, 높은 가격순, 누적판매순, 리뷰많은순, 평점높은순)
export const getPerfumeList = async (
  p: GetProductsParams
): Promise<ResponseProductListDto> => {
  const params = new URLSearchParams();

  if (p.cat !== undefined) params.set("cat", String(p.cat));
  if (p.page !== undefined) params.set("page", String(p.page));
  if (p.size !== undefined) params.set("size", String(p.size));

  // sort 중복 제거
  if (p.sort) {
    const sortValues = Array.isArray(p.sort) ? p.sort : [p.sort];
    const uniqueSort = Array.from(new Set(sortValues));
    uniqueSort.forEach((s) => params.append("sort", s));
  }

  const { data } = await axiosInstance.get<ResponseProductListDto>(
    `/products?${params.toString()}`
  );
  return data;
};

// 상품 상세정보 조회
export const getPerfumeDetail = async (
  id: number
): Promise<ResponseProductDetailDto> => {
  console.log("요청 id", id);
  const { data } = await axiosInstance.get<ResponseProductDetailDto>(
    `/products/detail/${id}`
  );
  return data;
};

// 상품 리뷰 조회
export const getProductReview = async (
  perfumeId: number,
  page = 1,
  size = 10
): Promise<ProductReview[]> => {
  console.log("요청 params", perfumeId, page, size);
  const { data } = await axiosInstance.get<ResponseProductReviewDto>(
    `/perfumes/${perfumeId}/reviews`,
    {
      params: { page, size },
    }
  );
  return data.result ?? [];
};

// 상품 리뷰 생성
export const createProductReview = async (
  perfumeId: number,
  body: RequestProductReviewDto
): Promise<ResponseUpdateReviewDto> => {
  const { data } = await axiosInstance.post<ResponseUpdateReviewDto>(
    `/perfumes/${perfumeId}/reviews`,
    body
  );
  return data;
};

// 상품 리뷰 삭제
export const deleteProductReview = async (
  perfumeId: number,
  reviewId: number
): Promise<void> => {
  const { data } = await axiosInstance.delete(
    `/perfumes/${perfumeId}/reviews/${reviewId}`
  );
  return data.result;
};

// 상품 리뷰 수정
export const updateProductReview = async (
  perfumeId: number,
  reviewId: number,
  body: RequestProductReviewDto
): Promise<ResponseUpdateReviewDto> => {
  const { data } = await axiosInstance.put<ResponseUpdateReviewDto>(
    `/perfumes/${perfumeId}/reviews/${reviewId}`,
    body
  );
  return data;
};

// 스크랩 목록 조회
export const getScrapList = async (): Promise<ResponseScrapListDto> => {
  const { data } = await axiosInstance.get<ResponseScrapListDto>("/scrap");
  return data;
};

// 상품 스크랩 추가
export const postScrap = async (
  productId: number
): Promise<ResponseScrapDto> => {
  const { data } = await axiosInstance.post<ResponseScrapDto>(
    `/scrap/${productId}`
  );

  return data;
};

// 상품 스크랩 삭제
export const deleteScrap = async (
  productId: number
): Promise<ResponseScrapDto> => {
  const { data } = await axiosInstance.delete<ResponseScrapDto>(
    `/scrap/${productId}`
  );
  return data;
};
