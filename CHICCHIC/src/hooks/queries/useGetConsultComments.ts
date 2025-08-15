import { getConsultComments } from "../../apis/comment";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseConsultCommentsDto } from "../../types/post";

// 댓글 가져오는 훅
export function useGetConsultComments(
  consultPostId: number | null | undefined
) {
  return useQuery<ResponseConsultCommentsDto>({
    queryKey: [QUERY_KEY.consultComments, consultPostId],
    queryFn: () => getConsultComments(consultPostId as number),
    enabled: !!consultPostId,
    staleTime: 60_000,
  });
}
