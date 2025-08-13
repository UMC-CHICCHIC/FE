// 추천 카테고리 enum
export type PostCategory = "GIVE" | "RECEIVE";

// 향수 카테고리 목록 enum
export type PerfumeCategory = "PRICE" | "CONCENTRATION";

// 상품 카테고리
export type SortKey = "price" | "itemRating" | "numSeller";
export type SortDir = "desc" | "asc";
export type PAGINATION_ORDER = `${SortKey},${SortDir}`;
