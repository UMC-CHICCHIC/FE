import type {
  ProductReview,
  RequestProductReviewDto,
  ResponseProductReviewDto,
  ResponseScrapDto,
  ResponseUpdateReviewDto,
} from "../types/perfumes";
import type {
  ResponseProductCategoryDto,
  ResponseProductDetailDto,
  ResponseProductListDto,
} from "../types/products";
import { axiosInstance } from "./axiosInstance";

// 향수 카테고리 조회 (가격대, 발향률)
export const getPerfumeCategory = async (
  type?: string
): Promise<ResponseProductCategoryDto> => {
  console.log("요청 카테고리", type);
  const { data } = await axiosInstance.get<ResponseProductCategoryDto>(
    "/category",
    {
      params: type ? { type } : undefined,
    }
  );
  return data;
};

// products 파라미터
export type GetProductsParams = {
  cat?: number;
  page: number;
  size: number;
  sort?: string | string[]; // 예: "price,asc"
};

// 향수 카테고리 조회 (인기순, 낮은 가격순, 높은 가격순, 누적판매순, 리뷰많은순, 평점높은순)
export const getPerfumeList = async ({
  cat,
  page,
  size,
  sort,
}: GetProductsParams): Promise<ResponseProductListDto> => {
  const { data } = await axiosInstance.get<ResponseProductListDto>(
    `/products`,
    {
      params: {
        ...(cat ? { cat } : {}),
        page: Math.max(0, page - 1), // 0-based로 변환
        size,
        ...(sort ? { sort } : {}),
      },
    }
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
      `/perfumes/${perfumeId}/reviews`,
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

// 상품 스크랩 추가
export const createScrap = async (
  productId: number
): Promise<ResponseScrapDto> => {
  try {
    console.log("스크랩 추가 응답 성공", productId);
    const { data } = await axiosInstance.post<ResponseScrapDto>(
      `/scrap/${productId}`
    );
    return data;
  } catch (e) {
    console.error("스크랩 추가 응답 실패", e);
    throw e;
  }
};

// 상품 스크랩 삭제
export const deleteScrap = async (productId: number) => {
  try {
    console.log("스크랩 삭제 응답 성공", productId);
    const { data } = await axiosInstance.delete(`/scrap/${productId}`);
    return data;
  } catch (e) {
    console.error("스크랩 삭제 응답 실패", e);
    throw e;
  }
};
