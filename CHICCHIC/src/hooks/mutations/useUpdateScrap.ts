// /hooks/mutations/usePerfumeScrap.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteScrap, postScrap } from "../../apis/products";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseScrapDto } from "../../types/perfumes";

// 스크랩 post
export function useUpdateScrap(perfumeId: number) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    // 스크랩 목록
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.scraps] });
    // 제품 상태
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.products, "detail", perfumeId],
    });
    // 제품 목록
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.products, "list"],
    });
  };

  // 추가
  const add = useMutation<ResponseScrapDto, Error, void>({
    mutationFn: () => postScrap(perfumeId),
    onSuccess: invalidate,
  });

  // 삭제
  const remove = useMutation<ResponseScrapDto, Error, void>({
    mutationFn: () => deleteScrap(perfumeId),
    onSuccess: invalidate,
  });

  const toggle = (scrapped: boolean) => {
    if (add.isPending || remove.isPending) return; // 중복 클릭 방지
    if (scrapped) {
      remove.mutate();
    } else {
      add.mutate();
    }
  };

  return {
    add,
    remove,
    toggle,
    isMutating: add.isPending || remove.isPending,
    error: add.error ?? remove.error ?? null,
  };
}
