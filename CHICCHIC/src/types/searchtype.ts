import type { CommonResponse } from "./common";

export interface ProductSearchNote {
  noteId: number;
  name: string;
}

export interface ProductSearchResult {
  id: number;
  name: string;
  brand: string;
  ml: number;
  topNote: ProductSearchNote[];
  baseNote: string;
  middleNote: string;
  concentration: string;
  price: number;
  itemRating: number;
  imageUrl: string;
}

export type ProductSearchResponse = CommonResponse<ProductSearchResult>;