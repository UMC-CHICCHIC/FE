import { axiosInstance } from "./axiosInstance";
import type {
    ProductSearchResult,
    ProductSearchResponse
} from "../types/searchtype";

export const searchProductByName = async (name: string): Promise<ProductSearchResult | null> => {
  if (!name) return null;
  const { data } = await axiosInstance.get<ProductSearchResponse>(`/products/search?q=${encodeURIComponent(name)}`);
  return data?.result ?? null;
};