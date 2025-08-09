import type { CommonResponse } from "./common";
import type { PerfumeCategory } from "./enums/postCategory";

// /category 카테고리 목록 조회
export type ProductCategory = {
  categoryId: number;
  name: string;
  type: PerfumeCategory;
  order: number;
};

// 상품 카테고리 Dto
export type ResponseProductCategoryDto = ProductCategory[];

export type Notes = {
  noteId: number;
  name: string;
};

// /products/detail/{id} 상품 상세 조회
export type ProductDetail = {
  perfumeId: number;
  name: string;
  concentration: string;
  price: number;
  ml: number;
  brand: string;
  topNote: string;
  baseNote: string;
  middleNote: string;
  averageRation: number;
  reviewCount: number;
  notes: Notes[];
  usage: string;
  warnings: string;
};

// 상품 상세 Dto
export type ResponseProductDetailDto = CommonResponse<ProductDetail>;
