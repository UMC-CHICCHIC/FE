import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConsultPostDetail } from "../../apis/postApi";
import { QUERY_KEY } from "../../constants/key";

export const useCreatePostList = () => {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: createConsultPostDetail,
    onSuccess: () => {
      queryClinet.invalidateQueries([QUERY_KEY.post]);
    },
    onError: (error) => {
      console.error("작성실패", error);
    },
  });
};
