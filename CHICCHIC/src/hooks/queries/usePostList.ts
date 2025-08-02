import { useQuery } from "@tanstack/react-query";
import type { PostCategory } from "../../types/enums/postCategory";
import type { ResponsePostListDto } from "../../types/post";
import { QUERY_KEY } from "../../constants/key";

export const usePostList = (category: PostCategory) => {
  return useQuery<ResponsePostListDto, Error>({
    queryKey: [QUERY_KEY.post, category],
  });
};
