import type { PerfumeCategory } from "./enums/postCategory";

export interface Perfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  notes: string[];
}

// /category Response body
export type ProductCategory = {
  categoryId: number;
  name: string;
  type: PerfumeCategory;
  order: number;
};

// 상품 카테고리 Dto
export type ResponseProductCategoryDto = ProductCategory[];
