import { useQuery } from "@tanstack/react-query";
import type { PerfumeCategory } from "../../types/enums/postCategory";
import { getPerfumeCategory } from "../../apis/categories";
import type { ResponseProductCategoryDto } from "../../types/perfumes";
import { QUERY_KEY } from "../../constants/key";

export const useGetProductDetail = (type: PerfumeCategory) => {
  return useQuery<ResponseProductCategoryDto, Error>({
    queryKey: [QUERY_KEY.categories, type],
    queryFn: () => getPerfumeCategory(type),
  });
};
