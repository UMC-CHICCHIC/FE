import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createConsultPost } from "../../apis/postApi";
import { QUERY_KEY } from "../../constants/key";
import type {
  RequestCreatePostDto,
  ResponseConsultCreateDto,
} from "../../types/post";

// 추천 게시글 작성 훅
export const useCreateConsultPost = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseConsultCreateDto, Error, RequestCreatePostDto>({
    mutationFn: createConsultPost,
    onSuccess: (res) => {
      console.log("작성 성공", res.result.consultPostId);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.post],
      });
    },
    onError: (error) => {
      console.error("작성실패", error);
    },
  });
};
