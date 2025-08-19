import type { CommonResponse } from "./common";
import type { PAGINATION_ORDER, PerfumeCategory } from "./enums/category";

// /products 리스트
export type Product = {
  id: number;
  name: string;
  brand: string;
  ml: number;
  topNote: Notes[];
  baseNote: string;
  middleNote: string;
  concentration: string;
  price: number;
  itemRating: number;
  imageUrl: string;
};

// 상품 리스트
export type ProductSort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

// /products 페이지네이션
export type Pageable = {
  offset: number;
  sort: ProductSort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

// 상품 응답 요청
export type ResponseProductListDto = CommonResponse<{
  totalPages: number;
  totalElements: number;
  size: number;
  content: Product[];
  number: number;
  sort: ProductSort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}>;

export interface GetProductsParams {
  page: number; // UI: 1-base
  size: number; // 개수 (ex. 16)
  sort?: PAGINATION_ORDER | PAGINATION_ORDER[];
  cat?: number;
}

// /category 카테고리 목록 조회 (가격, 발향률)
export type ProductCategory = {
  categoryId: number;
  name: string;
  type: PerfumeCategory;
  order: number;
};

// 상품 카테고리 Dto
export type ResponseProductCategoryDto = ProductCategory[];

// topNote
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
  brandUrl?: string;
  topNote: { noteId: number; name: string }[];
  middleNote: string | string[]; // 백엔드 통일 전 임시
  baseNote: string | string[];
  ingredients: string[];
  averageRating: number;
  reviewCount: number;
  ImageUrl?: string;
  usage?: string[];
  warnings?: string[];
};

// 상품 상세 Dto
export type ResponseProductDetailDto = CommonResponse<ProductDetail>;
