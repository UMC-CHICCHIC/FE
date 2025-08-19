import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { createConsultComment, createConsultReply } from "../../apis/comment";
import type {
  RequestConsultCommentDto,
  ResponseConsultReplyDto,
} from "../../types/post";

// 댓글 생성 훅
export function useCreateConsultComment(consultPostId: number) {
  const qc = useQueryClient();

  return useMutation<ResponseConsultReplyDto, Error, RequestConsultCommentDto>({
    mutationFn: (body) => createConsultComment(consultPostId, body),
    onSuccess: () => {
      // 낙관적 업데이트 없이 invalidate만
      qc.invalidateQueries({
        queryKey: [QUERY_KEY.consultComments, consultPostId],
      });
    },
  });
}

// 대댓글 생성 훅
export function useCreateConsultReply(consultPostId: number, groupId: number) {
  const qc = useQueryClient();

  return useMutation<ResponseConsultReplyDto, Error, RequestConsultCommentDto>({
    mutationFn: (body) => createConsultReply(consultPostId, groupId, body),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: [QUERY_KEY.consultComments, consultPostId],
      });
    },
  });
}
