import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PaginationDto, PaginationOrder } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList({cursor,search,limit,order}:PaginationDto) {
    
    return useInfiniteQuery({
        queryFn: ({ pageParam }) => getLpList({ cursor:pageParam, search, limit, order }),
        queryKey: [QUERY_KEY.lps, search, order],
        initialPageParam: 0,
        getNextPageParam: (lastPage,allPages) => {
            //console.log(lastPage,allPages)
            return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined
        } // Adjust based on your API response structure
    })
}

export default useGetInfiniteLpList