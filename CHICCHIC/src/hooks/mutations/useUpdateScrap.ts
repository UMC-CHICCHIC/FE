import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createScrap, deleteScrap } from "../../apis/products";
import { QUERY_KEY } from "../../constants/key";

interface useUpdateScrapProps {
  productId: number;
  scrapped: boolean;
}

export function useUpdateScrap({ productId, scrapped }: useUpdateScrapProps) {
  const queryClient = useQueryClient();
  const [isScrapped, setIsSrapped] = useState<boolean>(scrapped);

  const add = useMutation({
    mutationFn: () => createScrap(productId),
    onSuccess: () => {
      setIsSrapped(true);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.scraps, productId],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.products] });
    },
  });
  const remove = useMutation({
    mutationFn: () => deleteScrap(productId),
    onSuccess: () => {
      setIsSrapped(false);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.scraps, productId],
      });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.products] });
    },
  });
  return {
    isScrapped,
    toggle: () => (isScrapped ? remove.mutate() : add.mutate()),
    isLoading: add.isPending || remove.isPending,
    error: add.error ?? remove.error,
  };
}
