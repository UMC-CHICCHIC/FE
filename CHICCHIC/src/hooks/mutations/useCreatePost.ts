import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConsultPostDetail } from "../../apis/postApi";
import { QUERY_KEY } from "../../constants/key";

export const useCreatePostList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConsultPostDetail,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.post],
      });
    },
    onError: (error) => {
      console.error("작성실패", error);
    },
  });
};
