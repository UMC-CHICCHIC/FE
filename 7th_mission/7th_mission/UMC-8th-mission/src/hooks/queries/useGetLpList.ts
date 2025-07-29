import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor,search,limit,order}:PaginationDto) {
  return useQuery({
    queryKey:[QUERY_KEY.lps],
    queryFn:()=> getLpList({cursor,search,limit,order}),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutesq
  })
}

export default useGetLpList