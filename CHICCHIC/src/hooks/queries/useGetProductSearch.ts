import { useQuery } from "@tanstack/react-query";
import type { ProductSearchResult } from "../../types/searchtype";
import { QUERY_KEY } from "../../constants/key";
import { searchShoppingProduct } from "../../apis/productSearch";

// shopping 페이지 검색바
export function useProductSearch(q: string) {
  return useQuery<ProductSearchResult | null, Error, ProductSearchResult>({
    queryKey: [QUERY_KEY.productSearch, q],
    queryFn: async () => {
      const res = await searchShoppingProduct(q);
      return res.result ?? null;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
