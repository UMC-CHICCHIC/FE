import type {
  ProductReview,
  RequestProductReviewDto,
  ResponseProductReviewDto,
  ResponseUpdateReviewDto,
} from "../types/perfumes";
import type {
  ResponseProductCategoryDto,
  ResponseProductDetailDto,
} from "../types/products";
import { axiosInstance } from "./axiosInstance";

// 향수 카테고리 조회 (노트, 가격대, 발향률)
export const getPerfumeCategory = async (
  type?: string
): Promise<ResponseProductCategoryDto> => {
  try {
    console.log("요청 카테고리", type);
    const { data } = await axiosInstance.get<ResponseProductCategoryDto>(
      "/category",
      {
        params: type ? { type } : undefined,
      }
    );
    console.log("요청보냄");
    return data;
  } catch (e) {
    console.error("요청 실패", e);
    throw e;
  }
};

// 향수 카테고리 조회 (인기순, 낮은 가격순, 높은 가격순, 누적판매순, 리뷰많은순, 평점높은순)

// 상품 상세정보 조회
export const getPerfumeDetail = async (
  id: number
): Promise<ResponseProductDetailDto> => {
  try {
    console.log("요청 id", id);
    const { data } = await axiosInstance.get(`/products/detail/${id}`, {
      params: id,
    });
    console.log("요청보냄");
    return data;
  } catch (e) {
    console.error("요청 실패", e);
    throw e;
  }
};

// 상품 리뷰 조회
export const getProductReview = async (
  perfumeId: number,
  page = 1,
  size = 10
): Promise<ProductReview[]> => {
  try {
    console.log("요청 params", perfumeId, page, size);
    const { data } = await axiosInstance.get<ResponseProductReviewDto>(
      `/perfumes/${perfumeId}/reviews`,
      {
        params: { page, size },
      }
    );
    return data.result ?? [];
  } catch (e) {
    console.error("요청 실패", e);
    throw e;
  }
};

// 상품 리뷰 생성
export const createProductReview = async (
  perfumeId: number,
  body: RequestProductReviewDto
): Promise<ResponseUpdateReviewDto> => {
  try {
    console.log("생성 요청 성공");
    const { data } = await axiosInstance.post<ResponseUpdateReviewDto>(
      `/perfumes/${perfumeId}/reviews/`,
      body
    );
    return data;
  } catch (e) {
    console.error("생성 요청 실패", e);
    throw e;
  }
};

// 상품 리뷰 삭제
export const deleteProductReview = async (
  perfumeId: number,
  reviewId: number
): Promise<void> => {
  try {
    console.log("삭제 요청 성공");
    const { data } = await axiosInstance.delete(
      `/perfumes/${perfumeId}/reviews/${reviewId}`
    );
    return data.result;
  } catch (e) {
    console.error("삭제 요청 실패", e);
    throw e;
  }
};

// 상품 리뷰 수정
export const updateProductReview = async (
  perfumeId: number,
  reviewId: number,
  body: RequestProductReviewDto
): Promise<ResponseUpdateReviewDto> => {
  try {
    console.log("수정 요청 성공");
    const { data } = await axiosInstance.put<ResponseUpdateReviewDto>(
      `/perfumes/${perfumeId}/reviews/${reviewId}`,
      body
    );
    return data;
  } catch (e) {
    console.error("수정 요청 실패", e);
    throw e;
  }
};
