// /hooks/mutations/usePerfumeScrap.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScrap, postScrap } from "../../apis/products";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseScrapDto } from "../../types/perfumes";

// 스크랩 post
export function useUpdateScrap(productId: number) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    // 제품별 스크랩 상태와 목록/상세가 함께 갱신
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.scraps, productId] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.products] });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.products, productId],
    });
  };

  // 추가
  const add = useMutation<ResponseScrapDto, Error, string | undefined>({
    mutationFn: () => postScrap(productId),
    onSuccess: () => invalidate(),
  });

  // 삭제
  const remove = useMutation<ResponseScrapDto, Error, void>({
    mutationFn: () => deleteScrap(productId),
    onSuccess: () => invalidate(),
  });

  const toggle = (scrapped: boolean) => {
    if (scrapped) remove.mutate();
  };

  return { add, remove, toggle };
}
