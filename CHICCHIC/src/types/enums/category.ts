// 추천 카테고리 enum
export type PostCategory = "GIVE" | "RECEIVE";

// 향수 카테고리 목록 enum
export type PerfumeCategory = "NOTE" | "PRICE" | "CONCENTRATION" | null;

// 상품 카테고리
export type PAGINATION_ORDER =
  | "price,asc"
  | "price,desc"
  | "itemRating,desc"
  | "numSeller,desc";
