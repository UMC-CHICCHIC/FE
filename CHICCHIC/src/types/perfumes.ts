import type { CommonResponse } from "./common";

export interface Perfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  notes: string[];
  price?: number; // price 속성을 선택적으로 추가
}

// 별점
export type Rating = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

// 상품 리뷰
export type ProductReview = {
  id: number;
  memberNickname: string;
  rating: Rating;
  content: string;
  createdAt: string;
};

// 상품 리뷰 생성 및 수정 요청
export type RequestProductReviewDto = {
  rating: Rating;
  content: string;
};

// 스크랩
export type Scrap = {
  id: number;
  name: string;
  brand: string;
  ml: number;
  topNotes: string[];
  middleNote: string;
  baseNote: string;
  concentration: string;
  price: number;
  itemRating: number;
  imageUrl: string;
};

// 스크랩 추가 및 삭제 응답
export type ResponseScrapDto = CommonResponse<"">;

// 스크랩 조회 응답
export type ResponseScrapListDto = CommonResponse<Scrap[]>;

// 상품 리뷰 삭제 응답
export type ResponseDeleteReviewDto = CommonResponse<Record<string, never>>;

// 상품 리뷰 조회 응답
export type ResponseProductReviewDto = CommonResponse<ProductReview[]>;

// 상품 리뷰 수정 응답
export type ResponseUpdateReviewDto = CommonResponse<ProductReview>;
